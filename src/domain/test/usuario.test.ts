import { expect, test, describe } from "vitest";
import { Usuario } from "../usuario.ts";

describe("Usuario class tests", () => {
  test("Create a user", () => {
    const user = new Usuario("u1", "Sofía", false);
    const expectedName = "Sofía";
    const expectedId = "u1";
    const expectedIsAdmin = false;

    expect(user.nombre).toBe(expectedName);
    expect(user.id).toBe(expectedId);
    expect(user.esAdmin).toBe(expectedIsAdmin);
  });

  test("Invalid empty user name", () => {
    expect(() => new Usuario("u1", "")).toThrow(
      "El nombre de usuario no puede ser vacío.",
    );
  });

  test("Invalid empty user id", () => {
    expect(() => new Usuario("", "Sofía")).toThrow(
      "El ID de usuario no puede ser vacío.",
    );
  });

  test("Trimmed user name and id", () => {
    const user = new Usuario(" u1 ", " Sofía ");
    expect(user.id).toBe("u1");
    expect(user.nombre).toBe("Sofía");
  });

  test("Set user as admin", () => {
    const user = new Usuario("u1", "Nahuel");
    user.esAdmin = true;
    const expectedIsAdmin = true;
    expect(user.esAdmin).toBe(expectedIsAdmin);
  });

  test("Add a favorite event", () => {
    const user = new Usuario("u1", "Sofía");
    user.agregarFavorito("ev-1");
    const expectedLength = 1;
    expect(user.favoritos.length).toBe(expectedLength);
    expect(user.tieneFavorito("ev-1")).toBe(true);
  });

  test("Add repeated favorite event", () => {
    const user = new Usuario("u1", "Sofía");
    user.agregarFavorito("ev-1");
    user.agregarFavorito("ev-1");
    const expectedLength = 1;
    expect(user.favoritos.length).toBe(expectedLength);
  });

  test("Remove a favorite event", () => {
    const user = new Usuario("u1", "Sofía");
    user.agregarFavorito("ev-1");
    user.eliminarFavorito("ev-1");
    const expectedLength = 0;
    expect(user.favoritos.length).toBe(expectedLength);
    expect(user.tieneFavorito("ev-1")).toBe(false);
  });

  test("Invalid empty favorite id", () => {
    const user = new Usuario("u1", "Sofía");
    expect(() => user.agregarFavorito("")).toThrow(
      "El ID de evento no es válido.",
    );
  });

  test("Add and remove interest categories", () => {
    const user = new Usuario("u1", "Sofía");
    user.agregarInteres("Música");
    user.agregarInteres("Teatro");
    expect(user.intereses.length).toBe(2);

    user.eliminarInteres("Música");
    expect(user.intereses.length).toBe(1);
    expect(user.intereses[0]).toBe("Teatro");
  });

  test("Set interest array list", () => {
    const user = new Usuario("u1", "Sofía");
    user.intereses = ["Música", "Cine", "Música"];
    expect(user.intereses.length).toBe(2);
  });

  test("Invalid empty interest category", () => {
    const user = new Usuario("u1", "Sofía");
    expect(() => user.agregarInteres("   ")).toThrow(
      "La categoría de interés no puede ser vacía.",
    );
  });

  test("Invalid non-array interests setter", () => {
    const user = new Usuario("u1", "Sofía");
    expect(() => {
      // @ts-expect-error test invalid param
      user.intereses = "no-array";
    }).toThrow("Los intereses deben ser una lista.");
  });
});

