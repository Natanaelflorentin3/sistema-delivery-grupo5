import express from "express";
import type { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import path from "node:path";
import repartidoresRouter from "./routes/repartidores";
import productosRouter from "./routes/productos";
import { cargarDatosProductos } from "./data/productos";
import clientesRouter from "./routes/cliente";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

const swaggerFilePath = path.resolve("./src/swagger-output.json");
if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("archivo swagger-output.json no encontrado, corre 'npm run swagger' primero");
}

app.get("/", (req: Request, res: Response) => {
  res.send("API Sistema Delivery Grupo 5 funcionando 🚀");
});

app.use("/repartidores", repartidoresRouter);
app.use("/productos", productosRouter);
app.use("/clientes", clientesRouter);

app.listen(PORT, async () => {
  await cargarDatosProductos();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});