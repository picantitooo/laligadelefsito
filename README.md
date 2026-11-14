# L4D2 Survivor Leaderboard

Leaderboard estático hecho con Astro y listo para GitHub Pages.

## Empezar en local

```bash
npm install
npm run dev
```

Abre la URL local que muestra Astro (normalmente http://localhost:4321).

## Actualizar resultados

Edita `src/data/players.ts`. Cambia `wins` y `losses` para cada jugador:

```ts
{ name: "Piero", wins: 8, losses: 3, initials: "PI", color: "#e85d4a" }
```

El ranking se ordena automáticamente por winrate, luego por victorias. El winrate se calcula como:

`wins / (wins + losses) * 100`

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `l4d2-leaderboard`.
2. Sube todos los archivos de esta carpeta a la rama `main`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Cada push a `main` desplegará la página automáticamente.

Astro detecta el nombre del repositorio desde `GITHUB_REPOSITORY` y configura la ruta base para GitHub Pages. Si el repositorio se llama `usuario.github.io`, también funciona como sitio raíz.

## Fotos de perfil

Por ahora los círculos muestran iniciales como placeholder. Para poner fotos más adelante, añade las imágenes a `public/avatars/` y cambia el componente del avatar en `src/pages/index.astro`.
