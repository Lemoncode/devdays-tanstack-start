# Tanstack Start

Ahora le toca el turno a [`Tanstack Start`](https://tanstack.com/start/latest), que es el framework para transformar nuestra aplicación en una de `Server Side Rendering` (ojo que por ahora esta en `beta` y para React y para Solid).

## Instalación

Las librerías que ahora necesitamos, a parte de la del router que ya tenemos instalada, son:

```bash
npm install @tanstack/react-start
npm install -D vinxi

```

> Vinxi es un SDK para crear tu propio framework como `Tanstack Start`, `Next.js`, etc. con tus propias reglas y está basado en `Vite`, `Nitro` y `Rollup`.
>
> Pero comentan que Vinxi la eliminarán en la versión 1 y lo sustituirán por un `plugin` de `Vite` o directamente con el `CLI`.

¿Qué dependencias no necesitamos ahora?

```bash
npm uninstall vite @vitejs/plugin-react @tanstack/router-plugin
```

> No necesitamos estas porque ya están incluidas en `Tanstack Start`.

## Configuración

Es decir, ahora necesitamos hacer unos pequeños ajustes para que nuestra aplicación funcione con `SSR`.

_./frontend/package.json_

- En los `scripts` de npm, tenemos que utilizar `vinxi` en vez de `vite`

```diff
...
  "scripts": {
-   "start": "vite --port 8080"
+   "start": "vinxi dev --port 8080"
  },
```

Renombramos el fichero `vite.config.ts` a `app.config.ts`.

- Ahora `defineConfig` lo importamos de `@tanstack/react-start/config`.
- Los plugins de `react` y el `router` ya no los necesitamos, porque ya están incluidos, y el router se puede configurar en la propiedad `tsr` (TanStack Router).
- Eso si, le añadimos la propiedad `appDirectory` a `src` para que sepa donde está nuestra aplicación (por defecto es `app`).
- Y la configuración restante, en la propia de `vite`.

_./frontend/vite.config.ts_

```diff
- import { defineConfig } from "vite";
+ import { defineConfig } from "@tanstack/react-start/config";
- import react from "@vitejs/plugin-react";
- import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
...

export default defineConfig({
- plugins: [
-   TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
-   tailwindcss(),
-   react(),
- ],
+ tsr: {
+   target: "react",
+   autoCodeSplitting: true,
+   appDirectory: "src",
+ },
+ vite: {
+   plugins: [tailwindcss()],
+ },
});
```

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

Eso significa, que ahora vamos a tener 2 puntos de entrada: uno para el cliente y otro para el servidor.

El de servidor `ssr.tsx`:

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

Para la parte de cliente:

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

Es decir, ahora nos sobran 2 ficheros: el `index.html` y el `index.tsx`. Tenemos que ir migrando el contenido.

Ahora, el fichero principal de la aplicación tanto para el cliente como para el servidor es el `routes/__root.tsx`:

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
  beforeLoad: async ({ context }) => {
 ...
});

function RootComponent() {
  return (
-   <>
+   <html lang="en">
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

> Ya podemos borrar el `index.html`

Vamos ahora con el `index.tsx`:

- Nos llevamos los imports de los estilos, pero lo importamos como una URL para poder inyectarlos en el `head` del html como un `link` para que funcionen en modo servidor.
- El `RouterProvider` es algo que ya está incluido en los puntos de entrada de servidor y cliente.
- Pero si nos vamos a llevar la configuración de `react-query`. Si se necesita en un nivel superior, se puede usar [las propiedas `Wrap` o `InnerWrap` del router](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#wrap-property)
- Ya podemos borar el `index.tsx`.

_./frontend/src/routes/\_\_root.tsx_

```diff
+ import appStyles from "../index.css?url";
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

Ahora, sea cual sea la ruta que solicitemos inicialmente, se renderizará en servidor. Y las navegaciones posteriores se harán en cliente, con esto tenemos lo mejor de ambos mundos, conseguimos una carga inicial rápida y mantenemos la interactividad de una SPA (con su memoria en cliente, etc).

> Podemos poner breakpoint en el VSCode y en el navegador.
