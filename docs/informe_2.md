# Informe Académico 2

# Proyecto: CULTURAMA

**Plataforma de Descubrimiento Cultural Centralizado y Recomendación Fuera de la Zona de Confort**

**Integrantes:** Nahuel Ximeno, Lautaro Moreno  
**Curso:** Fundamentos de Ingeniería de Software (FIS) — 2026 Semestre 2  
**Institución:** Universidad ORT Uruguay

---

## Descripción del Trabajo Individual

A continuación se detalla la dedicación horaria, las reuniones de coordinación y las actividades desarrolladas por cada integrante durante el ciclo de vida de esta segunda entrega (Diseño, Implementación y Métricas de Calidad).

### Registro Cronológico de Actividades

| Fecha          | Participantes                 | Actividades Realizadas                                                                                                                                                                                                                                                                                                                                                                           | Horas Invertidas |
| :------------- | :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------: |
| **20/10/2026** | Nahuel Ximeno, Lautaro Moreno | **Reunión 1 — Planificación, Alcance y Selección de Requerimientos:** Revisión del feedback y artefactos de la Entrega 1. Selección y priorización del subconjunto de requerimientos a implementar (RF-01, RF-02, RF-03, RF-04, RF-05, RF-08, RF-10, RF-11 y RNF-01, RNF-02, RNF-04, RNF-05, RNF-06). Definición del backlog para el sprint, distribución de tareas y diseño de arquitectura. |    3.0 h c/u     |
| **28/10/2026** | Nahuel Ximeno, Lautaro Moreno | **Reunión 2 — Implementación de Interfaz y Componentes:** Puesta en común y desarrollo de los componentes visuales: diseño y maquetado de la barra de navegación (Navbar), pie de página (Footer), portada de bienvenida (Hero Section), catálogo de tarjetas de eventos (Cards) y flujo de selección de intereses (Onboarding). Revisión de accesibilidad y diseño responsivo.           |    3.5 h c/u     |
| **04/11/2026** | Nahuel Ximeno, Lautaro Moreno | **Reunión 3 — Integración en Página Única y Capa de Dominio:** Migración de los componentes dispersos a un único documento HTML integrado (`index.html`), implementación formal en `src/domain/` de las clases `Usuario`, `Evento` e `EventoList` con soporte para roles (usuario común y administrador para creación y baja de eventos en memoria) e incorporación del dado 3D interactivo en la interfaz. |    3.0 h c/u     |

### Resumen por Integrante

| Integrante         | Horas Totales | Tareas Clave                                                                                                                                                                                                                                                                 |
| :----------------- | :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nahuel Ximeno**  |   **9.5 h**   | Planificación de alcance, unificación e integración en `index.html` de los componentes de UI (Navbar, Footer, Hero Section, Cards de eventos y Onboarding), incorporación de la identidad visual oficial (logo e isotipo), maquetación del modal del Dado 3D y accesibilidad. |
| **Lautaro Moreno** |   **9.5 h**   | Planificación de alcance, implementación de la lógica de dominio (`Usuario`, `Evento`, `EventoList` con control de permisos de administrador), vinculación de eventos e interactividad en `main.ts`, animación con inercia y física del Dado 3D y documentación formal.   |

---

## Selección de Funcionalidades

En esta segunda etapa del proyecto, el objetivo principal consistió en transformar los requerimientos y el diseño conceptual de la Entrega 1 en una solución de software funcional, modular, accesible y testeada. 

Para acotar el alcance de desarrollo sin perder la esencia de la plataforma, se seleccionó un conjunto crítico de funcionalidades de alta prioridad que componen el núcleo de valor (MVP) de **CULTURAMA**.

### Funcionalidades Priorizadas para esta Entrega

