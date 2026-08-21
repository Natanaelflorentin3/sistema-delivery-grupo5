import fs from "node:fs/promises";
import path from "node:path";
import type { productos } from "../types/productos";

export let listaproductos: productos[] = [];

export async function cargarDatosProductos() {
  try {
    const ruta = path.resolve("src/inventario.json");
    const data = await fs.readFile(ruta, "utf-8");
    listaproductos = JSON.parse(data);
    console.log(`DATOS CARGADOS EN MEMORIA: ${listaproductos.length} productos cargados`);
  } catch (error) {
    console.log("No se encontraron los productos en la lista o lista vacia");
    listaproductos = [];
  }
}

export function setListaproductos(nuevaLista: productos[]) {
  listaproductos = nuevaLista;
}