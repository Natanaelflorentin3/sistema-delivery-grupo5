import { Request, Response, NextFunction } from "express";

export function validarCrearRepartidor(req: Request, res: Response, next: NextFunction): void {
  const { nombre, vehiculo, telefono, activo } = req.body;

  if (!nombre || typeof nombre !== "string") {
    res.status(400).json({ error: "El campo 'nombre' es obligatorio y debe ser un texto" });
    return;
  }
  if (!vehiculo || typeof vehiculo !== "string") {
    res.status(400).json({ error: "El campo 'vehiculo' es obligatorio y debe ser un texto" });
    return;
  }
  if (!telefono || typeof telefono !== "string") {
    res.status(400).json({ error: "El campo 'telefono' es obligatorio y debe ser un texto" });
    return;
  }
  if (typeof activo !== "boolean") {
    res.status(400).json({ error: "El campo 'activo' es obligatorio y debe ser booleano (true/false)" });
    return;
  }

  next();
}

export function validarActualizarRepartidor(req: Request, res: Response, next: NextFunction): void {
  const { nombre, vehiculo, telefono, activo } = req.body;

  if (nombre !== undefined && typeof nombre !== "string") {
    res.status(400).json({ error: "El campo 'nombre' debe ser un texto" });
    return;
  }
  if (vehiculo !== undefined && typeof vehiculo !== "string") {
    res.status(400).json({ error: "El campo 'vehiculo' debe ser un texto" });
    return;
  }
  if (telefono !== undefined && typeof telefono !== "string") {
    res.status(400).json({ error: "El campo 'telefono' debe ser un texto" });
    return;
  }
  if (activo !== undefined && typeof activo !== "boolean") {
    res.status(400).json({ error: "El campo 'activo' debe ser booleano (true/false)" });
    return;
  }

  next();
}