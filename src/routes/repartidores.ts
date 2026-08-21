import { Router, Request, Response } from "express";
import { validarCrearRepartidor, validarActualizarRepartidor } from "../middlewares/validarRepartidor";
import { repartidor } from "../types/repartidor";
import repartidoresData from "../data/repartidores.json";

const router = Router();

let repartidores: repartidor[] = repartidoresData as repartidor[];

router.get("/", (req: Request, res: Response) => {
  // #swagger.tags = ['Repartidores']
  // #swagger.summary = 'Lista todos los repartidores'
  // #swagger.description = 'Permite filtrar por disponibilidad con ?activo=true'
  const { activo } = req.query;
  let resultado = repartidores;

  if (activo !== undefined) {
    const activoBoolean = activo === "true";
    resultado = repartidores.filter((r) => r.activo === activoBoolean);
  }

  // #swagger.responses[200] = { description: 'Lista de repartidores obtenida correctamente' }
  res.status(200).json(resultado);
});

router.get("/:id", (req: Request, res: Response) => {
  // #swagger.tags = ['Repartidores']
  // #swagger.summary = 'Obtiene un repartidor por ID'
  // #swagger.parameters['id'] = { description: 'ID numérico del repartidor' }
  const id = Number(req.params.id);
  const repartidorEncontrado = repartidores.find((r) => r.id === id);

  if (!repartidorEncontrado) {
    // #swagger.responses[404] = { description: 'Repartidor no encontrado' }
    res.status(404).json({ error: "Repartidor no encontrado" });
    return;
  }

  // #swagger.responses[200] = { description: 'Repartidor encontrado' }
  res.status(200).json(repartidorEncontrado);
});

router.post("/", validarCrearRepartidor, (req: Request, res: Response) => {
  // #swagger.tags = ['Repartidores']
  // #swagger.summary = 'Registra un nuevo repartidor'
  // #swagger.description = 'Requiere nombre, vehiculo, telefono y activo en el body'
  const { nombre, vehiculo, telefono, activo } = req.body;
  const nuevoId = repartidores.length > 0 ? Math.max(...repartidores.map((r) => r.id)) + 1 : 1;
  const nuevoRepartidor: repartidor = { id: nuevoId, nombre, vehiculo, telefono, activo };

  repartidores.push(nuevoRepartidor);

  // #swagger.responses[201] = { description: 'Repartidor creado correctamente' }
  // #swagger.responses[400] = { description: 'Datos inválidos o incompletos' }
  res.status(201).json(nuevoRepartidor);
});

router.put("/:id", validarActualizarRepartidor, (req: Request, res: Response) => {
  // #swagger.tags = ['Repartidores']
  // #swagger.summary = 'Actualiza datos, vehículo o disponibilidad de un repartidor'
  // #swagger.parameters['id'] = { description: 'ID numérico del repartidor' }
  const id = Number(req.params.id);
  const repartidorEncontrado = repartidores.find((r) => r.id === id);

  if (!repartidorEncontrado) {
    // #swagger.responses[404] = { description: 'Repartidor no encontrado' }
    res.status(404).json({ error: "Repartidor no encontrado" });
    return;
  }

  const { nombre, vehiculo, telefono, activo } = req.body;
  if (nombre !== undefined) repartidorEncontrado.nombre = nombre;
  if (vehiculo !== undefined) repartidorEncontrado.vehiculo = vehiculo;
  if (telefono !== undefined) repartidorEncontrado.telefono = telefono;
  if (activo !== undefined) repartidorEncontrado.activo = activo;

  // #swagger.responses[200] = { description: 'Repartidor actualizado correctamente' }
  res.status(200).json(repartidorEncontrado);
});

router.delete("/:id", (req: Request, res: Response) => {
  // #swagger.tags = ['Repartidores']
  // #swagger.summary = 'Da de baja a un repartidor'
  // #swagger.parameters['id'] = { description: 'ID numérico del repartidor' }
  const id = Number(req.params.id);
  const index = repartidores.findIndex((r) => r.id === id);

  if (index === -1) {
    // #swagger.responses[404] = { description: 'Repartidor no encontrado' }
    res.status(404).json({ error: "Repartidor no encontrado" });
    return;
  }

  repartidores.splice(index, 1);
  // #swagger.responses[204] = { description: 'Repartidor eliminado correctamente' }
  res.status(204).send();
});

export default router;