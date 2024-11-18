import { Order, OrderItem, CartItem, Product, User } from "../models/index.js";

export const createOrder = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    if (user.role === "admin") {
      return res
        .status(403)
        .json({
          error: "Los administradores no pueden realizar órdenes de compra.",
        });
    }

    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product, as: "product" }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío." });
    }

    const totalAmount = cartItems.reduce((total, item) => {
      if (!item.product || typeof item.product.price !== "number") {
        throw new Error(
          `El producto con ID ${item.productId} no tiene un precio válido.`
        );
      }
      return total + item.quantity * item.product.price;
    }, 0);

    const order = await Order.create({ userId, totalAmount });

    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    await CartItem.destroy({ where: { userId } });

    res.status(201).json({ message: "Orden creada exitosamente.", order });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res
      .status(500)
      .json({ error: "Error al crear la orden.", details: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.session.userId;

  try {
    const orders = await Order.findAll({
      where: { userId },
      attributes: ["id", "userId", "totalAmount", "createdAt", "status"],
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["name", "price", "category"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las órdenes.", details: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.session.userId;

  try {
    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada." });
    }

    await order.destroy();
    res.status(200).json({ message: "Orden eliminada exitosamente." });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res
      .status(500)
      .json({ error: "Error al eliminar la orden.", details: error.message });
  }
};

export const completeOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.session.userId;

  try {
    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada." });
    }

    order.status = "completed";
    await order.save();
    res.status(200).json({ message: "Orden marcada como completada.", order });
  } catch (error) {
    console.error("Error al completar la orden:", error);
    res
      .status(500)
      .json({ error: "Error al completar la orden.", details: error.message });
  }
};
