export interface CriterioFiltro {
  categoria?: string;
  barrio?: string;
  precioMax?: number;
  soloGratis?: boolean;
  busquedaTexto?: string;
}

export class Evento {
  private _id!: string;
  private _titulo!: string;
  private _descripcion!: string;
  private _categoria!: string;
  private _barrio!: string;
  private _lugar!: string;
  private _fecha!: string;
  private _horario!: string;
  private _precio!: number;
  private _imagenUrl?: string;

  constructor(
    id: string,
    titulo: string,
    descripcion: string,
    categoria: string,
    barrio: string,
    lugar: string,
    fecha: string,
    horario: string,
    precio: number = 0,
    imagenUrl?: string,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.barrio = barrio;
    this.lugar = lugar;
    this.fecha = fecha;
    this.horario = horario;
    this.precio = precio;
    this._imagenUrl = imagenUrl?.trim() || "";
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El ID del evento no puede ser vacío.");
    }
    this._id = trimmed;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El título del evento no puede ser vacío.");
    }
    this._titulo = trimmed;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("La descripción del evento no puede ser vacía.");
    }
    this._descripcion = trimmed;
  }

  get categoria(): string {
    return this._categoria;
  }

  set categoria(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("La categoría del evento no puede ser vacía.");
    }
    this._categoria = trimmed;
  }

  get barrio(): string {
    return this._barrio;
  }

  set barrio(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El barrio del evento no puede ser vacío.");
    }
    this._barrio = trimmed;
  }

  get lugar(): string {
    return this._lugar;
  }

  set lugar(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El lugar del evento no puede ser vacío.");
    }
    this._lugar = trimmed;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("La fecha del evento no puede ser vacía.");
    }
    this._fecha = trimmed;
  }

  get horario(): string {
    return this._horario;
  }

  set horario(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El horario del evento no puede ser vacío.");
    }
    this._horario = trimmed;
  }

  get precio(): number {
    return this._precio;
  }

  set precio(value: number) {
    if (value < 0 || isNaN(value)) {
      throw new Error("El precio no puede ser negativo.");
    }
    this._precio = Number(value);
  }

  get imagenUrl(): string | undefined {
    return this._imagenUrl;
  }

  set imagenUrl(value: string | undefined) {
    this._imagenUrl = value?.trim() || "";
  }

  get esGratuito(): boolean {
    return this._precio === 0;
  }

  coincideConFiltro(filtro: CriterioFiltro): boolean {
    if (filtro.categoria && filtro.categoria !== "todas") {
      if (this.categoria.toLowerCase() !== filtro.categoria.toLowerCase()) {
        return false;
      }
    }

    if (filtro.barrio && filtro.barrio !== "todos") {
      if (this.barrio.toLowerCase() !== filtro.barrio.toLowerCase()) {
        return false;
      }
    }

    if (filtro.soloGratis && !this.esGratuito) {
      return false;
    }

    if (filtro.precioMax !== undefined && !isNaN(filtro.precioMax) && filtro.precioMax > 0) {
      if (this.precio > filtro.precioMax) {
        return false;
      }
    }

    if (filtro.busquedaTexto && filtro.busquedaTexto.trim()) {
      const q = filtro.busquedaTexto.trim().toLowerCase();
      const coincideTexto =
        this.titulo.toLowerCase().includes(q) ||
        this.descripcion.toLowerCase().includes(q) ||
        this.lugar.toLowerCase().includes(q) ||
        this.barrio.toLowerCase().includes(q);
      if (!coincideTexto) {
        return false;
      }
    }

    return true;
  }
}

