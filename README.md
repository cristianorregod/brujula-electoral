# Brújula Electoral

Este repositorio contiene el sitio estático actual y un esqueleto de Next.js para convertirlo en una aplicación con registro de usuarios y análisis.

## Qué contiene

- `index.html` y `public/`: la UI actual sin cambiar.
- `lib/candidates.ts`: definición centralizada de ejes y candidatos.
- `lib/db.ts`: conexión a Turso mediante `@libsql/client`.
- `app/api/submit/route.ts`: API para registrar resultados.
- `app/api/stats/route.ts`: API para obtener métricas básicas.
- `app/api/validate/route.ts`: API para validar la estructura de ejes y candidatos.
- `db/schema.sql`: esquema de Turso para sesiones y votos.
- `app/page.tsx`: redirige la ruta raíz a `public/index.html` para preservar la UI actual mientras el proyecto corre como app Next.js.

## Estructura sugerida

1. Mantener la UI actual intacta en `public/index.html`.
2. Mover los datos de `EJES`, `EJES_INFO` y `CANDIDATOS` a `lib/candidates.ts`.
3. Usar la misma definición de candidatos en el frontend y backend para evitar desalineos.
4. Añadir `POST /api/submit` para registrar la sesión y el candidato seleccionado.
5. Añadir `GET /api/stats` para ver usuarios y conteos por candidato.
6. Añadir `GET /api/validate` para comprobar que cada candidato tenga ejes válidos.
7. La UI actual envía automáticamente la sesión y el candidato ganador a `POST /api/submit` cuando se muestra el resultado.

## Variables de entorno

- `LIBSQL_DATABASE_URL`
- `LIBSQL_API_KEY`

## Cómo usarlo

1. Instala dependencias:

```bash
npm install
```

2. Arranca en modo desarrollo:

```bash
npm run dev
```

3. Crea las tablas en Turso usando `db/schema.sql`.

4. Si necesitas migrar la UI al App Router de Next.js, el primer paso será copiar el `index.html` al nuevo `app/page.tsx` o servirlo como contenido estático.
