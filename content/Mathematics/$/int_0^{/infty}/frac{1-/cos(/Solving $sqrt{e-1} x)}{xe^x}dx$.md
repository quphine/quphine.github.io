---
title: Solving: $\int_0^{\infty} \frac{1-\cos (\sqrt{e-1} x)}{x e^x} d x$
tags:
  - integrals
  - laplace-transform
---

$$
\begin{aligned} I & =\int_0^{\infty} \frac{1-\cos (\sqrt{e-1} x)}{x e^x} d x = \int_0^{\infty} e^{-x}\left(\frac{1-\cos (\sqrt{e-1} x)}{x}\right) d x \end{aligned}
$$

Now, consider a new integral  J(s,k) such that:

$$
\begin{aligned}\\& J(s, k)=  \int_0^{\infty} e^{-s t}\left(\frac{1-\cos (k x)}{x}\right) d x=\mathcal{L}\left\{\frac{1-\cos (k x)}{x}\right\} \\ & =\mathcal{L}\left\{\frac{1-\cos (k x)}{x}\right\}=\int_s^{\infty} \mathcal{L}\{1-\cos (k x)\} d u \\ & =\int_s^{\infty}\left(\frac{1}{u}-\left[\frac{u}{u^2+k^2}\right]\right) d u=\left.\left(\ln (u)-\frac{1}{2} \ln \left(u^2+k^2\right)\right)\right|_{u=s} ^{\infty} \\ & =\left.\ln \left(\frac{u}{\sqrt{u^2+k^2}}\right)\right|_s ^{\infty}=-\ln \left(\frac{s}{\sqrt{s^2+k^2}}\right) \\ &  I=J(1, \sqrt{e-1}) \\ & =\ln \left(\frac{\sqrt{1^2+e-1}}{1}\right) = \frac{1}{2} \\ & \Rightarrow I=\frac{1}{2}\end{aligned}
$$