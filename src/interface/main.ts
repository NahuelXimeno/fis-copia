import { Evento, type CriterioFiltro } from "../domain/evento.ts";
import { EventoList } from "../domain/eventolist.ts";
import { Usuario } from "../domain/usuario.ts";

// --- ESTADO EN MEMORIA (Sin persistencia externa, conforme a restricciones) ---
const usuarioComun = new Usuario("u-sofia", "Sofía", false);
usuarioComun.intereses = ["Música", "Teatro"];

const usuarioAdmin = new Usuario("u-admin", "Nahuel (Admin)", true);
usuarioAdmin.intereses = ["Música", "Visuales", "Cine"];

let usuarioActivo: Usuario = usuarioComun;
let mostrandoSoloFavoritos = false;

// Catálogo precargado de eventos para Montevideo
const eventosIniciales: Evento[] = [
  new Evento(
    "ev-1",
    "La Traviata — Ópera en el Solís",
    "Puesta en escena de la célebre ópera de Giuseppe Verdi con orquesta en vivo.",
    "Teatro",
    "Ciudad Vieja",
    "Teatro Solís (Buenos Aires s/n)",
    "2026-11-20",
    "20:00",
    750,
    "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-2",
    "Noche de Jazz en Pocitos",
    "Trío acústico interpretando estándares de jazz, swing y bossa nova en formato íntimo.",
    "Música",
    "Pocitos",
    "Café Cultural Pocitos (Av. Brasil)",
    "2026-11-15",
    "21:30",
    350,
    "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-3",
    "Muestra: Miradas Urbanas de Montevideo",
    "Exposición fotográfica colectiva sobre la transformación arquitectónica de la bahía y el puerto.",
    "Visuales",
    "Parque Rodó",
    "MNAV - Museo Nacional de Artes Visuales",
    "2026-11-18",
    "17:00",
    0,
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-4",
    "Ciclo de Cine: Clásicos Rioplatenses",
    "Proyección de largometrajes restaurados de las décadas del 60 y 70 con debate posterior.",
    "Cine",
    "Cordón",
    "Cinemateca Uruguaya (Bartolomé Mitre 1236)",
    "2026-11-22",
    "19:00",
    250,
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-5",
    "Feria de Editoriales Independientes",
    "Encuentro literario, presentaciones de nuevos autores uruguayos y lecturas de poesía abierta.",
    "Literatura",
    "Centro",
    "Atrio de la Intendencia de Montevideo",
    "2026-11-25",
    "16:00",
    0,
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-6",
    "Murga y Candombe al Parque",
    "Ensayo abierto de cuerdas de tambores y presentaciones de murgas de cara al Carnaval.",
    "Comunidad",
    "Parque Rodó",
    "Teatro de Verano Ramón Collazo",
    "2026-11-29",
    "18:30",
    0,
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60"
  ),
];

const listaEventos = new EventoList(eventosIniciales);

// Elementos del DOM
const contenedorCards = document.getElementById("contenedor-cards") as HTMLDivElement;

// Elementos del Dado 3D
const modalDadoElement = document.getElementById("modalDadoSorpresa") as HTMLElement;
const diceCube = document.getElementById("dice-cube") as HTMLElement;
const diceSceneClick = document.getElementById("dice-scene-click") as HTMLElement;
const btnRollDice = document.getElementById("btn-roll-dice") as HTMLButtonElement;
const diceResultContainer = document.getElementById("dice-result-container") as HTMLElement;
const diceEventCategory = document.getElementById("dice-event-category") as HTMLElement;
const diceEventPrice = document.getElementById("dice-event-price") as HTMLElement;
const diceEventTitle = document.getElementById("dice-event-title") as HTMLElement;
const diceEventDesc = document.getElementById("dice-event-desc") as HTMLElement;
const diceEventVenue = document.getElementById("dice-event-venue") as HTMLElement;
const btnDiceVerFicha = document.getElementById("btn-dice-ver-ficha") as HTMLButtonElement;

let eventoSeleccionadoDado: Evento | null = null;

// Ángulos exactos para que cada cara del dado mire al frente (1 a 6)
const faceRotations: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 0, y: -180 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 },
};

