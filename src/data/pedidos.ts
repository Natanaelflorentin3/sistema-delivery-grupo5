import fs from "node:fs/promises";
import path from "node:path";
import type { pedido } from "../types/pedido";

export let listaPedidos: pedido[] = [];

export async function cargarDatosPedidos() {
  try {
    const ruta = path.resolve("./src/data/pedidos.data.json");
    const data = await fs.readFile(ruta, "utf-8");
    listaPedidos = JSON.parse(data);
    console.log(`Pedidos cargados en memoria: ${listaPedidos.length}`);
  } catch (error) {
    console.log("No se encontraron pedidos");
    listaPedidos = [];
  }
}

export function setListaPedidos(nuevaLista: pedido[]) {
  listaPedidos = nuevaLista;
}