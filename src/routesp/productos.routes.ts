import { Router } from "express";
import type { Request, Response } from "express";
import { listaproductos, setListaproductos } from "../datap/productos.datap.js";

import type {
  productos,
  crearproducto,
  actualizarproducto,
  productosfiltrados,
  idParam,
} from "../typesp/productos.types.js";
const router = Router();

//endpoints

router.get(
  "/",
  function (req: Request<{}, {}, {}, productosfiltrados>, res: Response) {
    // #swagger.description = 'Obtiene la lista de estudiantes'
    const { nombre, categoria, disponible } = req.query;
    let resultado = [...listaproductos];

    if (categoria) {
      resultado = resultado.filter(
        (e) => e.categoria.toLowerCase() === categoria.toLowerCase(),
      );
    }

    if (nombre) {
      resultado = resultado.filter(
        (e) => e.nombre.toLowerCase() === nombre.toLowerCase(),
      );
    }

    if (disponible) {
      const estado = String(disponible).toLowerCase();

      if (estado !== "true" && estado !== "false") {
        return res.json({
          error: "el estado disponible debe ser true o false",
        });
      }

      const estadisponible = estado === "true";

      resultado = resultado.filter((e) => e.disponible === estadisponible);
    }

    // mostrar el resultado filtrado
    return res.json({
      total: resultado.length,
      datos: resultado,
    });
  },
);

//endpoint para traer a a un estudiante especifico x su id

router.get("/:id", function (req: Request<idParam>, res: Response) {
  // #swagger.description = 'Obtiene la informacion de un estudiante en especifico por su id'
  const idBuscado = Number(req.params.id); //Number("juan") === 32

  if (isNaN(idBuscado)) {
    return res
      .status(400)
      .json({ error: "El parametro id debe ser un numero valido" });
  }
  const productosfiltrado = listaproductos.find((e) => e.id === idBuscado);

  if (!productosfiltrado) {
    return res.status(404).json({ error: "no existe un producto con ese ID" });
  }
  return res.json(productosfiltrado);
});

//CREAR UN ESTUDIANTE NUEVO METODO POST

router.post("/", function (req: Request<{}, {}, crearproducto>, res: Response) {
  const { nombre, precio, categoria } = req.body;
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: "faltan datos q son obligatorios" });
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
  const idBuscado = Number(req.params.id);
  const index = listaproductos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "producto no encontrado >:c" });
  } else {
    const { nombre, precio, disponible, categoria }: actualizarproducto =
      req.body;
    // actualizando la informacion del usuario
    listaproductos[index] = {
      id: idBuscado,
      nombre: nombre ?? listaproductos[index]?.nombre,
      precio: precio ?? listaproductos[index]?.precio,
      categoria: categoria ?? listaproductos[index]?.categoria,
      disponible: disponible ?? listaproductos[index]?.disponible,
    };
    res.json(listaproductos[index]);
  }
});
// delete ELIMINACION DE UN REGISTRO :C
router.delete("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = listaproductos.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "producto no encontrado no podemos eliminarlo" });
  } else {
    let Listanueva = listaproductos.filter((e) => e.id !== idBuscado);
    setListaproductos(Listanueva);
    res.json({ mensaje: "producto ELIMINADO EXITOSAMENTE" });
  }
});

export default router;
