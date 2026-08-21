export interface pedido {
  id: number;
  clienteId: number;
  fecha: string;
  detalles: string;
  estado: string;
  total: number;
}

export interface crearPedido {
  clienteId: number;
  detalles: string;
  estado: string;
  total: number;
}

export interface actualizarPedido {
  clienteId: number;
  fecha: string;
  detalles: string;
  estado: string;
  total: number;
}

export interface filtrarPedido {
  clienteId?: number;
  fecha?: string;
  detalles?: string;
  estado?: string;
  total?: number;
}

export interface idParam {
  id: string;
}