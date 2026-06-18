require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// 🔥 Conexión DB primero (bien)
connectDB();

// 🔥 Middlewares básicos
app.use(cors());
app.use(express.json());

// ROUTES
const propertyRoutes = require("./routes/property.routes");
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/properties", propertyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API inmobiliaria funcionando 🚀");
});

// PORT (Render obligatorio)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor en puerto " + PORT);
});