import "dotenv/config";
import session from "express-session";
import express from "express";
import cors from "cors";
import db from "./models/index.js";
import usersRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import ticketsRoutes from "./routes/tickets.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
    },
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ error: "Datos inválidos en la solicitud", details: err.errors });
  }

  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
