import { User } from "../models/index.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    req.session.userId = user.id;

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    res.json({
      message: "Inicio de sesión exitoso",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
