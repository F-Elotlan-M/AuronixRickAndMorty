# AuronixRickAndMorty

Este proyecto es una API REST creada con Express.js que consume datos desde la [API de Rick and Morty](https://rickandmortyapi.com/), filtra los personajes vivos y expone endpoints que devuelven esta información en distintos formatos. El proyecto fue desarrollado como parte de una prueba técnica.

## Endpoints disponibles

### `GET /characters`
- Devuelve una lista de todos los personajes vivos, con los espacios en los nombres reemplazados por guiones bajos.

### `GET /characters/alive/paged?page={n}`
- Devuelve los personajes vivos paginados, con un límite de 20 resultados por página.
- Si `page` es inválido (no es un número o es negativo), devuelve un error 400.
- Si `page` excede el número total disponible, devuelve un error 404 con un mensaje descriptivo.

## Tecnologías utilizadas

- **Node.js** – Entorno de ejecución.
- **Express.js** – Framework web para crear la API.
- **Fetch**
- **Jest** – Framework de pruebas unitarias.
- **Supertest** – Librería para testear endpoints HTTP.
- **ESModules** – Uso de `import`/`export` en lugar de `require`.

## Pruebas

Las pruebas están escritas con **Jest** y **Supertest**, cubriendo:

- Validez de los endpoints.
- Manejo de errores (paginación inválida, rutas inexistentes).
- Verificación de formato de los datos (status = "Alive", nombres con guiones bajos, etc).

Ejecutar pruebas:

```bash
npm test
