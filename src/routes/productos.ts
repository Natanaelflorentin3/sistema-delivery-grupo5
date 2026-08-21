import { Router } from "express";
import type { Request, Response } from "express";
import { listaproductos, setListaproductos } from "../data/productos";
import type {
  productos,
  crearproducto,
  actualizarproducto,
  productosfiltrados,
  idParam,
} from "../types/productos";

const router = Router();

router.get("/", function (req: Request<{}, {}, {}, productosfiltrados>, res: Response) {
  // #swagger.tags = ['Productos']
  // #swagger.description = 'Obtiene la lista de productos, con filtros opcionales por nombre, categoria y disponible'
  const { nombre, categoria, disponible } = req.query;
  let resultado = [...listaproductos];

  if (categoria) {
    resultado = resultado.filter((e) => e.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (nombre) {
    resultado = resultado.filter((e) => e.nombre.toLowerCase() === nombre.toLowerCase());
  }
  if (disponible) {
    const estado = String(disponible).toLowerCase();
    if (estado !== "true" && estado !== "false") {
      return res.json({ error: "el estado disponible debe ser true o false" });
    }
    const estadisponible = estado === "true";
    resultado = resultado.filter((e) => e.disponible === estadisponible);
  }

  return res.json({ total: resultado.length, datos: resultado });
});

router.get("/:id", function (req: Request<idParam>, res: Response) {
  // #swagger.tags = ['Productos']
  // #swagger.description = 'Obtiene un producto especifico por su id'
  const idBuscado = Number(req.params.id);
  if (isNaN(idBuscado)) {
    return res.status(400).json({ error: "El parametro id debe ser un numero valido" });
  }
  const productosfiltrado = listaproductos.find((e) => e.id === idBuscado);
  if (!productosfiltrado) {
    return res.status(404).json({ error: "no existe un producto con ese ID" });
  }
  return res.json(productosfiltrado);
});

router.post("/", function (req: Request<{}, {}, crearproducto>, res: Response) {
  // #swagger.tags = ['Productos']
  // #swagger.description = 'Crea un nuevo producto, validando que el precio sea mayor a 0'
  const { nombre, precio, categoria } = req.body;
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: "faltan datos q son obligatorios" });
  }
  if (precio <= 0) {
    return res.status(400).json({ error: "el precio debe ser mayor a 0" });
  }
  const nuevoproducto: productos = {
    id: listaproductos.length > 0 ? listaproductos.length + 1 : 1,
    nombre,
    precio,
    categoria,
    disponible: true,
  };
  listaproductos.push(nuevoproducto);
  res.status(201).json(nuevoproducto);
});

router.put("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Productos']
  // #swagger.description = 'Modifica el precio, nombre, categoria o disponibilidad de un producto existente'
  const idBuscado = Number(req.params.id);
  const index = listaproductos.findIndex((e) => e.id === idBuscado);
  if (index === -1) {
    return res.status(404).json({ error: "producto no encontrado" });
  }
  const { nombre, precio, disponible, categoria }: actualizarproducto = req.body;
  listaproductos[index] = {
    id: idBuscado,
    nombre: nombre ?? listaproductos[index]?.nombre,
    precio: precio ?? listaproductos[index]?.precio,
    categoria: categoria ?? listaproductos[index]?.categoria,
    disponible: disponible ?? listaproductos[index]?.disponible,
  };
  res.json(listaproductos[index]);
});

router.delete("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Productos']
  // #swagger.description = 'Elimina un producto del catalogo'
  const idBuscado = Number(req.params.id);
  const index = listaproductos.findIndex((e) => e.id === idBuscado);
  if (index === -1) {
    return res.status(404).json({ error: "producto no encontrado, no podemos eliminarlo" });
  }
  const listaNueva = listaproductos.filter((e) => e.id !== idBuscado);
  setListaproductos(listaNueva);
  res.json({ mensaje: "producto ELIMINADO EXITOSAMENTE" });
});

export default router;