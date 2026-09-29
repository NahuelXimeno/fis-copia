# Proyecto 2026 Semestre 2

## IMPORTANTE ⚠️

La documentación del proyecto se encuentra en la carpeta `docs`. Dicha documentación debe ser entregada en formato PDF por el sistema de gestión.  
El primer informe (`informe_1`) para la primer entrega, y el segundo informe (`informe_2`) para la segunda entrega.

## Recordar

La letra del proyecto, el enunciado problema y la rúbrica (criterios de evaluación del proyecto) se encuentra en el sitio de Aulas.

## Estructura del proyecto

- `docs`: Documentación del proyecto
- `src`: Código fuente de la aplicación
  - `domain`: Lógica de negocio (y sus tests)
  - `interface`: Interfaz de usuario
- `package.json`: Archivo de configuración de npm
- `eslint.config.js`: Archivo de configuración de ESLint

## Desarrollo

Instalar paquetes + iniciar servidor http de desarrollo:

```
npm install
npm run dev
```

Scripts calidad de código:

```
npm run format
npm run lint
npm run test
```

Scripts producción:

```
npm run build
npm run preview
```
