# Tanstack Start

Si arrancamos el proyecto, vemos que utiliza `vinxi` (aunque en la versión release lo van a sustituir por un `plugin` de `vite`)

Si abrimos las DevTools del navegador y cargamos la primera página, vemos que directamente viene un `html` con el contenido de ésta.

Si hacemos `login` y navegamos vemos que ahora hace la descarga con las rutas `lazy` como si fuese una SPA normal.

Pero si recargamos la página, vemos que vuelve a hacer la descarga del `html` completo aunque no sea la del `login`.

Así cumplimos con el SEO y mantenemos lo bueno de una SPA.

> Podemos poner breakpoint en el VSCode y en el navegador.

## Configuración

Para configurar todo esto, necesitamos hacer unos pequeños ajustes:

### package.json

- Instalamos `@tanstack/react-start` y `vinxi`, ya tienen integrados `vite` y el `plugin` del router.

_./frontend/package.json_

- En los `scripts` de npm, tenemos que utilizar `vinxi` en vez de `vite`

```diff
...
  "scripts": {
-   "start": "vite --port 8080"
+   "start": "vinxi dev --port 8080"
  },
```

### app.config.ts

Renombramos el fichero `vite.config.ts` a `app.config.ts` y como veis la configuración es muy parecida, y sigue soportando la configuración de `vite`.

### router config

Con respecto a la instancia del router, la tenemos que exponer en forma de función porque se va a utilizar en servidor y en cliente:

_./frontend/src/common/router.ts_

```diff
- import { createRouter } from "@tanstack/react-router";
+ import * as router from "@tanstack/react-router";
...


- export const router = createRouter({
+ export const createRouter = () => router.createRouter({
  routeTree,
  ...
});

declare module "@tanstack/react-router" {
  interface Register {
-   router: typeof router;
+   router: typeof createRouter;
  }
}
```

### ssr.tsx

Eso significa, que ahora vamos a tener 2 puntos de entrada:

Uno para el servidor `ssr.tsx`:

- Importamos la funcion de `createRouter` y se la pasamos al `createStartHandler` que será el encargado de manejar las peticiones según la ruta que se solicite.
- También importamos la función `getRouterManifest` que se encargará de gestionar los recursos y `preloads` de la aplicación.
- Por último, utiliza el `defaultStreamHandler` que es el encargado de renderizar la aplicación en modo `stream`. Es decir, la parte crítica de la página se envía al cliente en una primera tanda (incluyendo datos para la rehidratación en cliente) y el resto de la página se envía en sucesivas partes, conforme se vaya renderizando en servidor se va enviando.
- Si tu quieres, te puedes implementar tu propio `render`.

_./frontend/src/ssr.tsx_

```tsx
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import { createRouter } from "#common/router";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
```

### client.tsx

Y otro para el cliente (`client.tsx`):

- Al igual que antes, importamos la función `createRouter`.
- Creamos la instancia, y se la pasamos al componente `StartClient` que es el encargado de manejar las peticiones en cliente.
- Y con el método `hydrateRoot` de `react-dom/client` le decimos que renderice la aplicación en el `DOM`.

_./frontend/src/client.tsx_

```tsx
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { createRouter } from "#common/router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
```

### Migración del index.html

Ahora nos sobran 2 ficheros: el `index.html` y el `index.tsx`. Para mover el código a un sitio común podríamos optar por el fichero principal del router `__root.tsx`:

- Utilizar propiedad `head` del router para cambiar título y metadatos.
- Añadimos la estructura básica de un `html` en el render.


_./frontend/src/routes/\_\_root.tsx_

```diff
import {
  Outlet,
  createRootRouteWithContext,
+ HeadContent,
+ Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "#common/router";

export const Route = createRootRouteWithContext<RouterContext>()({
+ head: () => ({
+   meta: [
+     {
+       charSet: "utf-8",
+     },
+     {
+       name: "viewport",
+       content: "width=device-width, initial-scale=1",
+     },
+     { title: "Using TanStack Start" },
+   ],
+ }),
 ...
});

function RootComponent() {
  return (
-   <>
+   <html lang="en" data-theme="corporate">
+     <head>
+       <HeadContent />
+     </head>
+     <body>
        <Outlet />
        <TanStackRouterDevtools />
+       <Scripts />
+     </body>
+   </html>
-   </>
  );
}

```

### Migración del index.tsx

Y para el `index.tsx`:

- Podemos importar los estilos, pero como un `link` de HTML para que funcionen en modo servidor.
- Nos llevamos los proveedor necesarios (menos el del router que ya lo tiene incluido internamente),
- Y ya estaría todo listo.

_./frontend/src/routes/\_\_root.tsx_

```diff
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
+ import { QueryClientProvider } from "@tanstack/react-query";
+ import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "#common/router";
+ import { queryClient } from "#common/query";

...

  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Using TanStack Start" },
    ],
+   links: [
+     {
+       type: "text/css",
+       rel: "stylesheet",
+       href: appStyles,
+     },
+   ],
  }),
...

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
+       <QueryClientProvider client={queryClient}>
          <Outlet />
+         <ReactQueryDevtools />
+       </QueryClientProvider>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}

```

> Nota: [CSS Modules FOUC (flash of unstyled content) se resolverá en la versión 1](https://github.com/TanStack/router/issues/3023#issuecomment-2689163745)

### Otros cambios

Eso si, si tienes código como por ejemplo lo que yo he añadido del [localStorage](./frontend/src/common/storage.ts) tendrás que comprobar si se ejecuta en cliente o servidor. 

### Conclusión

A partir de aquí ya tenemos una aplicación con `SSR` y te puedes aprovechar las nuevas características que te da de `Server Functions`, `API Routes`, etc.
