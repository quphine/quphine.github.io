---
title: 'Solving $\int_0^{\infty} \frac{1-\cos (\sqrt{e-1} x)}{x e^x} d x$'

tags:
  - integrals
  - laplace-transform
---

$$
\begin{aligned}
I
&= \int_0^{\infty}
\frac{1-\cos(\sqrt{e-1}\,x)}{x e^x}\,dx
\\
&= \int_0^{\infty}
e^{-x}
\frac{1-\cos(\sqrt{e-1}\,x)}{x}\,dx
\end{aligned}
$$

Now, consider a new integral $J(s,k)$ such that:

$$
\begin{aligned}
J(s,k) &= \int_0^{\infty} e^{-sx} \frac{1-\cos(kx)}{x}\,dx = \mathcal{L}\{\frac{1-\cos(kx)}{x}\} \\
&= \int_s^{\infty}\mathcal{L}\{1-\cos(kx)\}(u)\,du \\
&= \int_s^{\infty} (\frac{1}{u}-\frac{u}{u^2+k^2})\,du = [\ln(u)-\frac{1}{2}\ln(u^2+k^2)]_s^{\infty} \\
&= [\ln(\frac{u}{\sqrt{u^2+k^2}})]_s^{\infty} = -\ln(\frac{s}{\sqrt{s^2+k^2}}) \\
I &= J(1,\sqrt{e-1}) \\
&= \ln(\frac{\sqrt{1^2+e-1}}{1}) = \frac{1}{2} \\
&\implies I=\frac{1}{2}
\end{aligned}
$$
