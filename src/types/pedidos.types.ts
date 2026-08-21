interface pedido {
    id: number;
    clienteId: number;
    fecha: string;
    detalles: string;
    estado: string;
    total: number;
}

interface crearPedido {
    clienteId: number;
    detalles: string;
    estado: string;
    total: number;
}

interface actualizarPedido {
    clienteId: number;
    fecha: string;
    detalles:string;
    estado: string;
    total:number;

}

interface filtrarPedido {
    clienteId?: number;
    fecha?: string;
    detalles?: string;
    estado?: string;
    total?: number;
}

interface idParam {
    id: string;
}

export type {pedido , crearPedido, actualizarPedido, filtrarPedido, idParam}