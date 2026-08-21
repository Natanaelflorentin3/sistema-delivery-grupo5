/* import express from 'express';
import type {NextFunction, Request, Response} from "express"
import { error } from "node:console";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;


import pedidosRouter from './routes/pedidos.routes.js'
import { cargarDatos } from './data/pedidos.data.js';

app.use('/pedidos', pedidosRouter);




app.use(express.json()); 
app.use(function(req: Request, res: Response, next: NextFunction){
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//________________________________

app.get ("/pedidos", async function(req: Request, res: Response) {
    const estadoActual = await (`"status": "Servidor en línea", "version": "1.0.0"`);
    res.json(estadoActual);
});


app.get ("/", async function(req: Request, res: Response) {
    res.send(`Bienvenido al servidor de paolo
        . acceda a: http://localhost:3000/api/status
        . o tambien a: http://localhost:3000/api/estudiantes`);
});

app.listen(PORT, async function() {
    console.log(`AQUI SE ENCUENTRA EL SERVIDOR --> http://localhost:3000/`);
    await cargarDatos();
}) */