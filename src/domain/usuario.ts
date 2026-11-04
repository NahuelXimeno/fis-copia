export class Usuario {
  private _id!: string;
  private _nombre!: string;
  private _esAdmin: boolean;
  private _intereses: string[];
  private _favoritos: string[];

  constructor(id: string, nombre: string, esAdmin: boolean = false) {
    this.id = id;
    this.nombre = nombre;
    this._esAdmin = esAdmin;
    this._intereses = [];
    this._favoritos = [];
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El ID de usuario no puede ser vacío.");
    }
    this._id = trimmed;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    const trimmed = value?.trim();
    if (!trimmed) {
      throw new Error("El nombre de usuario no puede ser vacío.");
    }
    this._nombre = trimmed;
  }

  get esAdmin(): boolean {
    return this._esAdmin;
  }

  set esAdmin(value: boolean) {
    this._esAdmin = Boolean(value);
  }

  get intereses(): readonly string[] {
    return [...this._intereses];
  }

  set intereses(nuevosIntereses: string[]) {
    if (!Array.isArray(nuevosIntereses)) {
      throw new Error("Los intereses deben ser una lista.");
    }
    this._intereses = [
      ...new Set(nuevosIntereses.map((i) => i.trim()).filter((i) => i.length > 0)),
    ];
  }

  get favoritos(): readonly string[] {
    return [...this._favoritos];
  }

  agregarFavorito(eventoId: string): void {
    const trimmed = eventoId?.trim();
    if (!trimmed) {
      throw new Error("El ID de evento no es válido.");
    }
    if (!this._favoritos.includes(trimmed)) {
      this._favoritos.push(trimmed);
    }
  }

  eliminarFavorito(eventoId: string): void {
    const trimmed = eventoId?.trim();
    this._favoritos = this._favoritos.filter((id) => id !== trimmed);
  }

  tieneFavorito(eventoId: string): boolean {
    return this._favoritos.includes(eventoId?.trim());
  }

  agregarInteres(categoria: string): void {
    const trimmed = categoria?.trim();
    if (!trimmed) {
      throw new Error("La categoría de interés no puede ser vacía.");
    }
    if (!this._intereses.includes(trimmed)) {
      this._intereses.push(trimmed);
    }
  }

  eliminarInteres(categoria: string): void {
    const trimmed = categoria?.trim();
    this._intereses = this._intereses.filter((c) => c !== trimmed);
  }
}

