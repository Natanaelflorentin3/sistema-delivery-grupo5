import { Router } from 'express';
import type { NextFunction, Request, Response } from "express";
import type { pedido, crearPedido, actualizarPedido, filtrarPedido, idParam } from '../types/pedido';
import { listaPedidos, setListaPedidos } from '../data/pedidos';

const router = Router();

// --------------- ROUTES ------------------------

// ENDPOINT GET -- LEER / FILTRAR PEDIDOS (por estado, opcional)
router.get("/", function (req: Request<{}, {}, {}, filtrarPedido>, res: Response) {
  // #swagger.tags = ['Pedidos']
  // #swagger.summary = 'Listar pedidos, o filtrar por estado'
  // #swagger.description = 'Sin query params devuelve todos los pedidos. Con ?estado= filtra por estado exacto.'
  const { estado } = req.query;
  let resultado = [...listaPedidos];
  if (estado) {
    resultado = resultado.filter(
      (e) => e.estado.toLowerCase() === estado.toLowerCase(),
    );
  }
  return res.json(resultado);
});

// --------------- BUSQUEDA POR EL ID DE PEDIDOS
router.get("/:id", function (req: Request<idParam>, res: Response) {
  // #swagger.tags = ['Pedidos']
  // #swagger.summary = 'Buscar un pedido por id'
  const idBuscado = Number(req.params.id);
  if (isNaN(idBuscado)) {
    return res.status(400).json({ error: "debe ser un id valido" });
  }
  const pedidoFiltrado = listaPedidos.find((e) => e.id === idBuscado);
  if (!pedidoFiltrado) {
    return res.status(404).json({ error: "no se ha encontrado el pedido" });
  }
  return res.json(pedidoFiltrado);
});

// ENDPOINT POST -- CREAR UN PEDIDO
router.post("/", function (req: Request<{}, {}, crearPedido>, res: Response) {
  // #swagger.tags = ['Pedidos']
  // #swagger.summary = 'Crear un nuevo pedido'
  // #swagger.description = 'clienteId, detalles, total y estado son obligatorios.'
  const { clienteId, detalles, total, estado } = req.body;
  if (!clienteId || !detalles || !total || !estado) {
    return res.status(400).json({ error: "se debe añadir toda la información" });
  }
  const nuevoPedido: pedido = {
    id: listaPedidos.length > 0 ? listaPedidos.length + 1 : 1,
    fecha: "20/08/2026",
    clienteId,
    detalles,
    total,
    estado,
  };
  listaPedidos.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

// ENDPOINT PUT -- ACTUALIZAR PEDIDO
router.put("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Pedidos']
  // #swagger.summary = 'Actualizar un pedido existente'
  const idBuscado = Number(req.params.id);
  const index = listaPedidos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "Not Found" });
  } else {
       const { clienteId, estado, fecha, detalles, total }: actualizarPedido = req.body;
    listaPedidos[index] = {
      id: idBuscado,
      clienteId: clienteId ?? listaPedidos[index]!.clienteId,
      fecha: fecha ?? listaPedidos[index]!.fecha,
      detalles: detalles ?? listaPedidos[index]!.detalles,
      estado: estado ?? listaPedidos[index]!.estado,
      total: total ?? listaPedidos[index]!.total,
    };
    res.json(listaPedidos[index]);
  }
});

// ENDPOINT DELETE -- ELIMINAR UN PEDIDO
router.delete("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Pedidos']
  // #swagger.summary = 'Eliminar un pedido'
  const idBuscado = Number(req.params.id);
  const index = listaPedidos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "Pedido no encontrado para eliminar" });
  } else {
    let Listanueva = listaPedidos.filter((e) => e.id !== idBuscado);
    setListaPedidos(Listanueva);
    res.json({ mensaje: "Pedido eliminado con exito" });
  }
});

// EXPORTACIONES
export default router;