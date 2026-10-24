---
title: Denoising Diffusion Probabilistic Models
tags:
  - probabilistic-DL
date: 2026-10-25
---
## Introduction
Denoising Diffusion Probabilistic Model (DDPM)[^1] is a special neural network that, when given noise, iteratively denoises it to obtain a meaningful object. We split the model lifecycle into two segments, the forward process and the reverse process. In the former, we begin with meaningful data and sequentially inject gaussian noise to it, progressively reducing meaningful content thereby obtaining a final object which is almost just Gaussian noise. (For intuition consider the object to be an image)

In the reverse process, the model is given white noise and is made to predict a potentially plausible original object by denoising it step by step. The following sections describe the functioning of a DDPM. 

> Throughout this article, $q$ and $p$ denotes the probability densities associated with the forward and reverse processes respectively.

## Forward Process
Let $x_{0}$ be the original object. The first step is to fix the number of timestamps we are training our model with, say $T$. The next is to set the Noise schedule $\beta_{t}$. It is a sequence of $T$ numbers between 0 and 1, that controls the amount of noise that is injected in each step as described by equation (1). 

$$
x_0 \to x_1 \to x_2 \to \cdots \to x_t 
$$

$$
\begin{aligned} x_t &= \sqrt{\alpha_t} x_{t-1} + \sqrt{\beta_t} \varepsilon_t  \quad \varepsilon \sim \mathcal{N}(0,1) \qquad (1) \  \end{aligned} 
$$
$$
\alpha_t = 1 - \beta_t \quad (0 < \beta_t < 1)
$$
It is computationally inefficient to repeat the process $T$ times and hence we attempt to establish a direct relation between $x_t$ and $x_{0}$. 
$$
x_1 = \sqrt{\alpha_1} x_0 + \sqrt{\beta_1} \varepsilon_1
$$
$$
\begin{aligned} x_2 &= \sqrt{\alpha_2} x_1 + \sqrt{\beta_2} \varepsilon_2 \ \\&= \sqrt{\alpha_1 \alpha_2} x_0 + \sqrt{\alpha_2 (1-\alpha_1)} \varepsilon_1 + \sqrt{1-\alpha_2} \varepsilon_2 \end{aligned} 
$$

$$
\begin{aligned} \mathbb{E}[x_2] &= \sqrt{\alpha_1 \alpha_2} x_0 \qquad (2)\\ \mathrm{Var}(x_2) &= \alpha_2 (1-\alpha_1) + (1-\alpha_2) = 1 - \alpha_1 \alpha_2 \qquad (3) \end{aligned} 
$$

$$
\Rightarrow \quad x_2 = \sqrt{\alpha_1 \alpha_2} x_0 + \sqrt{1 - \alpha_1 \alpha_2} \varepsilon ; \quad \varepsilon \sim \mathcal{N}(0,1) \qquad (\because (2), (3)) 
$$
It may be noted that the above result is a direct consequence of the [[convolution-theorem-for-pdfs|Convolution theorem for PDFs]] and would vary accordingly for non-gaussian distributions. 

Consider the following,

$$
\bar{\alpha}_t = \prod_{i=1}^{t} \alpha_i 
$$

then, by iteratively applying the same argument, we obtain for any t,

$$
x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \varepsilon 
$$
The next goal is to determine the Probability density function ($q$) of $X_{t-1}$ given $X_{t}$
$$ 
\begin{aligned} q(x_t \mid x_{t-1}) &= \mathcal{N}\left(\sqrt{\alpha_t} x_{t-1},\quad \beta_t \mathbf{I}\right) \qquad\qquad (4)\\ \ q(x_t \mid x_0) &= \mathcal{N}\left(\sqrt{\bar{\alpha}_t} x_0,\quad (1 - \bar{\alpha}_t) \mathbf{I}\right) \qquad (5) \end{aligned} 
$$
Revisiting equation (1) and computing conditional mean and variance described in (4) and (5) yields,
$$
x_t = \sqrt{\alpha_t} x_{t-1} + \sqrt{\beta_t} \varepsilon_t 
$$

