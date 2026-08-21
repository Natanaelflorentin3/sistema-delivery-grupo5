interface productos {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
}
interface crearproducto {
  nombre: string;
  precio: number;
  categoria: string;
}
interface actualizarproducto {
  nombre: string;
  precio: number;
  categoria: string;
  disponible: boolean;
}
interface productosfiltrados {
  nombre?: string;
  precio?: string;
  categoria?: string;
  disponible?: boolean;
}
interface idParam {
  id: string;
}

export type {
  productos,
  crearproducto,
  actualizarproducto,
  productosfiltrados,
  idParam,
};
