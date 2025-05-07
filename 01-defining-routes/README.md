# Definiendo rutas

## React Router

Por un lado, tenemos React Router, que se convirtió en el estándar de facto para manejar rutas en aplicaciones React.

La forma de usarlo es muy simple:

- Definimos un componente `Router` que contendrá todas nuestras rutas (podemos verlo en el fichero [./using-react-router/src/router/router.component.tsx](./using-react-router/src/common/router/router.component.tsx)).
- Podemos tener un `Layout` que envuelva a todas nuestras, en este caso, porque el componente `Navbar` necesitamos que tenga acceso al router para navegar.
- Y definimos cada una de nuestras rutas. En este caso tenemos `home`, `lista de post` y el `detalle de un post`.

Al ser tan simple, vas como una moto, pero nos hemos dado cuenta en proyectos reales que tienes que estar tirando de un [fichero de constantes para definir las rutas](./using-react-router/src/common/router/routes.ts).

Veamos por ejemplo, en el [Navbar component](./using-react-router/src/components/navbar.component.tsx) como tenemos que estar utilizando las rutas porque no tenemos `intellisense` en el component `Link`.

La de horas que hemos perdido cuando no teniamos este fichero de constantes y teniamos que estar cambiando las rutas buscando en la lupa del `VsCode` y ahora que ya las tenemos, podemos incluso usarlas en una navegación programática con el `useNavigate`, por ejemplo, en el [`PostList component`](./using-react-router/src/components/post-list.component.tsx) para navegar al detalle de un post.

Pero claro, luego hay detalles donde a veces se queda un poco cojo, como el caso del [detalle de un post](./using-react-router/src/components/post.component.tsx). Tenemos el `useParams` que sirve para recuperar los parámetros de la URL (el id del post), nos permite tiparlo, pero es otra cosa más que tenemos que estar manteniendo, creando ficheros para el tipado de cada ruta que necesita parámetros y que cuadren estos tipos, con lo que hemos definido en [las constantes](./using-react-router/src/common/router/routes.ts) y en el [router component](./using-react-router/src/common/router/router.component.tsx), que además, en las últimas versiones de React Router no es necesario definir las rutas con todas las barras (todavía me acuerdo de cuando teniamos que poner `exact` en todos sitios para que no coincidiera varias rutas). Por lo tanto, si nos ponemos finos, aquí necesitariamos también otro fichero de constantes.

## TanStack Router