Tomando como referencia la especificación formal del [Informe Académico 1](informe_1.md#rf--rnf-requisitos-funcionales-y-no-funcionales), se priorizó e implementó el siguiente conjunto de requerimientos funcionales y no funcionales:

- **RF-01 — Exploración y Filtrado Multicriterio:** Motor de búsqueda interactivo que permite filtrar eventos culturales por fecha/temporalidad, rango de precios, barrios de Montevideo y categorías culturales.
- **RF-02 — Ficha Detallada del Evento:** Visualización completa de los atributos logísticos del evento (título, descripción, fecha/horario, ubicación física en Montevideo, costo, entidad organizadora y enlace directo a ticketeras/sitios oficiales).
- **RF-03 — Taxonomía Cultural Estructurada:** Organización del catálogo en las 6 categorías macro establecidas en la entrega anterior (Música, Artes Escénicas, Audiovisual, Artes Visuales, Patrimonio y Ciudad, Cultura y Comunidad) y subcategorías temáticas.
- **RF-04 — Recomendación por Afinidad Habitual:** Lógica que sugiere eventos afines a los gustos declarados o hábitos de interés del usuario para satisfacer su demanda inmediata.
- **RF-05 — Descubrimiento Guiado ("Fuera de la Zona de Confort"):** Algoritmo central diferenciador de CULTURAMA que vincula las preferencias habituales del usuario con eventos de categorías distintas a través de un **puente cultural explicativo** (ej. vinculando el interés por música clásica con una exposición visual de instrumentos históricos).
- **RF-08 — Marcado de Eventos Favoritos / Guardados:** Funcionalidad para que el usuario pueda marcar y desmarcar eventos como guardados, asociándolos a su perfil de usuario local.
- **RF-10 — Perfil y Gestión de Preferencias Culturales:** Implementación de la entidad Usuario a nivel de dominio y memoria local, permitiendo configurar intereses y alternar entre usuarios (usuario común y usuario administrador).
- **RF-11 — Gestión y Carga de Eventos (Modo Administrador):** Funcionalidad que habilita la creación y eliminación en memoria de eventos del catálogo exclusivamente cuando la sesión activa corresponde a un usuario con rol administrador.

Asimismo, se garantizó el cumplimiento de los siguientes **Requerimientos No Funcionales**:
- **RNF-01 (Usabilidad y Claridad Visual):** Interfaz intuitiva y limpia, estructurada bajo heurísticas de usabilidad para encontrar un plan cultural con el mínimo esfuerzo cognitivo.
- **RNF-02 (Rendimiento y Tiempo de Carga):** Carga y filtrado ágil en memoria sin demoras perceptibles, optimizando tiempos de respuesta.
- **RNF-04 (Diseño Responsivo Cross-Device):** Interfaz fluida adaptable tanto a pantallas de escritorio como a dispositivos móviles.
- **RNF-05 (Arquitectura Limpia y Modularidad):** Desacoplamiento estricto entre las clases del modelo de dominio (`domain`) y los componentes visuales (`interface`), permitiendo una alta cobertura de pruebas automatizadas sobre el núcleo de negocio.
- **RNF-06 (Seguridad y Validación de Entradas):** Validación estricta en el ingreso y procesamiento de datos para garantizar la integridad del sistema.

### Justificación de la Selección

La selección de este subconjunto responde a tres pilares fundamentales extraídos de la Entrega 1:

1. **Alineación con los Objetivos Generales del Proyecto:**
   El propósito fundamental de CULTURAMA es doble: por un lado, centralizar la dispersa oferta cultural montevideana; por otro, incentivar a los ciudadanos a romper su burbuja de consumo habitual. La implementación combinada de **RF-01, RF-02 y RF-03** cubre la centralización y facilidad de búsqueda, mientras que **RF-04 y RF-05** ejecutan la promesa troncal de recomendación y descubrimiento guiado mediante puentes culturales.

2. **Resolución de Necesidades Detectadas en la Investigación con Usuarios:**
   En las entrevistas realizadas en la Entrega 1 (Sofía de 20 años, Martín de 30 años y Carolina de 40 años), se detectaron dolores contundentes:
   - **Dispersión y desinformación:** Los usuarios señalaron que la información cultural está atomizada y que faltan datos prácticos clave (precio, lugar exacto, hora). **RF-01** y **RF-02** resuelven esto al ofrecer un catálogo unificado con fichas completas.
   - **Monotonía y resistencia a lo desconocido:** Los tres entrevistados reconocieron caer siempre en los mismos planes. Manifestaron expresamente que estarían dispuestos a probar cosas nuevas *siempre y cuando la plataforma les explicara por qué se las recomienda*. **RF-05** responde de forma directa a este hallazgo mediante su etiqueta explicativa.
   - **Optimización del tiempo:** La falta de tiempo libre para coordinar salidas hace imprescindible poder guardar eventos de interés en el momento para revisarlos luego sin tener que buscarlos otra vez (**RF-08**).

3. **Trazabilidad con los RF y RNF Previamente Definidos:**
   Los requerimientos seleccionados pertenecen a las categorías **Must Have** y **Should Have** más determinantes para la interacción del usuario. Además, se cuidó especialmente la arquitectura desacoplada (**RNF-05**), condición técnica sine qua non para asegurar pruebas unitarias exhaustivas en esta etapa de desarrollo.

### Mapa / Lista Priorizada de Funcionalidades

| Prioridad | ID Requisito | Funcionalidad | Categoría MoSCoW | Estado en Entrega 2 |
| :---: | :---: | :--- | :---: | :---: |
| **1** | **RF-01** | Exploración y Filtrado Multicriterio de Eventos | Must Have | **Implementada y Verificada** |
| **2** | **RF-02** | Ficha Detallada de Evento con Datos Logísticos | Must Have | **Implementada y Verificada** |
| **3** | **RF-03** | Taxonomía y Categorización Cultural Estructurada | Must Have | **Implementada y Verificada** |
| **4** | **RF-05** | Descubrimiento Guiado Fuera de Zona de Confort con Puente Cultural | Must Have | **Implementada y Verificada** |
| **5** | **RF-04** | Recomendación de Eventos por Afinidad Habitual | Must Have | **Implementada y Verificada** |
| **6** | **RF-08** | Marcado y Gestión de Eventos Favoritos (Guardados) | Should Have | **Implementada y Verificada** |
| **7** | **RF-10** | Perfil y Gestión de Preferencias (Usuarios Locales) | Should Have | **Implementada y Verificada** |
| **8** | **RF-11** | Gestión y Panel de Carga/Baja de Eventos (Admin Local) | Must Have | **Implementada y Verificada** |
| **9** | **RF-06** | Sistema de Desafíos y Retos Culturales Periódicos | Should Have | Postergada (requiere persistencia) |
| **10** | **RF-07** | Billetera de Puntos y Canje de Beneficios/Cupones | Should Have | Postergada (no requerida al inicio) |
| **11** | **RF-09** | Reseñas y Valoraciones Comunitarias de Eventos | Could Have | Fuera de alcance actual |
| **12** | **RF-12** | Notificaciones Push de Recordatorios (24h antes) | Won't Have | Descartada en esta etapa |

### Funcionalidades que Quedaron Fuera de esta Entrega y Justificación

Las siguientes funcionalidades no se incluyeron en esta entrega por razones de alcance, complejidad y restricciones técnicas:

- **RF-07 (Billetera de Puntos y Canje de Beneficios):** No estará implementada ya que no es algo indispensable en la etapa inicial del producto y aumentaría innecesariamente la complejidad del proyecto (requiriendo pasarelas, convenios de canje y gestión financiera de saldos).
- **RF-06 (Sistema de Desafíos Culturales):** Queda postergado al depender directamente de la gamificación y de la acumulación de retos entre sesiones.
- **RF-09 (Reseñas y Calificaciones Comunitarias):** Al no contar con una base de datos ni persistencia externa compartida entre diferentes clientes, no es posible almacenar comentarios u opiniones para consulta colectiva.
- **RF-12 (Notificaciones de Eventos Próximos):** Sin un servicio de backend persistente que ejecute tareas en segundo plano o guarde suscripciones permanentes, no es viable programar recordatorios automáticos.

---

## Usabilidad y Accesibilidad

- Describir cómo se diseñó la **interfaz de usuario (UI)** y la **experiencia de usuario (UX)**.
- Mostrar capturas de pantallas del resultado final.
- Mencionar, justificar y evidenciar cómo se aplicaron principios de **usabilidad** (ej: Heurísticas de Nielsen). 
- Indicar cómo se contemplaron **criterios de accesibilidad** (ej: WCAG). Incluir capturas de WAVE.

---

## Calidad de código

- Describir estándares de calidad seguidos (ej. guía de estilos, estándares definidos a nivel grupal, buenas prácticas de codificación seguidas).
- Explicar cómo se estructuró el código (Interfaz independiente de lógica de negocio).
- Indicar herramientas utilizadas para **análisis estático**, **formateo** o **linting**. Justificar, en caso de ser necesario, configuraciones o reglas establecidas para dichas herramientas.

---

## Pruebas Unitarias

- Describir el **alcance de las pruebas unitarias** implementadas.
- Indicar las librerías usadas (ej: Jest).
- Presentar captura la **ejecución y cobertura de pruebas** (% general y en clases críticas, idealmente 100% en clases de dominio. Si no se llega al 100%, justificar).
- Asegurarse de incluir **casos de borde y errores**.

---

## Reflexión

- Analizar cómo funcionó el equipo en esta etapa:

  - Organización y comunicación.
  - Cómo resolvieron problemas surgidos durante la implementación.
  - Desafíos técnicos y de coordinación.
  - Aprendizajes respecto a la entrega anterior.

- Ser críticos y específicos, no sólo describir.
- Señalar qué mejorarían para próximas etapas del proyecto.

---
