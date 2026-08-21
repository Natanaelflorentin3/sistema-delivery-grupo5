import fs from "node:fs/promises";
import path from "node:path";
import type { pedido } from "../types/pedidos.types.js";

export let listaPedidos: pedido[] = [];

export async function cargarDatos() {
    try {
        const ruta = path.resolve("sistema-delivery-grupo5/src/data/pedidos.json");
        const data = await fs.readFile(ruta, "utf-8");
        listaPedidos = JSON.parse(data);
        console.log(`Datos cargados en memoria ${listaPedidos.length} productos cargados
            `)
    } catch (error) {
        console.log("No se encontraron pedidos");
        listaPedidos = [];
    }
}

export function setListaPedidos(nuevaLista: pedido[]) {
    listaPedidos = nuevaLista;
}
