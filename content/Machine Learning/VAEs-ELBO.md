---
title: 'VAEs and Evidence Lower Bound'
tags:
  - probabilistic-DL
  - loss-function
---

## Training
The following section describes the training process of a generic  Variational Autoencoder (VAE)
- Fix a prior (The assumed distribution usually $\mathcal{N}(0,1)$)

- We begin by taking the input ($x_{LR})$ and passing it into the decoder ($f_{\phi})$

  $$
  x\xrightarrow{f_{\phi}}\left(\mu(x),\sigma^{2}(x)\right)=q_{\phi}(z|x)
  $$

- This probability distribution corresponds to the approximate posterior
  (A distribution from which $z$ is sampled)

- Sample a $z$ from $q_{\phi}(z|x)$ and pass the sampled $z$ to the decoder ($g_{\theta})$ to obtain the decoder distribution that predicts the plausible solution of HR signals

  $$
  z\xrightarrow{g_{\theta}}p_{\theta}(y|z)\rightarrow\hat{y}
  $$

- We intend to maximize $p(y|x)$ and force the latent distributions (Approximate posteriors) to be close enough to the original prior, so that the model does not give irrationally big or small distributions that are located at arbitrary distances thereby making them meaningless.

## Loss (Evidence Lower Bound - ELBO)

Consider the following integral,

$$
p_{\theta}(y|x)=\int p_{\theta}(y|z)p_{\theta}(z|x)dz
$$

Our aim is to maximize LHS, inorder to do so, we will have to evaluate the integral which is complicated. Transform the original function of interest by wrapping it within a logarithm $\log(p_{\theta}(y|x))$. KL Divergence is defined by the integral,

$$
D_{\mathrm{KL}}(q\|p)=\int q(z)\log\frac{q(z)}{p(z)}dz
$$

According to Jensen's inequality, we have: ($\log X$ is concave)

$$
\log\mathbb{E}[X]\ge\mathbb{E}[\log X]\iff f\left(\frac{x+y}{2}\right)\ge\frac{f(x)+f(y)}{2}
$$

Note that the expectation (The weighted average) is defined by,

$$
\mathbb{E}_{p}[f(z)]=\int f(z)p(z)dz
$$

The first integral is re-written as,

$$
\log\left(p_{\theta}(y|x)\right)=\log\left(\int q_{\phi}(z|x)\frac{p_{\theta}(y|z)p_{\theta}(z|x)}{q_{\phi}(z|x)}dz\right)=\log\left(\mathbb{E}_{q_{\phi}}\left[\frac{p_{\theta}(y|z)p_{\theta}(z|x)}{q_{\phi}(z|x)}\right]\right)
$$

Therefore,

$$
\log\left(p_{\theta}(y|x)\right)\ge\mathbb{E}_{q_{\phi}}\left[\log\left(\frac{p_{\theta}(y|z)p_{\theta}(z|x)}{q_{\phi}(z|x)}\right)\right]
$$

Splitting the terms within the integral, we realize the KL divergence term.

$$
\log\left(p_{\theta}(y|x)\right)\ge\mathbb{E}_{q_{\phi}}\left[\log\left(p_{\theta}(y|z)\right)\right]-\mathbb{E}_{q_{\phi}}\left[-\log\left(\frac{p_{\theta}(z|x)}{q_{\phi}(z|x)}\right)\right]
$$

$$
\implies\log\left(p_{\theta}(y|x)\right)\ge\mathbb{E}_{q_{\phi}}\left[\log\left(p_{\theta}(y|z)\right)\right]-D_{KL}\left(q_{\phi}(z|x)||p_{\theta}(z|x)\right)
$$

To maximize the LHS, we minimize $-($RHS).

In simple terms KL divergence asks the question,

---
> "If we choose $q_{\phi}(z|x)$ as our original distribution, how much information would we loose, if I replace that with $p_{\theta}(z|x)$?"
---

Therefore our final loss function is given by,

$$
\boxed{\mathcal{L}=\left(-\mathbb{E}_{q_{\phi}}\left[\log\left(p_{\theta}(y|z)\right)\right]+D\left(q_{\phi}(z|x)||p_{\theta}(z|x)\right)\right)}
$$