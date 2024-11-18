import { CartItem, Product } from "../models/index.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["name", "price", "category"],
        },
      ],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    res
      .status(500)
      .json({ error: "Error al cargar el carrito", details: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.session.userId;

    let cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ userId, productId, quantity });
    }

    res.status(201).json({ message: "Producto agregado al carrito", cartItem });
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res
      .status(500)
      .json({ error: "Error al agregar al carrito", details: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.session.userId;

    const cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    await cartItem.update({ quantity });
    res.status(200).json({ message: "Cantidad actualizada", cartItem });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res
      .status(500)
      .json({
        error: "Error al actualizar el carrito",
        details: error.message,
      });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.session.userId;

    const cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    await cartItem.destroy();
    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    res
      .status(500)
      .json({ error: "Error al eliminar del carrito", details: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    await CartItem.destroy({ where: { userId } });
    res.status(200).json({ message: "Carrito limpiado" });
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
    res
      .status(500)
      .json({ error: "Error al limpiar el carrito", details: error.message });
  }
};
