export const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "No autenticado. Por favor, inicia sesión." });
  }

  if (!req.user) {
    req.user = {
      id: req.session.userId,
      role: req.session.role,
    };
  }

  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "No autenticado. Por favor, inicia sesión." });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores." });
  }

  next();
};

export const isNotAdmin = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "No autenticado. Por favor, inicia sesión." });
  }

  if (req.user?.role === "admin") {
    return res
      .status(403)
      .json({ error: "Los administradores no pueden realizar órdenes de compra." });
  }

  next();
};
