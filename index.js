import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { fetchAllProductsService } from "./src/services/products.service.js";
import { fetchAllCategoriesService } from "./src/services/categories.service.js";

import productsRouter from "./src/routes/products.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import categoriesRouter from "./src/routes/categories.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Configuración del motor de plantillas Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

// 2. Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Rutas web (pug)
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/products", async (req, res) => {
  const products = await fetchAllProductsService();
  const categories = await fetchAllCategoriesService();
  const categoryNames = Object.fromEntries(
    categories.map((c) => [c.id, c.name]),
  );
  res.render("products", { products, categoryNames });
});

// 4. Ruta raíz de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🤿 Bienvenido a la API REST de Sunny Reef Store 🪸☀️",
    description: "Sistema de Gestión de Equipamiento de Buceo",
  });
});

// 5. Routers de la API REST
app.use("/api/products", productsRouter);
app.use("/auth", authRouter);
app.use("/api/categories", categoriesRouter);

// 6. 404: Ruta no definida
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Ruta no encontrada",
  });
});

// 7. Errores: 400 (JSON mal formado) y 500 (fallas del servidor o de Firebase)
app.use((err, req, res, next) => {
  if (err.status === 400 || err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "El cuerpo de la petición no es un JSON válido",
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Error interno del servidor o del servicio de datos",
  });
});

app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});