// Motor de física e inercia continua (requestAnimationFrame)
let rotX = 20;
let rotY = 20;
let velX = 0;
let velY = 0;
let animationFrameId: number | null = null;

function renderDiceTransform() {
  if (diceCube) {
    diceCube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
}

function lanzarDadoAnimado() {
  const eventos = listaEventos.eventos;
  if (eventos.length === 0) return;

  btnRollDice.disabled = true;
  diceResultContainer.classList.add("d-none");

  // Si ya había una animación previa en curso, se conserva la velocidad y la rotación actual para transicionar fluidamente
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  // Objetivo aleatorio (1 a 6)
  const targetFace = Math.floor(Math.random() * 6) + 1;
  const targetAngles = faceRotations[targetFace];

  const ajenos = eventos.filter((ev) => !usuarioActivo.intereses.includes(ev.categoria));
  const pool = ajenos.length > 0 ? ajenos : eventos;
  eventoSeleccionadoDado = pool[Math.floor(Math.random() * pool.length)];

  // Impulso inicial aleatorio en los ejes X e Y
  velX = (Math.random() * 8 + 18) * (Math.random() > 0.5 ? 1 : -1);
  velY = (Math.random() * 8 + 18) * (Math.random() > 0.5 ? 1 : -1);

  // Desactivar temporalmente la transición CSS para que rAF controle la física cuadro por cuadro sin saltos
  diceCube.style.transition = "none";

  const startTime = performance.now();
  const rollDuration = 1100; // 1.1s de giros libres y fricción

  function step(now: number) {
    const elapsed = now - startTime;

    if (elapsed < rollDuration) {
      // Aplicar fricción continua / amortiguamiento (damping)
      rotX += velX;
      rotY += velY;
      velX *= 0.985;
      velY *= 0.985;

      renderDiceTransform();
      animationFrameId = requestAnimationFrame(step);
    } else {
      // Fase de frenado suave hacia la cara elegida (ease-out con inercia final)
      const currentTurnsX = Math.round((rotX - targetAngles.x) / 360);
      const currentTurnsY = Math.round((rotY - targetAngles.y) / 360);

      const finalX = (currentTurnsX + (velX >= 0 ? 1 : -1)) * 360 + targetAngles.x;
      const finalY = (currentTurnsY + (velY >= 0 ? 1 : -1)) * 360 + targetAngles.y;

      rotX = finalX;
      rotY = finalY;

      // Reactivar transición CSS con curva de amortiguación cúbica para el asentamiento final
      diceCube.style.transition = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)";
      renderDiceTransform();

      setTimeout(() => {
        if (eventoSeleccionadoDado) {
          diceEventCategory.textContent = eventoSeleccionadoDado.categoria;
          diceEventPrice.textContent = eventoSeleccionadoDado.esGratuito
            ? "Entrada Libre"
            : `$ ${eventoSeleccionadoDado.precio}`;
          diceEventTitle.textContent = eventoSeleccionadoDado.titulo;
          diceEventDesc.textContent = eventoSeleccionadoDado.descripcion;
          diceEventVenue.textContent = `${eventoSeleccionadoDado.lugar} (${eventoSeleccionadoDado.barrio})`;
          diceResultContainer.classList.remove("d-none");
        }
        btnRollDice.disabled = false;
        animationFrameId = null;
      }, 850);
    }
  }

  animationFrameId = requestAnimationFrame(step);
}

const filterCategoria = document.getElementById("filter-categoria") as HTMLSelectElement;
const filterBarrio = document.getElementById("filter-barrio") as HTMLSelectElement;
const filterPrecio = document.getElementById("filter-precio") as HTMLSelectElement;
const btnResetFilters = document.getElementById("btn-reset-filters") as HTMLButtonElement;
const btnClearEmpty = document.getElementById("btn-clear-empty") as HTMLButtonElement;
const mensajeSinResultados = document.getElementById("mensaje-sin-resultados") as HTMLDivElement;

const countTodos = document.getElementById("count-todos") as HTMLSpanElement;
const countFavoritos = document.getElementById("count-favoritos") as HTMLSpanElement;
const badgeFavCount = document.getElementById("badge-fav-count") as HTMLSpanElement;
const badgeInteresesCount = document.getElementById("badge-intereses-count") as HTMLSpanElement;

