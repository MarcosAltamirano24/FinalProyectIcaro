export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(403).json({ error: "No autenticado" });
};

export const isAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acceso denegado: Solo administradores" });
};

export const isNotAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    return res
      .status(403)
      .json({
        error: "Los administradores no pueden realizar órdenes de compra.",
      });
  }
  next();
};
