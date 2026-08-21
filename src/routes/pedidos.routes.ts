//IMPORTACIONES
import { Router } from 'express';
import type {NextFunction, Request, Response} from "express"
import fs from "node:fs/promises";
import path from "node:path";
import type { pedido , crearPedido, actualizarPedido, filtrarPedido, idParam} from '../types/pedidos.types.js';
import { listaPedidos } from '../data/pedidos.data.js';
import { setListaPedidos } from '../data/pedidos.data.js';


const router = Router();

// --------------- ROUTES ------------------------

// ENDPOINT GET -- LEER LOS PEDIDOS
router.get ("", async function(req: Request, res: Response) {
    const estadoActualEstudiantes = await listaPedidos;
    res.json(estadoActualEstudiantes);
});


// ---------------- FILTRAR POR SU ESTADO ------------
router.get(
  "/",
    function (req: Request<{}, {}, {}, filtrarPedido>, res: Response) {
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
  const idBuscado = Number(req.params.id); //Number("juan") === 32

  if (isNaN(idBuscado)) {
    return res
      .status(400)
      .json({ error: "debe ser un id valido" });
  }
  const pedidoFiltrado = listaPedidos.find(
    (e) => e.id === idBuscado,
  );

  if (!pedidoFiltrado) {
    return res
      .status(404)
      .json({ error: "no se ha encontrado el pedido" });
  }
  return res.json(pedidoFiltrado);
});


// ENDPOINT POST -- CREAR UN PEDIDO
router.post("", function(req: Request<{},{}, crearPedido>, res: Response){
    const {clienteId, detalles, total, estado} = req.body;
    if(!clienteId || !detalles || !total || !estado ){
        return (res.status(400).json({ error: "se debe añadir toda la información"}))
    }
    const nuevoPedido:pedido = {
        id:listaPedidos.length>0
            ? listaPedidos.length + 1
            : 1,
        fecha: "20/08/2026",
        clienteId,
        detalles,
        total,
        estado,
    };
    listaPedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);
})



// ENDPOINT PUT -- ACTUALIZAR PEDIDO
router.put("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = listaPedidos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "Not Found" });
  } else {
    const {clienteId, estado, fecha, detalles, total}: actualizarPedido =
      req.body;

    listaPedidos[index] = {
      id: idBuscado,
      clienteId: clienteId ?? listaPedidos[index]?.clienteId,
      fecha: fecha ?? listaPedidos[index]?.fecha,
      detalles: detalles ?? listaPedidos[index]?.detalles,
      estado: estado ?? listaPedidos[index]?.estado,
      total: total ?? listaPedidos[index]?.total,
    };
    res.json(listaPedidos[index]);
  }
});



//ENDPOINT DELETE -- ELIMINAR UN PEDIDO
router.delete("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = listaPedidos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "Pedido no encontrado para eliminar" });
  } else {
    let Listanueva = listaPedidos.filter(
      (e) => e.id !== idBuscado,
    );
    setListaPedidos(Listanueva);
    res.json({ mensaje: "Pedido eliminado con exito" });
  }
});

//EXPORTACIONES

export default router;