const btnVerTodos = document.getElementById("btn-ver-todos") as HTMLButtonElement;
const btnVerFavoritos = document.getElementById("btn-ver-favoritos") as HTMLButtonElement;
const tabCartelera = document.getElementById("tab-cartelera") as HTMLAnchorElement;
const tabFavoritos = document.getElementById("tab-favoritos") as HTMLAnchorElement;

const currentUserLabel = document.getElementById("current-user-label") as HTMLSpanElement;
const btnPerfilSofia = document.getElementById("btn-perfil-sofia") as HTMLButtonElement;
const btnPerfilAdmin = document.getElementById("btn-perfil-admin") as HTMLButtonElement;
const navItemAdmin = document.getElementById("nav-item-admin") as HTMLLIElement;
const seccionAdmin = document.getElementById("seccion-admin") as HTMLElement;

const formCrearEvento = document.getElementById("form-crear-evento") as HTMLFormElement;
const alertContainer = document.getElementById("alert-container") as HTMLDivElement;
const btnSurprise = document.getElementById("btn-surprise") as HTMLButtonElement;
const onboardingChipsContainer = document.getElementById("onboarding-chips") as HTMLDivElement;
const btnSelectAllInterests = document.getElementById("btn-select-all-interests") as HTMLButtonElement;
const btnSaveOnboarding = document.getElementById("btn-save-onboarding") as HTMLButtonElement;
const puenteCulturalDescripcion = document.getElementById("puente-cultural-descripcion") as HTMLElement;

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  poblarSelectBarrios();
  actualizarVistaUsuario();
  renderizarChipsOnboarding();
  aplicarFiltrosYRenderizar();
  configurarEventosUI();
});

// Poblar selector dinámico de barrios a partir de la lista
function poblarSelectBarrios() {
  const barrios = listaEventos.obtenerBarrios();
  const valorActual = filterBarrio.value;
  filterBarrio.innerHTML = '<option value="todos">Todos los barrios</option>';
  barrios.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    filterBarrio.appendChild(opt);
  });
  if (barrios.includes(valorActual)) {
    filterBarrio.value = valorActual;
  }
}

