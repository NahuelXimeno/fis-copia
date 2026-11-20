import { expect, test, describe } from "vitest";
import { Evento } from "../evento.ts";
import { EventoList } from "../eventolist.ts";
import { Usuario } from "../usuario.ts";

describe("EventoList class tests", () => {
  test("Create an empty event list", () => {
    const list = new EventoList();
    const expectedLength = 0;
    expect(list.eventos.length).toBe(expectedLength);
  });

  test("Add an event to the list as admin", () => {
    const list = new EventoList();
    const admin = new Usuario("u-admin", "Nahuel", true);
    const evento = new Evento(
      "ev-1",
      "Recital Jazz",
      "Concierto",
      "Música",
      "Pocitos",
      "Café Pocitos",
      "2026-11-15",
      "21:00",
      300,
    );

    list.agregar(evento, admin);
    const expectedLength = 1;
    expect(list.eventos.length).toBe(expectedLength);
    expect(list.obtenerPorId("ev-1")).toBe(evento);
  });

  test("Add repeated event to the list", () => {
    const list = new EventoList();
    const admin = new Usuario("u-admin", "Nahuel", true);
    const evento = new Evento(
      "ev-1",
      "Recital Jazz",
      "Concierto",
      "Música",
      "Pocitos",
      "Café Pocitos",
      "2026-11-15",
      "21:00",
      300,
    );

    list.agregar(evento, admin);
    const expectedErrorMessage = 'El evento con ID "ev-1" ya existe.';
    expect(() => list.agregar(evento, admin)).toThrow(expectedErrorMessage);
  });

  test("Add event rejected if user is not admin", () => {
    const list = new EventoList();
    const regularUser = new Usuario("u-user", "Sofía", false);
    const evento = new Evento(
      "ev-1",
      "Recital Jazz",
      "Concierto",
      "Música",
      "Pocitos",
      "Café Pocitos",
      "2026-11-15",
      "21:00",
      300,
    );

    const expectedErrorMessage =
      "Acceso denegado: solo un administrador puede crear eventos.";
    expect(() => list.agregar(evento, regularUser)).toThrow(
      expectedErrorMessage,
    );
  });

  test("Delete an event as admin", () => {
    const admin = new Usuario("u-admin", "Nahuel", true);
    const evento = new Evento(
      "ev-1",
      "Recital Jazz",
      "Concierto",
      "Música",
      "Pocitos",
      "Café Pocitos",
      "2026-11-15",
      "21:00",
      300,
    );
    const list = new EventoList([evento]);

    list.eliminar("ev-1", admin);
    const expectedLength = 0;
    expect(list.eventos.length).toBe(expectedLength);
    expect(list.obtenerPorId("ev-1")).toBeUndefined();
  });

  test("Delete event rejected if user is not admin", () => {
    const regularUser = new Usuario("u-user", "Sofía", false);
    const evento = new Evento(
      "ev-1",
      "Recital Jazz",
      "Concierto",
      "Música",
      "Pocitos",
      "Café Pocitos",
      "2026-11-15",
      "21:00",
      300,
    );
    const list = new EventoList([evento]);

    const expectedErrorMessage =
      "Acceso denegado: solo un administrador puede eliminar eventos.";
    expect(() => list.eliminar("ev-1", regularUser)).toThrow(
      expectedErrorMessage,
    );
  });

  test("Delete non-existent event", () => {
    const admin = new Usuario("u-admin", "Nahuel", true);
    const list = new EventoList();
    const expectedErrorMessage = 'No se encontró el evento con ID "inexistente".';

    expect(() => list.eliminar("inexistente", admin)).toThrow(
      expectedErrorMessage,
    );
  });

  test("Filter events list", () => {
    const ev1 = new Evento("ev-1", "Jazz", "Desc", "Música", "Pocitos", "Café", "2026-11-15", "21:00", 300);
    const ev2 = new Evento("ev-2", "Fotos", "Desc", "Visuales", "Centro", "MNAV", "2026-11-18", "18:00", 0);
    const list = new EventoList([ev1, ev2]);

    const musicEvents = list.filtrar({ categoria: "Música" });
    expect(musicEvents.length).toBe(1);
    expect(musicEvents[0].id).toBe("ev-1");

    const freeEvents = list.filtrar({ soloGratis: true });
    expect(freeEvents.length).toBe(1);
    expect(freeEvents[0].id).toBe("ev-2");
  });

  test("Get unique barrios and categories", () => {
    const ev1 = new Evento("ev-1", "Jazz", "Desc", "Música", "Pocitos", "Café", "2026-11-15", "21:00", 300);
    const ev2 = new Evento("ev-2", "Fotos", "Desc", "Visuales", "Centro", "MNAV", "2026-11-18", "18:00", 0);
    const list = new EventoList([ev1, ev2]);

    expect(list.obtenerBarrios()).toEqual(["Centro", "Pocitos"]);
    expect(list.obtenerCategorias()).toEqual(["Música", "Visuales"]);
  });

  test("Get user favorite events", () => {
    const user = new Usuario("u-1", "Sofía");
    user.agregarFavorito("ev-2");
    const ev1 = new Evento("ev-1", "Jazz", "Desc", "Música", "Pocitos", "Café", "2026-11-15", "21:00", 300);
    const ev2 = new Evento("ev-2", "Fotos", "Desc", "Visuales", "Centro", "MNAV", "2026-11-18", "18:00", 0);
    const list = new EventoList([ev1, ev2]);

    const favorites = list.obtenerFavoritosDeUsuario(user);
    expect(favorites.length).toBe(1);
    expect(favorites[0].id).toBe("ev-2");
  });
});

