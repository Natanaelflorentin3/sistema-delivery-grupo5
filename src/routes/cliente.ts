import { Router } from "express";
import { clientes } from "../data/clientes.js";

const router = Router();

router.get("/", (req, res) => {
  const { id, nombre } = req.query;
  if (id) {
    const idNumero = Number(id);
    if (isNaN(idNumero)) {
      return res.status(400).json({
        mensaje: "El id debe ser un número"
      });
    }
    const cliente = clientes.find(cliente => cliente.id === idNumero);
    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }
    return res.json(cliente);
  }
  if (nombre) {
    if (typeof nombre !== "string") {
      return res.status(400).json({
        mensaje: "El nombre debe ser un texto"
      });
    }
    const resultados = clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron clientes con ese nombre"
      });
    }
    return res.json(resultados);
  }
  return res.json(clientes);
});


router.post("/", (req, res) => {
  const { nombre, apellidos, telefono, direccion, email } = req.body;
  if (!nombre || !apellidos || !email) {
    return res.status(400).json({
      mensaje: "nombre, apellidos y email son obligatorios"
    });
  }
  const nuevoId = clientes.length > 0
    ? Math.max(...clientes.map(cliente => cliente.id)) + 1
    : 1;
  const nuevoCliente = {
    id: nuevoId,
    nombre,
    apellidos,
    telefono,
    direccion,
    email
  };
  clientes.push(nuevoCliente);
  return res.status(201).json(nuevoCliente);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El id debe ser un número"
    });
  }
  const cliente = clientes.find(cliente => cliente.id === id);
  if (!cliente) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado"
    });
  }
  const { nombre, apellidos, telefono, direccion, email } = req.body;
  if (!nombre || !apellidos || !email) {
    return res.status(400).json({
      mensaje: "nombre, apellidos y email son obligatorios"
    });
  }
  cliente.nombre = nombre;
  cliente.apellidos = apellidos;
  cliente.telefono = telefono;
  cliente.direccion = direccion;
  cliente.email = email;
  return res.json(cliente);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El id debe ser un número"
    });
  }
  const indice = clientes.findIndex(cliente => cliente.id === id);
  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado"
    });
  }
  const clienteEliminado = clientes.splice(indice, 1);
  return res.json({
    mensaje: "Cliente eliminado correctamente",
    cliente: clienteEliminado[0]
  });
});

export default router;

