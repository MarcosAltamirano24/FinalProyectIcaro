import React from "react";
import { useCart } from "../../context/CartContext";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + item.quantity * price;
  }, 0);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        {},
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("Orden creada exitosamente");
        clearCart();
        setTimeout(() => navigate("/orders"), 500);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar el pedido. Inténtalo nuevamente.");
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      {cartItems.length === 0 ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Tu carrito está vacío.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
          >
            Seguir Comprando
          </Button>
        </Box>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h6">
                  {item.product?.name || "Producto sin nombre"}
                </Typography>
                <Typography>
                  Precio: ${item.product?.price?.toFixed(2) || "No disponible"}
                </Typography>
                <Typography>
                  Categoría: {item.product?.category || "Sin categoría"}
                </Typography>
                <Typography>
                  Subtotal: $
                  {(item.quantity * (item.product?.price || 0)).toFixed(2)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <Typography>Cantidad: </Typography>
                  <TextField
                    type="number"
                    size="small"
                    sx={{ width: "4rem", marginLeft: "1rem" }}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(
                        1,
                        parseInt(e.target.value) || 1
                      );
                      updateCartItem(item.productId, newQuantity);
                    }}
                    inputProps={{ min: 1 }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h5"
            align="right"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            Total: ${cartTotal.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleCheckout}
          >
            Proceder al Pago
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
