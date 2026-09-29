export class Country {
  _nombre!: string;
  _capital?: string;

  constructor(aNombre: string) {
    this.nombre = aNombre;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(aNombre: string) {
    const trimmed = aNombre.trim();
    if (trimmed.length === 0) {
      throw new Error("Nombre del país no puede ser vacío.");
    }
    this._nombre = trimmed;
  }

  get capital(): string | undefined {
    return this._capital;
  }

  set capital(aCapital: string) {
    const trimmed = aCapital.trim();
    this._capital = trimmed;
  }

  toString(): string {
    return `País: ${this.nombre} - capital: ${this.capital}`;
  }
}
