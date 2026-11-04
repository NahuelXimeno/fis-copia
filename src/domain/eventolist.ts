import { Evento, type CriterioFiltro } from "./evento.ts";
import { Usuario } from "./usuario.ts";

export class EventoList {
  private _eventos: Evento[] = [];

  constructor(eventosIniciales: Evento[] = []) {
    this._eventos = [...eventosIniciales];
  }

  get eventos(): readonly Evento[] {
    return [...this._eventos];
  }

  obtenerPorId(id: string): Evento | undefined {
    return this._eventos.find((ev) => ev.id === id?.trim());
  }

  agregar(evento: Evento, usuarioEjecutor?: Usuario): void {
    if (usuarioEjecutor && !usuarioEjecutor.esAdmin) {
      throw new Error("Acceso denegado: solo un administrador puede crear eventos.");
    }

    const existe = this._eventos.some((ev) => ev.id === evento.id);
    if (existe) {
      throw new Error(`El evento con ID "${evento.id}" ya existe.`);
    }

    this._eventos.push(evento);
  }

  eliminar(id: string, usuarioEjecutor?: Usuario): void {
    if (usuarioEjecutor && !usuarioEjecutor.esAdmin) {
      throw new Error("Acceso denegado: solo un administrador puede eliminar eventos.");
    }

    const indice = this._eventos.findIndex((ev) => ev.id === id?.trim());
    if (indice === -1) {
      throw new Error(`No se encontró el evento con ID "${id}".`);
    }

    this._eventos.splice(indice, 1);
  }

  filtrar(filtro: CriterioFiltro): Evento[] {
    return this._eventos.filter((ev) => ev.coincideConFiltro(filtro));
  }

  obtenerBarrios(): string[] {
    const barrios = this._eventos.map((ev) => ev.barrio);
    return [...new Set(barrios)].sort();
  }

  obtenerCategorias(): string[] {
    const cats = this._eventos.map((ev) => ev.categoria);
    return [...new Set(cats)].sort();
  }

  obtenerFavoritosDeUsuario(usuario: Usuario): Evento[] {
    return this._eventos.filter((ev) => usuario.tieneFavorito(ev.id));
  }
}