Después de trabajar mucho tiempo con esto, te planteas si no hay otra forma mejor y es cuando descubrí [TanStack Router](https://tanstack.com/router/v1/docs/framework/react/overview).

El resultado de la aplicación es el mismo, pero la forma de trabajar es muy diferente.

Seguimos teniendo una [configuración del router](./using-tanstack-router/src/common/router.ts) donde por defecto está usando el `browser history` pero se puede cambiar a `hash` o `memory` history al igual que en React Router. Lo usamos en [el fichero principal](./using-tanstack-router/src/index.tsx) en el `RouterProvider`.

Pero, para definir las rutas, si usamos la forma recomendada de hacerlo, vamos a definir una carpeta `routes` donde vamos a definir cada una de las rutas mediante ficheros (al más puro estilo Next.js o cualquier otro metaframework).

Pero fijaros que en cuanto añadimos el punto de entrada `__root.tsx`, automáticamente nos añade un código de ejemplo para poder empezar a trabajar.

Por ejemplo, añadimos aquí el `layout` de la aplicación:

- El componente `Outlet` mostrará el contenido de las rutas que se vayan mostrando.

_./src/routes/\_\_root.tsx_

```diff
- import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router';
+ import { Navbar, Footer } from "#components";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
-   <React.Fragment>
-     <div>Hello "__root"!</div>
+   <div className="grid grid-rows-[auto_1fr_auto] h-screen">
+     <Navbar />
+     <main className="h-full overflow-y-auto">
        <Outlet />
+     </main>
+     <Footer />
+   </div>
-   </React.Fragment>
  )
}

```

Y exactamente lo mismo para las rutas:

_./src/routes/index.tsx_

```diff
import { createFileRoute } from '@tanstack/react-router'
+ import { Home } from "#components";

export const Route = createFileRoute('/')({
- component: RouteComponent,
+ component: Home,
})

- function RouteComponent() {
-   return <div>Hello "/"!</div>
- }
```

Para las demás rutas, se pueden definir de varias maneras, pero la más simple podría ser creando una nueva carpeta para rutas anidadas, como por ejemplo `posts` y dentro la ruta principal `index.tsx`:

_./src/routes/posts/index.tsx_

```diff
import { createFileRoute } from '@tanstack/react-router'
+ import { PostList } from "#components";

export const Route = createFileRoute('/posts/')({
- component: RouteComponent,
+ component: PostList,
})

- function RouteComponent() {
-   return <div>Hello "/posts/"!</div>
- }
```

y el detalle del post con `$postId.tsx`:

_./src/routes/posts/$postId.tsx_

```diff
import { createFileRoute } from '@tanstack/react-router'
+ import { Post } from "#components";

export const Route = createFileRoute('/posts/$postId')({
- component: RouteComponent,
+ component: Post,
})

- function RouteComponent() {
-   return <div>Hello "/posts/$postId"!</div>
- }
```

Ahora si yo me voy al [Navbar](./using-tanstack-router/src/components/navbar.component.tsx) y quiero utilizar las rutas en el component `Link`:

- Tengo `intellisense` en la propiedad `to` de las rutas que hemos definido.
- ¿Oye y qué pasa si tiene parámetros? Nos pide como requerido la propiedad `params` y encima sabe el nombre de todos los parámetros que necesitamos (de tipos `string` porque va en la URL).

_./src/components/navbar.component.tsx_

```diff
import type React from "react";
+ import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <nav className="navbar bg-accent text-accent-content shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Menu>
          <li>
-           <a className="text-lg">
+           <Link to="/" className="text-lg">
              Home
-           </a>
          </li>
          <li>
-           <a className="text-lg">
+           <Link to="/posts" className="text-lg">
              Post list
-           </a>
+           </Link>
          </li>
          <li>
-           <a
+           <Link
+             to="/posts/$postId"
+             params={{ postId: "1" }}
              className="text-lg"
            >
              First post
-           </a>
+           </Link>
          </li>
        </Menu>
        ...
```

¿Dónde esta el truco? Esto es porque tenemos instalado el plugin de [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/quick-start#configure-the-vite-plugin) que se encarga de crear y mantener el fichero `routeTree.gen.ts` donde va apuntando todas las rutas que vamos añadiendo, cambiando o eliminando. Y éste lo usamos en la instancia del [router](./using-tanstack-router/src/common/router.ts) para que todo este tipado.

Este fichero como se genera automáticamente, a veces puede que se quede mal formateado, pero puedes añadir una [configuración del VsCode](../.vscode/settings.json) para que esto casi no ocurra e incluso hacerlo de solo lectura y que nadie pueda tocarlo.

Esto ya es otra cosa!

Ahora si necesitamos usar el `useNavigate` en el [PostList](./using-tanstack-router/src/components/post-list.component.tsx):

- Lo importamos como antes, pero seguimos teniendo el `intellisense` como el component `Link`.

_./src/components/post-list.component.tsx_

```diff
+ import { useNavigate } from "@tanstack/react-router";
import type * as model from "#common/model.ts";
import { posts } from "#common/mock-data.ts";

export const PostList = () => {
+ const navigate = useNavigate();
  return (
    <div className="hero bg-base-200 h-full">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">Post list</li>

        {posts.map((post, index) => (
          <Row
            key={post.id}
            post={post}
            index={index}
-           onNavigate={() => {}}
+           onNavigate={() =>
+             navigate({
+               to: "/posts/$postId",
+               params: { postId: post.id.toString() },
+             })
+           }
          />
        ))}
      </ul>
    </div>
  );
};
...
```

Incluso, para el `useParams` del [Post](./using-tanstack-router/src/components/post.component.tsx):

- Le indicamos de donde queremos sacar los parámetros y ahí lo tenemos.

_./src/components/post.component.tsx_

```diff
+ import { useParams } from "@tanstack/react-router";
import { posts } from "#common/mock-data";

export const Post = () => {
+ const { postId } = useParams({ from: "/posts/$postId" });
- const post = posts.find((post) => post.id === Number(""));
+ const post = posts.find((post) => post.id === Number(postId));

  return (
...
```
