---
title: Convolution theorem for PDFs
tags:
  - probability-theory
date: 2026-10-24
---
Consider three random variables related by, $Z = X + Y$ where $X$ and $Y$ are independent. Our aim is to determine $f_{Z}(z)$ given $f_{X}(x)$ and $f_{Y}(y)$. From the definition of probability density function (PDF), we have that,

$$
P(a \le Z \le b) = \int_a^b f_Z(z)\,dz\\
\Rightarrow P(z \le Z \le z+\Delta z) = \int_z^{z+\Delta z} f_Z(z)\,dz \approx f_Z(z)\cdot\Delta z \;\Rightarrow\; f_Z(z) = \lim_{\Delta z \to 0}\left[\frac{P(z \le Z \le z+\Delta z)}{\Delta z}\right]
$$

 Therefore we obtain our PDF as a limit. Now we introduce a conditional intermediate to proceed further; consider,

$$
P\big(z \le X+Y \le z+\Delta z \mid X=x\big) = P\big(z-x \le Y \le z+\Delta z-x \mid X=x\big)
$$

$$
= \int_{z-x}^{z-x+\Delta z} f_Y(y)\,dy \approx f_Y(z-x)\,\Delta z
$$

$$
P\big(z \le Y+X \le z+\Delta z\big) = \int_{-\infty}^{+\infty} P\big(z-x \le Y \le z+\Delta z-x \mid X=x\big)\cdot f_X(x)\,dx
$$
Substituting the previously obtained approximation of $P\big(z \le Y+X \le z+\Delta z\big)$, the expression evaluates to be,
$$
\approx \int_{\mathbb{R}} f_Y(z-x)\,\Delta z\; f_X(x)\,dx
$$

$$
\lim_{\Delta z \to 0} \frac{P\big(z \le Y+X \le z+\Delta z\big)}{\Delta z} = \int_{\mathbb{R}} f_Y(z-x)\, f_X(x)\,dx
$$

$$
\Rightarrow f_Z(z) = (f_Y * f_X)(z)
$$ And hence we obtain that the probability density function of the dependent variable $Z$, is the convolution of the PDFs of the independent variables. The same argument can be iteratively exploited to extend the result to $n$ independent variables whose linear combination yields a new dependent random variable.
$$
\text{if }Z=X_{1}+X_{2} +\dots+{X_{n}\text{ then, }}\\
\\
f_{Z}(z)=(f_{X_{1}}*f_{X_{1}}\dots*f_{X_{n}})(z)
$$