// Configurar listeners de la interfaz
function configurarEventosUI() {
  filterCategoria?.addEventListener("change", () => aplicarFiltrosYRenderizar());
  filterBarrio?.addEventListener("change", () => aplicarFiltrosYRenderizar());
  filterPrecio?.addEventListener("change", () => aplicarFiltrosYRenderizar());

  btnResetFilters?.addEventListener("click", resetearFiltros);
  btnClearEmpty?.addEventListener("click", resetearFiltros);

  btnVerTodos?.addEventListener("click", () => {
    mostrandoSoloFavoritos = false;
    btnVerTodos.classList.add("active");
    btnVerFavoritos.classList.remove("active");
    tabCartelera.classList.add("active");
    tabFavoritos.classList.remove("active");
    aplicarFiltrosYRenderizar();
  });

  btnVerFavoritos?.addEventListener("click", () => {
    mostrandoSoloFavoritos = true;
    btnVerFavoritos.classList.add("active");
    btnVerTodos.classList.remove("active");
    tabFavoritos.classList.add("active");
    tabCartelera.classList.remove("active");
    aplicarFiltrosYRenderizar();
  });

  tabCartelera?.addEventListener("click", (e) => {
    e.preventDefault();
    btnVerTodos.click();
  });

  tabFavoritos?.addEventListener("click", (e) => {
    e.preventDefault();
    btnVerFavoritos.click();
  });

  // Cambio de usuario / rol
  btnPerfilSofia?.addEventListener("click", () => {
    usuarioActivo = usuarioComun;
    actualizarVistaUsuario();
    aplicarFiltrosYRenderizar();
    mostrarAlerta("Sesión cambiada a perfil: Sofía (Usuario común)", "info");
  });

  btnPerfilAdmin?.addEventListener("click", () => {
    usuarioActivo = usuarioAdmin;
    actualizarVistaUsuario();
    aplicarFiltrosYRenderizar();
    mostrarAlerta("Modo Administrador activado: podés crear y eliminar eventos", "warning");
  });

  // Crear evento desde Panel de Admin
  formCrearEvento?.addEventListener("submit", (e) => {
    e.preventDefault();
    crearEventoAdmin();
  });

  // Botón Sorpresa abre modal con Dado 3D
  btnSurprise?.addEventListener("click", () => {
    diceResultContainer.classList.add("d-none");
    if (diceCube) {
      diceCube.style.transform = "rotateX(20deg) rotateY(20deg)";
    }
    // @ts-expect-error Bootstrap Modal
    const modalDado = new window.bootstrap.Modal(modalDadoElement);
    modalDado.show();
  });

  // Tirar el dado al presionar el botón o hacer clic directamente sobre el dado
  btnRollDice?.addEventListener("click", lanzarDadoAnimado);
  diceSceneClick?.addEventListener("click", () => {
    if (!btnRollDice.disabled) {
      lanzarDadoAnimado();
    }
  });

  btnDiceVerFicha?.addEventListener("click", () => {
    if (eventoSeleccionadoDado) {
      // @ts-expect-error Bootstrap Modal
      const modalDadoInstance = window.bootstrap.Modal.getInstance(modalDadoElement);
      modalDadoInstance?.hide();
      mostrarModalDetalle(eventoSeleccionadoDado.id);
    }
  });

  // Guardar Onboarding
  btnSaveOnboarding?.addEventListener("click", () => {
    actualizarBadges();
    actualizarMensajePuenteCultural();
    aplicarFiltrosYRenderizar();
    mostrarAlerta("¡Intereses actualizados correctamente!", "success");
  });

  btnSelectAllInterests?.addEventListener("click", () => {
    const chips = onboardingChipsContainer.querySelectorAll(".interest-chip");
    chips.forEach((c) => c.classList.add("active"));
    usuarioActivo.intereses = ["Música", "Teatro", "Visuales", "Cine", "Literatura", "Comunidad"];
  });
}

function actualizarVistaUsuario() {
  if (currentUserLabel) {
    currentUserLabel.textContent = usuarioActivo.esAdmin
      ? "Nahuel (Admin)"
      : `${usuarioActivo.nombre} (Usuario)`;
  }

  if (usuarioActivo.esAdmin) {
    navItemAdmin.classList.remove("d-none");
    seccionAdmin.classList.remove("d-none");
    btnPerfilAdmin.classList.add("active");
    btnPerfilSofia.classList.remove("active");
  } else {
    navItemAdmin.classList.add("d-none");
    seccionAdmin.classList.add("d-none");
    btnPerfilSofia.classList.add("active");
    btnPerfilAdmin.classList.remove("active");
  }

  actualizarBadges();
  actualizarMensajePuenteCultural();
  renderizarChipsOnboarding();
}

function actualizarBadges() {
  const totalFavs = usuarioActivo.favoritos.length;
  badgeFavCount.textContent = String(totalFavs);
  countFavoritos.textContent = String(totalFavs);
  badgeInteresesCount.textContent = String(usuarioActivo.intereses.length);
  countTodos.textContent = String(listaEventos.eventos.length);
}

function resetearFiltros() {
  filterCategoria.value = "todas";
  filterBarrio.value = "todos";
  filterPrecio.value = "todos";
  aplicarFiltrosYRenderizar();
}

function obtenerCriterioFiltro(): CriterioFiltro {
  const criterio: CriterioFiltro = {};
  if (filterCategoria.value !== "todas") {
    criterio.categoria = filterCategoria.value;
  }
  if (filterBarrio.value !== "todos") {
    criterio.barrio = filterBarrio.value;
  }

  if (filterPrecio.value === "gratis") {
    criterio.soloGratis = true;
  } else if (filterPrecio.value !== "todos") {
    criterio.precioMax = Number(filterPrecio.value);
  }

  return criterio;
}

function aplicarFiltrosYRenderizar() {
  const filtro = obtenerCriterioFiltro();
  let eventos = listaEventos.filtrar(filtro);

  if (mostrandoSoloFavoritos) {
    eventos = eventos.filter((ev) => usuarioActivo.tieneFavorito(ev.id));
  }

  renderizarCards(eventos);
  actualizarBadges();
}

