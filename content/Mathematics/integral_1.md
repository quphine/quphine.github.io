---
title: "Solving: $\int_0^{\infty} \frac{1-\cos (\sqrt{e-1} x)}{x e^x} d x$"
tags:
  - integrals
  - laplace-transform
---

$$
\begin{aligned} I & =\int_0^{\infty} \frac{1-\cos (\sqrt{e-1} x)}{x e^x} d x = \int_0^{\infty} e^{-x}\left(\frac{1-\cos (\sqrt{e-1} x)}{x}\right) d x \end{aligned}
$$

Now, consider a new integral  J(s,k) such that:

$$
\begin{aligned}
&J(s,k)
= \int_0^{\infty} e^{-st}
\left(\frac{1-\cos(kt)}{t}\right)\,dt
= \mathcal{L}\left\{\frac{1-\cos(kt)}{t}\right\} \\[4pt]
&= \int_s^{\infty}
\mathcal{L}\{1-\cos(kt)\}(u)\,du \\[4pt]
&= \int_s^{\infty}
\left(\frac{1}{u}-\frac{u}{u^2+k^2}\right)\,du =
\left[
\ln(u)-\frac{1}{2}\ln(u^2+k^2)
\right]_s^{\infty} \\[4pt]
&=
\left[
\ln\left(\frac{u}{\sqrt{u^2+k^2}}\right)
\right]_s^{\infty} =
-\ln\left(\frac{s}{\sqrt{s^2+k^2}}\right) \\[6pt]
&I=J(1,\sqrt{e-1}) \\[4pt]
&\implies I=\ln\left(\frac{\sqrt{1^2+e-1}}{1}\right)
=\frac{1}{2}.
\end{aligned}
$$