$$
\begin{aligned} \mathbb{E}\left[x_t \mid x_{t-1}, x_0\right] &= \mathbb{E}\left[\sqrt{\alpha_t} x_{t-1} + \sqrt{\beta_t} \varepsilon_t\right] = \sqrt{\alpha_t} x_{t-1}\\ \ \mathrm{Var}\left(x_t \mid x_{t-1}, x_0\right) &= \mathrm{Var}\left(\sqrt{\alpha_t} x_{t-1} + \sqrt{\beta_t} \varepsilon_t\right) = \beta_t \end{aligned} 
$$

$$
\Rightarrow \quad q(x_t \mid x_{t-1}, x_0) = \mathcal{N}\left(\sqrt{\alpha_t} x_{t-1}, \beta_t \mathbf{I}\right) \qquad (6) 
$$

Comparing (6) with (4),

$$
q(x_t \mid x_{t-1}, x_0) = q(x_t \mid x_{t-1}) 
$$
The above mentioned relation is also referred to as 'Markov Property'.

$$
\begin{aligned} q(x_{t-1} \mid x_t, x_0) &= \frac{q(x_t \mid x_{t-1}, x_0) q(x_{t-1} \mid x_0)}{q(x_t \mid x_0)} \ = \frac{q(x_t \mid x_{t-1}) q(x_{t-1} \mid x_0)}{q(x_t \mid x_0)} \qquad (7) \end{aligned}
 $$
 (7) describes the posterior PDF (The one that is obtained by knowing something in advance or by incorporating observed evidence)

---
## Reverse Posterior
A normal distribution is defined as,
$$
\mathcal{N}(\mu, \sigma^2) = \frac{1}{\sqrt{2\pi} \sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right) \qquad (8) 
$$
Expanding equation (7) using (8) yields,
$$
q(x_{t-1} \mid x_t, x_0) = \frac{ \frac{1}{\sqrt{2\pi \beta_t}} \exp\left(-\frac{\left(x_t - \sqrt{\alpha_t} x_{t-1}\right)^2}{2\beta_t}\right) \cdot \frac{1}{\sqrt{2\pi (1-\bar{\alpha}_{t-1})}} \exp\left(-\frac{\left(x_{t-1} - \sqrt{\bar{\alpha}_{t-1}} x_0\right)^2}{2(1-\bar{\alpha}_{t-1})}\right) }{ \frac{1}{\sqrt{2\pi (1-\bar{\alpha}_t)}} \exp\left(-\frac{\left(x_t - \sqrt{\bar{\alpha}_t} x_0\right)^2}{2(1-\bar{\alpha}_t)}\right) } 
$$
The variable of interest here is $x_{t-1}$ and therefore it is sufficient to ignore the denominator and any other factor which is independent of $x_{t-1}$ as it just causes the final distribution to be scaled.
$$ 
\begin{aligned}  q(x_{t-1} \mid x_t, x_0) &\propto \exp\left(-\frac{\alpha_t x_{t-1}^2 - 2 x_t \sqrt{\alpha_t} x_{t-1}}{2\beta_t} - \frac{x_{t-1}^2 - 2 x_{t-1} x_0 \sqrt{\bar{\alpha}_{t-1}}}{2(1-\bar{\alpha}_{t-1})}\right) \\ &= \exp\left(-\frac{\left(2(1-\bar{\alpha}_{t-1})\alpha_t + 2\beta_t\right) x_{t-1}^2 - \left(4 x_t \sqrt{\alpha_t} (1-\bar{\alpha}_{t-1}) + 4 x_0 \sqrt{\bar{\alpha}_{t-1}} \beta_t\right) x_{t-1}}{4\beta_t (1-\bar{\alpha}_{t-1})}\right) \end{aligned} 
$$
Simplifying the above expression, we obtain
$$
q(x_{t-1} \mid x_t, x_0) \propto \exp\left(-\left(A x_{t-1}^2 - B x_{t-1}\right)\right) 
$$

where

$$
\begin{aligned} A &= \frac{1}{2}\left[\frac{\alpha_t}{\beta_t} + \frac{1}{1-\bar{\alpha}_{t-1}}\right] \quad B = \frac{x_t \sqrt{\alpha_t}}{\beta_t} + \frac{x_0 \sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_{t-1}} \end{aligned} 
$$

Completing the square,