function renderizarCards(eventos: Evento[]) {
  contenedorCards.innerHTML = "";

  if (eventos.length === 0) {
    mensajeSinResultados.classList.remove("d-none");
    return;
  }
  mensajeSinResultados.classList.add("d-none");

  eventos.forEach((ev) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    const esFav = usuarioActivo.tieneFavorito(ev.id);
    const precioTexto = ev.esGratuito ? "Entrada Libre" : `$ ${ev.precio}`;

    let badgeClass = "bg-culturama-teal";
    if (ev.categoria === "Teatro" || ev.categoria === "Literatura") {
      badgeClass = "bg-culturama-coral";
    } else if (ev.categoria === "Visuales" || ev.categoria === "Cine") {
      badgeClass = "bg-culturama-purple";
    }

    col.innerHTML = `
      <div class="card card-event h-100 shadow-sm border-0 position-relative">
        ${
          ev.imagenUrl
            ? `<img src="${ev.imagenUrl}" class="card-event-img" alt="${ev.titulo}" loading="lazy" />`
            : `<div class="card-event-img-fallback"><i class="bi bi-ticket-perforated"></i></div>`
        }
        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge ${badgeClass} badge-tag-category">
              ${ev.categoria}
            </span>
            <span class="badge ${ev.esGratuito ? "bg-success" : "bg-light text-dark border"} fw-semibold">
              ${precioTexto}
            </span>
          </div>

          <h5 class="card-title fw-bold text-dark mb-2">${ev.titulo}</h5>
          <p class="card-text text-muted small flex-grow-1 mb-3">${ev.descripcion}</p>

          <div class="small text-secondary mb-3">
            <div class="mb-1"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${ev.lugar} (${ev.barrio})</div>
            <div><i class="bi bi-calendar-event me-1 text-primary"></i> ${ev.fecha} — ${ev.horario} hs</div>
          </div>

          <div class="d-flex gap-2 pt-2 border-top">
            <button class="btn btn-sm btn-outline-danger flex-grow-1 btn-toggle-fav" data-id="${ev.id}">
              <i class="bi ${esFav ? "bi-heart-fill text-danger" : "bi-heart"} me-1"></i>
              ${esFav ? "Guardado" : "Favorito"}
            </button>
            <button class="btn btn-sm btn-culturama-surprise btn-ver-detalle" data-id="${ev.id}">
              <i class="bi bi-info-circle me-1"></i> Ficha
            </button>
            ${
              usuarioActivo.esAdmin
                ? `<button class="btn btn-sm btn-outline-secondary btn-eliminar-evento text-danger" data-id="${ev.id}" title="Eliminar evento (Admin)">
                    <i class="bi bi-trash"></i>
                   </button>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    contenedorCards.appendChild(col);
  });

  // Vincular eventos a botones de las cards
  contenedorCards.querySelectorAll(".btn-toggle-fav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id")!;
      if (usuarioActivo.tieneFavorito(id)) {
        usuarioActivo.eliminarFavorito(id);
      } else {
        usuarioActivo.agregarFavorito(id);
      }
      aplicarFiltrosYRenderizar();
    });
  });

  contenedorCards.querySelectorAll(".btn-ver-detalle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id")!;
      mostrarModalDetalle(id);
    });
  });

  contenedorCards.querySelectorAll(".btn-eliminar-evento").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id")!;
      if (confirm(`¿Seguro que deseas eliminar el evento ${id}?`)) {
        try {
          listaEventos.eliminar(id, usuarioActivo);
          poblarSelectBarrios();
          aplicarFiltrosYRenderizar();
          mostrarAlerta("Evento eliminado exitosamente.", "warning");
        } catch (error) {
          mostrarAlerta((error as Error).message, "danger");
        }
      }
    });
  });
}

