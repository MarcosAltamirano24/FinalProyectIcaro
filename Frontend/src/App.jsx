import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./components/order/OrdersPage";
import ProfilePage from "./components/cart/ProfilePage";
import ProductDetailsPage from "./components/product/ProductDetailsPage";
import NavBar from "./components/common/NavBar";
import CartPage from "./components/cart/CartPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f4f6f8" },
  },
});

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <NavBar />
            <Box sx={{ padding: 4 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route
                  path="/cart"
                  element={<PrivateRoute element={<CartPage />} />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/orders"
                  element={<PrivateRoute element={<OrdersPage />} />}
                />
                <Route
                  path="/profile"
                  element={<PrivateRoute element={<ProfilePage />} />}
                />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Box>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
