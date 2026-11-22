import { expect, test, describe } from "vitest";
import { Evento } from "../evento.ts";

describe("Evento class tests", () => {
  test("Create an event", () => {
    const evento = new Evento(
      "ev-1",
      "La Traviata",
      "Ópera clásica de Verdi",
      "Teatro",
      "Ciudad Vieja",
      "Teatro Solís",
      "2026-11-20",
      "20:00",
      750,
      "https://example.com/img.jpg",
    );

    const expectedTitle = "La Traviata";
    const expectedCategory = "Teatro";
    const expectedPrice = 750;

    expect(evento.titulo).toBe(expectedTitle);
    expect(evento.categoria).toBe(expectedCategory);
    expect(evento.precio).toBe(expectedPrice);
    expect(evento.esGratuito).toBe(false);
  });

  test("Create a free event", () => {
    const evento = new Evento(
      "ev-2",
      "Muestra Urbana",
      "Exposición de fotos",
      "Visuales",
      "Parque Rodó",
      "MNAV",
      "2026-11-18",
      "17:00",
      0,
    );

    expect(evento.esGratuito).toBe(true);
  });

  test("Invalid empty event title", () => {
    expect(
      () =>
        new Evento(
          "ev-1",
          "",
          "Desc",
          "Teatro",
          "Centro",
          "Solís",
          "2026-11-20",
          "20:00",
        ),
    ).toThrow("El título del evento no puede ser vacío.");
  });

  test("Invalid empty event id", () => {
    expect(
      () =>
        new Evento(
          " ",
          "Título",
          "Desc",
          "Teatro",
          "Centro",
          "Solís",
          "2026-11-20",
          "20:00",
        ),
    ).toThrow("El ID del evento no puede ser vacío.");
  });

  test("Invalid empty description", () => {
    const evento = new Evento(
      "ev-1",
      "Título",
      "Desc",
      "Teatro",
      "Centro",
      "Solís",
      "2026-11-20",
      "20:00",
    );
    expect(() => {
      evento.descripcion = "";
    }).toThrow("La descripción del evento no puede ser vacía.");
  });

  test("Invalid empty category, barrio, lugar, fecha, horario", () => {
    const evento = new Evento(
      "ev-1",
      "Título",
      "Desc",
      "Teatro",
      "Centro",
      "Solís",
      "2026-11-20",
      "20:00",
    );

    expect(() => { evento.categoria = " "; }).toThrow("La categoría del evento no puede ser vacía.");
    expect(() => { evento.barrio = ""; }).toThrow("El barrio del evento no puede ser vacío.");
    expect(() => { evento.lugar = ""; }).toThrow("El lugar del evento no puede ser vacío.");
    expect(() => { evento.fecha = ""; }).toThrow("La fecha del evento no puede ser vacía.");
    expect(() => { evento.horario = ""; }).toThrow("El horario del evento no puede ser vacío.");
  });

  test("Getters for all properties", () => {
    const evento = new Evento(
      "ev-1",
      "Título",
      "Descripción",
      "Teatro",
      "Centro",
      "Sala Verdi",
      "2026-11-20",
      "20:00",
      100,
      "https://example.com/img.jpg",
    );

    expect(evento.id).toBe("ev-1");
    expect(evento.descripcion).toBe("Descripción");
    expect(evento.barrio).toBe("Centro");
    expect(evento.lugar).toBe("Sala Verdi");
    expect(evento.fecha).toBe("2026-11-20");
    expect(evento.horario).toBe("20:00");
  });

  test("Invalid negative price", () => {
    const evento = new Evento(
      "ev-1",
      "Título",
      "Desc",
      "Teatro",
      "Centro",
      "Solís",
      "2026-11-20",
      "20:00",
    );
    expect(() => {
      evento.precio = -100;
    }).toThrow("El precio no puede ser negativo.");
  });

  test("Trimmed image url", () => {
    const evento = new Evento(
      "ev-1",
      "Título",
      "Desc",
      "Teatro",
      "Centro",
      "Solís",
      "2026-11-20",
      "20:00",
    );
    evento.imagenUrl = "  https://test.com/foto.jpg  ";
    expect(evento.imagenUrl).toBe("https://test.com/foto.jpg");
    evento.imagenUrl = undefined;
    expect(evento.imagenUrl).toBe("");
  });

  test("Match filter criteria", () => {
    const evento = new Evento(
      "ev-1",
      "La Traviata",
      "Ópera",
      "Teatro",
      "Ciudad Vieja",
      "Teatro Solís",
      "2026-11-20",
      "20:00",
      500,
    );

    expect(evento.coincideConFiltro({ categoria: "Teatro" })).toBe(true);
    expect(evento.coincideConFiltro({ categoria: "todas" })).toBe(true);
    expect(evento.coincideConFiltro({ categoria: "Música" })).toBe(false);
    expect(evento.coincideConFiltro({ barrio: "Ciudad Vieja" })).toBe(true);
    expect(evento.coincideConFiltro({ barrio: "todos" })).toBe(true);
    expect(evento.coincideConFiltro({ barrio: "Pocitos" })).toBe(false);
    expect(evento.coincideConFiltro({ precioMax: 600 })).toBe(true);
    expect(evento.coincideConFiltro({ precioMax: 300 })).toBe(false);
    expect(evento.coincideConFiltro({ soloGratis: true })).toBe(false);
    expect(evento.coincideConFiltro({ busquedaTexto: "Traviata" })).toBe(true);
    expect(evento.coincideConFiltro({ busquedaTexto: "solís" })).toBe(true);
    expect(evento.coincideConFiltro({ busquedaTexto: "inconexo" })).toBe(false);
  });
});

