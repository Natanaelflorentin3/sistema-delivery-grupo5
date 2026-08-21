import express from "express";
import clientesRouter from "./routes/cliente.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Sistema Delivery Grupo 5 funcionando 🚀");
});

app.use("/api/clientes", clientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});