function mostrarModalDetalle(id: string) {
  const ev = listaEventos.obtenerPorId(id);
  if (!ev) return;

  const modalBody = document.getElementById("modalDetalleBody")!;
  modalBody.innerHTML = `
    <h4 class="fw-bold text-dark">${ev.titulo}</h4>
    <span class="badge bg-culturama-teal mb-3">${ev.categoria}</span>
    <p class="text-secondary">${ev.descripcion}</p>
    <ul class="list-group list-group-flush mb-3">
      <li class="list-group-item px-0"><strong>Barrio:</strong> ${ev.barrio}</li>
      <li class="list-group-item px-0"><strong>Lugar:</strong> ${ev.lugar}</li>
      <li class="list-group-item px-0"><strong>Fecha y Hora:</strong> ${ev.fecha} a las ${ev.horario} hs</li>
      <li class="list-group-item px-0"><strong>Costo:</strong> ${ev.esGratuito ? "Entrada Libre y Gratuita" : `$ ${ev.precio} UYU`}</li>
    </ul>
    <div class="d-grid">
      <a href="https://maps.google.com/?q=${encodeURIComponent(ev.lugar + ' ' + ev.barrio + ' Montevideo')}" target="_blank" class="btn btn-culturama-dark btn-sm">
        <i class="bi bi-map me-1"></i> Ver ubicación en mapa
      </a>
    </div>
  `;

  // @ts-expect-error Bootstrap Modal global
  const modal = new window.bootstrap.Modal(document.getElementById("modalDetalleEvento"));
  modal.show();
}

function crearEventoAdmin() {
  const idInput = (document.getElementById("adm-id") as HTMLInputElement).value;
  const tituloInput = (document.getElementById("adm-titulo") as HTMLInputElement).value;
  const catInput = (document.getElementById("adm-categoria") as HTMLSelectElement).value;
  const barrioInput = (document.getElementById("adm-barrio") as HTMLInputElement).value;
  const lugarInput = (document.getElementById("adm-lugar") as HTMLInputElement).value;
  const fechaInput = (document.getElementById("adm-fecha") as HTMLInputElement).value;
  const horaInput = (document.getElementById("adm-horario") as HTMLInputElement).value;
  const precioInput = Number((document.getElementById("adm-precio") as HTMLInputElement).value);
  const imagenInput = (document.getElementById("adm-imagen") as HTMLInputElement).value;
  const descInput = (document.getElementById("adm-descripcion") as HTMLTextAreaElement).value;

  try {
    const nuevoEvento = new Evento(
      idInput,
      tituloInput,
      descInput,
      catInput,
      barrioInput,
      lugarInput,
      fechaInput,
      horaInput,
      precioInput,
      imagenInput,
    );

    listaEventos.agregar(nuevoEvento, usuarioActivo);
    poblarSelectBarrios();
    aplicarFiltrosYRenderizar();
    formCrearEvento.reset();
    mostrarAlerta(`¡Evento "${nuevoEvento.titulo}" publicado con éxito!`, "success");
  } catch (err) {
    mostrarAlerta((err as Error).message, "danger");
  }
}

function renderizarChipsOnboarding() {
  const todasCategorias = ["Música", "Teatro", "Visuales", "Cine", "Literatura", "Comunidad"];
  onboardingChipsContainer.innerHTML = "";

  todasCategorias.forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `interest-chip ${usuarioActivo.intereses.includes(cat) ? "active" : ""}`;
    chip.textContent = cat;

    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      if (usuarioActivo.intereses.includes(cat)) {
        usuarioActivo.eliminarInteres(cat);
      } else {
        usuarioActivo.agregarInteres(cat);
      }
    });

    onboardingChipsContainer.appendChild(chip);
  });
}

function actualizarMensajePuenteCultural() {
  const intereses = usuarioActivo.intereses;
  if (intereses.length === 0) {
    puenteCulturalDescripcion.textContent =
      "No tenés intereses seleccionados. Hacé clic en 'Ajustar mis gustos' para que podamos recomendarte planes a tu medida.";
  } else {
    puenteCulturalDescripcion.textContent = `Tus preferencias actuales son: ${intereses.join(", ")}. Te recomendamos explorar actividades complementarias que enriquecen tu consumo habitual con puentes culturales hacia disciplinas afines.`;
  }
}

function mostrarAlerta(mensaje: string, tipo: "success" | "danger" | "warning" | "info") {
  alertContainer.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show shadow-sm" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}
