import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }
    req.session.userId = user.id;
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

router.get("/me", async (req, res) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error en /me:", error);
    res
      .status(500)
      .json({ message: "Error al verificar la autenticación", error });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error en /logout:", err);
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Sesión cerrada exitosamente" });
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password, address, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      address,
      phone,
    });

    const userWithoutPassword = { ...newUser.toJSON() };
    delete userWithoutPassword.password;

    res
      .status(201)
      .json({
        message: "Usuario registrado exitosamente",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
});

export default router;