$$
A x_{t-1}^2 - B x_{t-1} = A\left(x_{t-1} - \frac{B}{2A}\right)^2 - \frac{B^2}{4A}
$$

$$ 
\Rightarrow \quad q(x_{t-1} \mid x_t, x_0) \propto \exp\left(-A\left(x_{t-1} - \frac{B}{2A}\right)^2\right) \qquad (9) 
$$

This proves that $q(x_{t-1} \mid x_t, x_0)$ is a scaled Gaussian distribution.

Comparing (8) with (9) we get,

$$
\mu = \frac{B}{2A} \quad , \quad \sigma^2 = \frac{1}{2A} 
$$

$$
 \begin{aligned} \tilde{\mu} &= \frac{\sqrt{\alpha_t} (1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t} x_t + \frac{\sqrt{\bar{\alpha}_{t-1}} \beta_t}{1-\bar{\alpha}_t} x_0 \qquad \text{(after substitution)}\\ \ \sigma^2 &= \left(\frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_t}\right)\beta_t = \tilde{\beta}_t \end{aligned} 
$$

$$
q(x_{t-1} \mid x_t, x_0) = \mathcal{N}\left(\tilde{\mu},\quad \tilde{\beta}_t \right) 
$$

$$
\Rightarrow \quad x_{t-1} = \tilde{\mu} + \sqrt{\tilde{\beta}_t} n \quad , \quad n \sim \mathcal{N}(0,1) \qquad (10) 
$$
Note that (10) expresses $x_{t-1}$ as a function of $x_{t}$ and $x_{0}$.
From (1) we have that,

$$
x_0 = \frac{x_t - \sqrt{1-\bar{\alpha}_t} \varepsilon}{\sqrt{\bar{\alpha}_t}} \qquad (11) 
$$

---

## Reverse Process

During Reverse process (say Image generation), we predict $\varepsilon$ to estimate $x_0$. Say the parameters are $\theta,$ then from (11) 

$$
 \hat{x}_0 = \frac{x_t - \sqrt{1-\bar{\alpha}_t} \hat{\varepsilon}_\theta}{\sqrt{\bar{\alpha}_t}} \qquad (12) 
$$

Substituting (12) in (10) we obtain $(\hat{x}_{t-1})_\theta$ as $\tilde{\mu}$ is a function of $x_0$ and $x_t$. It is important to remember that the substitution will result in an approximation rather than an exact result. This process is iterative, we repeat this for $T$ steps to obtain back an image similar to the original image in the final step. 

---
### Intuition
Consider the MNIST dataset which comprises of images of handwritten digits (0-9). If our problem was to build a diffusion model that generates images of the digit 7, then we would do the following
- Fix the number of timesteps ($T$) and the corresponding Noise schedule (This can be linear, sinusoidal, exponential etc.)
- Obtain the training dataset by using the closed form expression that relates $x_{0}$ and $x_{t}$. ($x_{0}$ is our original training image, $x_{t}$ is the noisy image at the $t^{th}$ step). Also we only consider images of 7.
- Train the model by giving it the timestamp ($t$) and the image at the instant ($x_{t}$) as the inputs and making it predict the noise it contains w.r.t $x_{0}$. (A common choice of model architecture for such problems is the U-NET CNN)
- Note that at the $T^{th}$ timestep, the distribution is approximately purely random as $\bar{\alpha_{t}}$ becomes progressively diminishing owing to the fact that it is a product of positive numbers less than 1. Therefore, it is reasonable to assume that $X_{T}\sim\mathcal{N}(0,I)$.
- Now give our trained model white noise $\mathcal{N}(0,I)$. Because it is trained with $T$ timesteps and a specific set of noise schedule, it utilizes the same to predict the noise at each stage and consequently get a closer estimate of a potential form of $x_{0}$. Also we cannot stop with a single estimation of $x_{0}$ as it is extremely noisy. It has to be repeatedly denoised so as to obtain a meaningful image. 
- Also for an image, all the above mentioned equations must be vectorized (The above derivation is for scalars)

##### References
[^1]: Ho, J., Jain, A., & Abbeel, P. (2020). Denoising Diffusion Probabilistic Models. Advances in Neural Information Processing Systems (NeurIPS), 33, 6840–6851
