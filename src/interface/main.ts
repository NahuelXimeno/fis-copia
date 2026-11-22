import { Evento, type CriterioFiltro } from "../domain/evento.ts";
import { EventoList } from "../domain/eventolist.ts";
import { Usuario } from "../domain/usuario.ts";

// --- ESTADO EN MEMORIA (Sin persistencia externa, conforme a restricciones) ---
const usuarioComun = new Usuario("u-lautaro", "Lautaro", false);
// Usuario nuevo inicia sin intereses preseleccionados para que complete su Onboarding
usuarioComun.intereses = [];

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
  new Evento(
    "ev-7",
    "Sinfonía Montevideana: Clásicos al Aire Libre",
    "Concierto de cámara interpretando obras de Piazzolla y Fabini en el rosedal histórico.",
    "Música",
    "Prado",
    "Rosedal del Prado (Av. Buschental)",
    "2026-11-27",
    "19:00",
    0,
    "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-8",
    "Stand-Up & Café Concert",
    "Noche de monólogos humorísticos y comedia uruguaya emergente con servicio de café y barra.",
    "Teatro",
    "Cordón",
    "Teatro El Galpón (Av. 18 de Julio 1618)",
    "2026-11-28",
    "21:00",
    420,
    "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-9",
    "Instalación Inmersiva: Luces de la Bahía",
    "Experiencia lumínica e interactiva con proyecciones audiovisuales sobre el muro del dique.",
    "Visuales",
    "Ciudad Vieja",
    "Espacio de Arte Contemporáneo (EAC)",
    "2026-11-24",
    "18:00",
    180,
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-10",
    "Festival de Cortometrajes Latinoamericanos",
    "Muestra competitiva de realizadores independientes de Uruguay, Argentina y Brasil con charlas abiertas.",
    "Cine",
    "Centro",
    "Sala Zitarrosa (Av. 18 de Julio 1012)",
    "2026-11-26",
    "20:30",
    300,
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-11",
    "Taller y Recital de Poesía Rioplatense",
    "Espacio interactivo de escritura creativa, lectura comentada de poetas uruguayos y micrófono abierto.",
    "Literatura",
    "Pocitos",
    "Biblioteca Amado Nervo (Santiago Vázquez 1135)",
    "2026-11-21",
    "17:30",
    0,
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60"
  ),
  new Evento(
    "ev-12",
    "Caminatour Histórico & Patrimonio del Barrio Sur",
    "Recorrido peatonal guiado descubriendo conventillos históricos, arte mural y la ruta del candombe tradicional.",
    "Comunidad",
    "Barrio Sur",
    "Plaza Carlos Gardel (Zelmar Michelini & Carlos Gardel)",
    "2026-11-30",
    "16:30",
    0,
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=60"
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
const filterBusqueda = document.getElementById("filter-busqueda") as HTMLInputElement;
const btnClearSearch = document.getElementById("btn-clear-search") as HTMLButtonElement;
const categoryChipsBar = document.getElementById("categoryChipsBar") as HTMLDivElement;
const activeFilterTags = document.getElementById("activeFilterTags") as HTMLDivElement;
const btnResetFilters = document.getElementById("btn-reset-filters") as HTMLButtonElement;
const btnClearEmpty = document.getElementById("btn-clear-empty") as HTMLButtonElement;
const mensajeSinResultados = document.getElementById("mensaje-sin-resultados") as HTMLDivElement;
const sinResultadosIcono = document.getElementById("sin-resultados-icono") as HTMLElement;
const sinResultadosTitulo = document.getElementById("sin-resultados-titulo") as HTMLElement;
const sinResultadosDesc = document.getElementById("sin-resultados-desc") as HTMLElement;

const countTodos = document.getElementById("count-todos") as HTMLSpanElement;
const countFavoritos = document.getElementById("count-favoritos") as HTMLSpanElement;
const badgeFavCount = document.getElementById("badge-fav-count") as HTMLSpanElement;
const badgeInteresesCount = document.getElementById("badge-intereses-count") as HTMLSpanElement;

const btnVerTodos = document.getElementById("btn-ver-todos") as HTMLButtonElement;
const btnVerFavoritos = document.getElementById("btn-ver-favoritos") as HTMLButtonElement;
const tabCartelera = document.getElementById("tab-cartelera") as HTMLAnchorElement;
const tabFavoritos = document.getElementById("tab-favoritos") as HTMLAnchorElement;

const currentUserLabel = document.getElementById("current-user-label") as HTMLSpanElement;
const btnPerfilUsuario = document.getElementById("btn-perfil-usuario") as HTMLButtonElement;
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

  // Si el usuario ingresa sin intereses definidos, desplegar automáticamente el onboarding
  if (usuarioActivo.intereses.length === 0) {
    setTimeout(() => {
      const modalEl = document.getElementById("modalOnboarding");
      if (modalEl) {
        // @ts-expect-error Bootstrap Modal
        const modalOnboarding = new window.bootstrap.Modal(modalEl);
        modalOnboarding.show();
      }
    }, 450);
  }
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

  // Input de búsqueda en tiempo real
  filterBusqueda?.addEventListener("input", () => {
    if (filterBusqueda.value.trim().length > 0) {
      btnClearSearch?.classList.remove("d-none");
    } else {
      btnClearSearch?.classList.add("d-none");
    }
    aplicarFiltrosYRenderizar();
  });

  btnClearSearch?.addEventListener("click", () => {
    filterBusqueda.value = "";
    btnClearSearch.classList.add("d-none");
    aplicarFiltrosYRenderizar();
    filterBusqueda.focus();
  });

  // Selector visual de Categorías con Chips (21st.dev)
  const categoryChips = categoryChipsBar?.querySelectorAll(".category-chip");
  categoryChips?.forEach((chip) => {
    chip.addEventListener("click", () => {
      categoryChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const selectedCat = chip.getAttribute("data-category") || "todas";
      filterCategoria.value = selectedCat;
      aplicarFiltrosYRenderizar();
    });
  });

  btnResetFilters?.addEventListener("click", resetearFiltros);
  btnClearEmpty?.addEventListener("click", () => {
    if (mostrandoSoloFavoritos) {
      btnVerTodos.click();
    } else {
      resetearFiltros();
    }
  });

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
    const seccionCartelera = document.getElementById("seccion-cartelera");
    seccionCartelera?.scrollIntoView({ behavior: "smooth" });
  });

  tabFavoritos?.addEventListener("click", (e) => {
    e.preventDefault();
    btnVerFavoritos.click();
    const seccionCartelera = document.getElementById("seccion-cartelera");
    seccionCartelera?.scrollIntoView({ behavior: "smooth" });
  });

  // Cambio de usuario / rol
  btnPerfilUsuario?.addEventListener("click", () => {
    usuarioActivo = usuarioComun;
    actualizarVistaUsuario();
    aplicarFiltrosYRenderizar();
    mostrarAlerta("Sesión cambiada a perfil: Lautaro (Usuario común)", "info");
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

  // Vincular eventos del Floating Dock (21st.dev)
  const dockCartelera = document.getElementById("dock-cartelera");
  const dockFavoritos = document.getElementById("dock-favoritos");
  const dockDice = document.getElementById("dock-dice");

  dockCartelera?.addEventListener("click", (e) => {
    e.preventDefault();
    tabCartelera.click();
    dockCartelera.classList.add("dock-active");
    dockFavoritos?.classList.remove("dock-active");
  });

  dockFavoritos?.addEventListener("click", (e) => {
    e.preventDefault();
    tabFavoritos.click();
    dockFavoritos.classList.add("dock-active");
    dockCartelera?.classList.remove("dock-active");
  });

  dockDice?.addEventListener("click", () => {
    btnSurprise.click();
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
    btnPerfilUsuario.classList.remove("active");
  } else {
    navItemAdmin.classList.add("d-none");
    seccionAdmin.classList.add("d-none");
    btnPerfilUsuario.classList.add("active");
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

  // Actualizar Floating Dock (21st.dev)
  const dockFavBadge = document.getElementById("dock-fav-count");
  if (dockFavBadge) {
    dockFavBadge.textContent = String(totalFavs);
  }
}

function resetearFiltros() {
  filterCategoria.value = "todas";
  filterBarrio.value = "todos";
  filterPrecio.value = "todos";
  if (filterBusqueda) {
    filterBusqueda.value = "";
  }
  btnClearSearch?.classList.add("d-none");

  // Resetear visualmente chips de categoría
  const categoryChips = categoryChipsBar?.querySelectorAll(".category-chip");
  categoryChips?.forEach((c) => {
    if (c.getAttribute("data-category") === "todas") {
      c.classList.add("active");
    } else {
      c.classList.remove("active");
    }
  });

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

  if (filterBusqueda && filterBusqueda.value.trim().length > 0) {
    criterio.busquedaTexto = filterBusqueda.value.trim();
  }

  return criterio;
}

function actualizarResumenFiltrosActivos(filtro: CriterioFiltro, cantidadResultados: number) {
  if (!activeFilterTags) return;
  activeFilterTags.innerHTML = "";

  const tokens: { label: string; onRemove?: () => void }[] = [];

  if (filtro.busquedaTexto) {
    tokens.push({
      label: `Texto: "${filtro.busquedaTexto}"`,
      onRemove: () => {
        filterBusqueda.value = "";
        btnClearSearch?.classList.add("d-none");
        aplicarFiltrosYRenderizar();
      },
    });
  }

  if (filtro.categoria && filtro.categoria !== "todas") {
    tokens.push({
      label: `Categoría: ${filtro.categoria}`,
      onRemove: () => {
        filterCategoria.value = "todas";
        const categoryChips = categoryChipsBar?.querySelectorAll(".category-chip");
        categoryChips?.forEach((c) => {
          c.classList.toggle("active", c.getAttribute("data-category") === "todas");
        });
        aplicarFiltrosYRenderizar();
      },
    });
  }

  if (filtro.barrio && filtro.barrio !== "todos") {
    tokens.push({
      label: `Barrio: ${filtro.barrio}`,
      onRemove: () => {
        filterBarrio.value = "todos";
        aplicarFiltrosYRenderizar();
      },
    });
  }

  if (filtro.soloGratis) {
    tokens.push({
      label: "Precio: Solo Gratuitos",
      onRemove: () => {
        filterPrecio.value = "todos";
        aplicarFiltrosYRenderizar();
      },
    });
  } else if (filtro.precioMax) {
    tokens.push({
      label: `Precio: Hasta $${filtro.precioMax}`,
      onRemove: () => {
        filterPrecio.value = "todos";
        aplicarFiltrosYRenderizar();
      },
    });
  }

  if (tokens.length === 0) {
    const span = document.createElement("span");
    span.className = "filter-pill-token";
    span.textContent = `Mostrando todos los eventos (${cantidadResultados})`;
    activeFilterTags.appendChild(span);
  } else {
    tokens.forEach((t) => {
      const pill = document.createElement("span");
      pill.className = "filter-pill-token";
      pill.innerHTML = `<span>${t.label}</span>`;
      if (t.onRemove) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-remove-token ms-1";
        btn.innerHTML = '<i class="bi bi-x"></i>';
        btn.addEventListener("click", t.onRemove);
        pill.appendChild(btn);
      }
      activeFilterTags.appendChild(pill);
    });

    // Contador de resultados filtrados
    const countPill = document.createElement("span");
    countPill.className = "filter-pill-token bg-dark text-white";
    countPill.textContent = `${cantidadResultados} encontrado(s)`;
    activeFilterTags.appendChild(countPill);
  }
}

function aplicarFiltrosYRenderizar() {
  const filtro = obtenerCriterioFiltro();
  let eventos = listaEventos.filtrar(filtro);

  if (mostrandoSoloFavoritos) {
    eventos = eventos.filter((ev) => usuarioActivo.tieneFavorito(ev.id));
  }

  renderizarCards(eventos);
  actualizarBadges();
  actualizarResumenFiltrosActivos(filtro, eventos.length);
}

function renderizarCards(eventos: Evento[]) {
  contenedorCards.innerHTML = "";

  if (eventos.length === 0) {
    if (mostrandoSoloFavoritos) {
      if (sinResultadosIcono) {
        sinResultadosIcono.className = "bi bi-heartbreak text-danger display-4";
      }
      if (sinResultadosTitulo) {
        sinResultadosTitulo.textContent = "No tenés ningún evento en favoritos";
      }
      if (sinResultadosDesc) {
        sinResultadosDesc.textContent =
          "Guardá los eventos que más te interesen presionando el corazón en cada tarjeta para revisarlos cuando quieras.";
      }
      if (btnClearEmpty) {
        btnClearEmpty.innerHTML = '<i class="bi bi-grid-fill me-1"></i> Explorar todos los eventos';
      }
    } else {
      if (sinResultadosIcono) {
        sinResultadosIcono.className = "bi bi-emoji-neutral text-muted display-4";
      }
      if (sinResultadosTitulo) {
        sinResultadosTitulo.textContent = "No encontramos eventos con esos filtros";
      }
      if (sinResultadosDesc) {
        sinResultadosDesc.textContent =
          "Probá ampliando el rango de precio o seleccionando otra categoría/barrio.";
      }
      if (btnClearEmpty) {
        btnClearEmpty.innerHTML = '<i class="bi bi-arrow-counterclockwise me-1"></i> Restablecer filtros';
      }
    }
    mensajeSinResultados.classList.remove("d-none");
    return;
  }
  mensajeSinResultados.classList.add("d-none");

  eventos.forEach((ev) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    const esFav = usuarioActivo.tieneFavorito(ev.id);
    const precioTexto = ev.esGratuito ? "Entrada Libre" : `$ ${ev.precio}`;

    let badgeClass = "badge-cat-musica";
    if (ev.categoria === "Teatro") {
      badgeClass = "badge-cat-teatro";
    } else if (ev.categoria === "Visuales") {
      badgeClass = "badge-cat-visuales";
    } else if (ev.categoria === "Cine") {
      badgeClass = "badge-cat-cine";
    } else if (ev.categoria === "Literatura") {
      badgeClass = "badge-cat-literatura";
    } else if (ev.categoria === "Comunidad") {
      badgeClass = "badge-cat-comunidad";
    }

    col.innerHTML = `
      <div class="card card-event h-100 shadow-sm border-0 position-relative" data-id="${ev.id}" role="button" tabindex="0">
        <div class="card-event-media position-relative">
          ${ev.imagenUrl
        ? `<img src="${ev.imagenUrl}" class="card-event-img" alt="${ev.titulo}" loading="lazy" />`
        : `<div class="card-event-img-fallback"><i class="bi bi-ticket-perforated"></i></div>`
      }
          <!-- Botón Favorito Flotante sobre la Imagen (Patrón Moderno) -->
          <button
            class="btn-floating-fav btn-toggle-fav ${esFav ? "active" : ""}"
            data-id="${ev.id}"
            title="${esFav ? "Quitar de favoritos" : "Guardar en favoritos"}"
            aria-label="${esFav ? "Quitar de favoritos" : "Guardar en favoritos"}"
          >
            <i class="bi ${esFav ? "bi-heart-fill text-danger" : "bi-heart"}"></i>
          </button>
        </div>

        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge ${badgeClass} badge-tag-category">
              ${ev.categoria}
            </span>
            <span class="badge ${ev.esGratuito ? "bg-success" : "bg-light text-dark border"} fw-semibold">
              ${precioTexto}
            </span>
          </div>

          <h3 class="card-title fw-bold text-dark fs-5 mb-2">${ev.titulo}</h3>
          <p class="card-text text-muted small flex-grow-1 mb-3">${ev.descripcion}</p>

          <div class="small text-secondary mb-3">
            <div class="mb-1"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${ev.lugar} (${ev.barrio})</div>
            <div><i class="bi bi-calendar-event me-1 text-primary"></i> ${ev.fecha} — ${ev.horario} hs</div>
          </div>

          <div class="d-flex gap-2 pt-2 border-top">
            <button class="btn btn-sm btn-outline-dark rounded-pill px-3 btn-abrir-mapa d-inline-flex align-items-center justify-content-center gap-1" data-id="${ev.id}">
              <i class="bi bi-pin-map-fill text-danger"></i>
              <span>Ubicación</span>
            </button>
            <button class="btn btn-sm btn-culturama-surprise flex-grow-1 rounded-pill btn-ver-detalle" data-id="${ev.id}">
              <i class="bi bi-info-circle me-1"></i> Más información
            </button>
            ${usuarioActivo.esAdmin
        ? `<button class="btn btn-sm btn-outline-secondary btn-eliminar-evento text-danger rounded-pill px-2" data-id="${ev.id}" title="Eliminar evento (Admin)">
                    <i class="bi bi-trash"></i>
                   </button>`
        : ""
      }
          </div>
        </div>
      </div>
    `;

    contenedorCards.appendChild(col);

    // Micro-interacción Spotlight 21st.dev y Clic en Card para ver más información
    const cardEl = col.querySelector(".card-event") as HTMLElement;
    if (cardEl) {
      cardEl.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardEl.style.setProperty("--mouse-x", `${x}px`);
        cardEl.style.setProperty("--mouse-y", `${y}px`);
      });

      // Al hacer clic en cualquier parte de la tarjeta (excepto en botones de acción), abrir más información
      cardEl.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("button") || target.closest("a")) {
          return;
        }
        mostrarModalDetalle(ev.id);
      });

      // Soporte de accesibilidad con teclado (Enter o Espacio)
      cardEl.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          const target = e.target as HTMLElement;
          if (target.closest("button") || target.closest("a")) {
            return;
          }
          e.preventDefault();
          mostrarModalDetalle(ev.id);
        }
      });
    }
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

  contenedorCards.querySelectorAll(".btn-abrir-mapa").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id")!;
      abrirModalMapaConAnimacionEpica(id);
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
    <div class="d-grid gap-2">
      <button class="btn btn-culturama-teal btn-sm text-dark fw-bold btn-abrir-mapa-modal" data-id="${ev.id}">
        <i class="bi bi-geo-alt-fill text-danger me-1"></i> Abrir mapa interactivo 3D
      </button>
      <a href="https://maps.google.com/?q=${encodeURIComponent(`${ev.lugar  } ${  ev.barrio  } Montevideo`)}" target="_blank" class="btn btn-outline-dark btn-sm">
        <i class="bi bi-box-arrow-up-right me-1"></i> Abrir en Google Maps externo
      </a>
    </div>
  `;

  // @ts-expect-error Bootstrap Modal global
  const modal = new window.bootstrap.Modal(document.getElementById("modalDetalleEvento"));
  modal.show();

  const btnMapaModal = modalBody.querySelector(".btn-abrir-mapa-modal");
  if (btnMapaModal) {
    btnMapaModal.addEventListener("click", () => {
      modal.hide();
      abrirModalMapaConAnimacionEpica(id);
    });
  }
}

// Coordenadas emblemáticas de Montevideo por barrio / lugar
const COORDENADAS_MONTEVIDEO: Record<string, { lat: number; lng: number }> = {
  "Ciudad Vieja": { lat: -34.9065, lng: -56.2053 },
  "Centro": { lat: -34.9056, lng: -56.1912 },
  "Parque Rodó": { lat: -34.9157, lng: -56.1663 },
  "Pocitos": { lat: -34.9189, lng: -56.1492 },
  "Cordón": { lat: -34.9031, lng: -56.1772 },
  "Prado": { lat: -34.8601, lng: -56.2045 },
  "Punta Carretas": { lat: -34.9256, lng: -56.1582 },
  "Palermo": { lat: -34.9112, lng: -56.1788 },
  "Barrio Sur": { lat: -34.9123, lng: -56.1932 },
  "default": { lat: -34.9011, lng: -56.1645 },
};

function abrirModalMapaConAnimacionEpica(id: string) {
  const ev = listaEventos.obtenerPorId(id);
  if (!ev) return;

  const modalEl = document.getElementById("modalMapaEvento")!;
  const subtituloEl = document.getElementById("modalMapaSubtitulo")!;
  const lugarEl = document.getElementById("modalMapaLugar")!;
  const barrioEl = document.getElementById("modalMapaBarrio")!;
  const gmapsLink = document.getElementById("modalMapaGmapsLink") as HTMLAnchorElement;
  const coordsEl = document.getElementById("hudCoords")!;
  const viewportEl = document.getElementById("mapViewport")!;
  const iframeEl = document.getElementById("googleMapsIframe") as HTMLIFrameElement;

  // Asignar datos del evento
  subtituloEl.textContent = `${ev.titulo} — ${ev.categoria}`;
  lugarEl.textContent = ev.lugar;
  barrioEl.innerHTML = `<i class="bi bi-pin-map me-1 text-danger"></i> ${ev.barrio}, Montevideo`;

  const queryDireccion = `${ev.lugar}, ${ev.barrio}, Montevideo, Uruguay`;
  gmapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryDireccion)}`;

  // Coordenadas destino
  const coords = COORDENADAS_MONTEVIDEO[ev.barrio] || COORDENADAS_MONTEVIDEO["default"];
  coordsEl.textContent = `${coords.lat.toFixed(4)}° S, ${coords.lng.toFixed(4)}° W`;

  // Cargar Google Maps oficial incrustado
  if (iframeEl) {
    iframeEl.src = `https://maps.google.com/maps?q=${encodeURIComponent(queryDireccion)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  // Resetear estados previos de animación
  viewportEl.classList.remove("map-viewport-revealed");

  // @ts-expect-error Bootstrap Modal global
  const modal = new window.bootstrap.Modal(modalEl);
  modal.show();

  // Revelar mapa con transición suave
  setTimeout(() => {
    viewportEl.classList.add("map-viewport-revealed");
  }, 120);
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

const CATEGORIAS_CONFIG: Record<
  string,
  { icono: string; color: string; desc: string; badge: string }
> = {
  Música: {
    icono: "bi-music-note-beamed",
    color: "#0284C7",
    desc: "Recitales, orquestas, jazz, acústicos y candombe montevideano.",
    badge: "Conciertos & Bandas",
  },
  Teatro: {
    icono: "bi-mask",
    color: "#E11D48",
    desc: "Obras clásicas, stand-up, ópera, títeres y drama en vivo.",
    badge: "Artes Escénicas",
  },
  Visuales: {
    icono: "bi-palette",
    color: "#0D9488",
    desc: "Galerías, museos, muestras fotográficas e instalaciones urbanas.",
    badge: "Muestras & Galerías",
  },
  Cine: {
    icono: "bi-film",
    color: "#D97706",
    desc: "Festivales, cinemateca, cine clásico y estrenos independientes.",
    badge: "Proyecciones & Ciclos",
  },
  Literatura: {
    icono: "bi-book",
    color: "#16A34A",
    desc: "Presentaciones, ferias de editoriales, charlas y poesía.",
    badge: "Letras & Lecturas",
  },
  Comunidad: {
    icono: "bi-people",
    color: "#7C3AED",
    desc: "Murgas de carnaval, talleres barriales, ferias y patrimonio.",
    badge: "Cultura Abierta",
  },
};

function renderizarChipsOnboarding() {
  const todasCategorias = ["Música", "Teatro", "Visuales", "Cine", "Literatura", "Comunidad"];
  onboardingChipsContainer.innerHTML = "";

  const countEl = document.getElementById("onboarding-selection-count");
  const actualizarContadorOnboarding = () => {
    if (countEl) {
      const cant = usuarioActivo.intereses.length;
      countEl.textContent = `${cant} seleccionada${cant === 1 ? "" : "s"}`;
    }
  };

  todasCategorias.forEach((cat) => {
    const config = CATEGORIAS_CONFIG[cat] || {
      icono: "bi-stars",
      color: "#1A1A1A",
      desc: "Eventos y actividades culturales.",
      badge: "Categoría",
    };

    const isSelected = usuarioActivo.intereses.includes(cat);

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6";

    col.innerHTML = `
      <div class="onboarding-card-bento ${isSelected ? "selected" : ""}" role="button" tabindex="0" data-cat="${cat}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div class="bento-icon-wrapper" style="--cat-color: ${config.color};">
            <i class="bi ${config.icono}"></i>
          </div>
          <div class="bento-check-circle">
            <i class="bi bi-check-lg"></i>
          </div>
        </div>
        <div class="bento-card-title">${cat}</div>
        <div class="bento-card-desc">${config.desc}</div>
        <div class="bento-card-badge mt-2">
          <span>${config.badge}</span>
        </div>
      </div>
    `;

    const bentoCard = col.querySelector(".onboarding-card-bento") as HTMLElement;

    const toggleSelection = () => {
      if (usuarioActivo.intereses.includes(cat)) {
        usuarioActivo.eliminarInteres(cat);
        bentoCard.classList.remove("selected");
      } else {
        usuarioActivo.agregarInteres(cat);
        bentoCard.classList.add("selected");
      }
      actualizarContadorOnboarding();
      actualizarBadges();
      actualizarMensajePuenteCultural();
      aplicarFiltrosYRenderizar();
    };

    bentoCard.addEventListener("click", toggleSelection);
    bentoCard.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleSelection();
      }
    });

    onboardingChipsContainer.appendChild(col);
  });

  actualizarContadorOnboarding();
}

function actualizarMensajePuenteCultural() {
  const intereses = usuarioActivo.intereses;
  const colAction = document.getElementById("puente-cultural-col-action");
  const puenteTitulo = document.getElementById("puente-cultural-titulo");
  const puenteBadgeSub = document.getElementById("puente-cultural-badge-sub");
  const cardPuente = document.querySelector(".card-puente-cultural") as HTMLElement;

  if (!puenteCulturalDescripcion || !colAction) return;

  if (intereses.length === 0) {
    if (cardPuente) {
      cardPuente.style.backgroundImage = "linear-gradient(135deg, #18181B 0%, #27272A 100%)";
    }
    if (puenteBadgeSub) puenteBadgeSub.textContent = "Personalización requerida";
    if (puenteTitulo) puenteTitulo.textContent = "Definí tus gustos culturales";
    puenteCulturalDescripcion.textContent =
      "No tenés ningún interés seleccionado. Hacé clic en el botón para elegir qué disciplinas disfrutás y descubrir recomendaciones exclusivas fuera de tu zona de confort.";

    colAction.innerHTML = `
      <button class="btn btn-light fw-bold px-4 py-2.5 text-dark shadow-sm rounded-pill d-inline-flex align-items-center gap-2"
        data-bs-toggle="modal" data-bs-target="#modalOnboarding">
        <i class="bi bi-sliders"></i>
        <span>Ajustar mis gustos</span>
      </button>
    `;
  } else {
    // Buscar eventos en disciplinas ajenas a los gustos declarados
    const eventosDisponibles = listaEventos.eventos;
    const eventosAjenos = eventosDisponibles.filter(
      (ev) => !intereses.includes(ev.categoria)
    );

    const eventoSugerido =
      eventosAjenos.length > 0
        ? eventosAjenos[0]
        : eventosDisponibles[0];

    // Colocar la imagen del evento con overlay oscuro estilo hero section
    if (cardPuente && eventoSugerido.imagenUrl) {
      cardPuente.style.backgroundImage = `linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.88)), url("${eventoSugerido.imagenUrl}")`;
    } else if (cardPuente) {
      cardPuente.style.backgroundImage = "linear-gradient(135deg, #18181B 0%, #27272A 100%)";
    }

    if (puenteBadgeSub) puenteBadgeSub.textContent = `Fuera de tu zona de confort (${eventoSugerido.categoria})`;
    if (puenteTitulo) puenteTitulo.textContent = `Descubrimiento guiado: ${eventoSugerido.titulo}`;

    puenteCulturalDescripcion.innerHTML = `
      Tus intereses son <strong>${intereses.join(", ")}</strong>. Para salir de tu rutina habitual, te sugerimos este plan en 
      <strong>${eventoSugerido.categoria}</strong> en <strong>${eventoSugerido.lugar} (${eventoSugerido.barrio})</strong>: 
      <em>"${eventoSugerido.descripcion}"</em>
    `;

    colAction.innerHTML = `
      <div class="d-flex justify-content-lg-end">
        <button class="btn btn-outline-light fw-semibold px-3 py-2 rounded-pill d-inline-flex align-items-center justify-content-center gap-1 shadow-sm"
          data-bs-toggle="modal" data-bs-target="#modalOnboarding" title="Cambiar tus preferencias">
          <i class="bi bi-sliders"></i>
          <span>Ajustar gustos</span>
        </button>
      </div>
    `;

    // Clic en toda la tarjeta de Puente Cultural para abrir la información del evento
    if (cardPuente) {
      cardPuente.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Si hace clic en el botón de onboarding, no disparar el modal de evento
        if (target.closest("button") || target.closest("a")) {
          return;
        }
        mostrarModalDetalle(eventoSugerido.id);
      };
    }
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
