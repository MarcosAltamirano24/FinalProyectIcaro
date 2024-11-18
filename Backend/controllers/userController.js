import { User } from "../models/index.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
      role,
    } = req.body;

    const newUser = await User.create({
      name,
      surname,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
      role,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al registrar el usuario", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    req.session.userId = user.id;
    req.session.isAdmin = user.role === "admin";

    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al iniciar sesión", details: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener los detalles del usuario",
        details: error.message,
      });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, surname, phone, address, city, postalCode, country } =
      req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.update({
      name,
      surname,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    res.status(200).json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al actualizar el usuario",
        details: error.message,
      });
  }
};
