import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ height: 100, justifyContent: "center" }}>
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingX: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Mi Ecommerce
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/about">
            Sobre Nosotros
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contacto
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user?.role !== "admin" && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {user ? (
            <>
              <IconButton color="inherit" onClick={() => navigate("/profile")}>
                <AccountCircle />
              </IconButton>

              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;