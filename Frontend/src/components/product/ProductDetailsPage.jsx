import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  CardMedia,
  Box,
  Paper,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        setProduct(data);
        setError(false);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (quantity > product.stock) {
        setSnackbarMessage(
          "La cantidad seleccionada excede el stock disponible."
        );
        setSnackbarSeverity("error");
      } else {
        addToCart(product.id, quantity);
        setSnackbarMessage("Producto agregado al carrito con éxito.");
        setSnackbarSeverity("success");
      }
    } else {
      setSnackbarMessage(
        "Debes iniciar sesión para agregar productos al carrito."
      );
      setSnackbarSeverity("warning");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Cargando...
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        Producto no encontrado
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={product.image || "https://via.placeholder.com/500"}
              alt={product.name}
              sx={{
                borderRadius: "8px",
                width: "100%",
                maxWidth: 500,
                maxHeight: 500,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box component={Paper} elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" color="text.secondary">
              {product.category || "Categoría"}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {product.description ||
                "No hay descripción disponible para este producto."}
            </Typography>

            <Typography
              variant="body1"
              color={product.stock > 0 ? "success.main" : "error.main"}
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              {product.stock > 0
                ? `En stock: ${product.stock} unidades`
                : "Agotado"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Typography variant="body1">Cantidad:</Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                sx={{ width: "4rem", marginLeft: 2 }}
                inputProps={{ min: 1, max: product.stock }}
              />
            </Box>

            <Box sx={{ marginTop: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Agregar al Carrito" : "No Disponible"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetailsPage;
