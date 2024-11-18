import axios from "axios";

export const createOrder = async (clearCart, navigate) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/orders",
      {},
      { withCredentials: true }
    );
    if (response.status === 201) {
      const order = response.data;
      clearCart();
      navigate("/orders", { state: { order } });
    }
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw new Error(
      "Hubo un error al procesar el pedido. Inténtalo nuevamente."
    );
  }
};
