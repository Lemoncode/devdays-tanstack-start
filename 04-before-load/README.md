# Before load

En este ejemplo, hemos añadido una página de login, para hacer privada una parte de la aplicación.

- Me logo con cualquier usuario y contraseña, y me da el nombre del usuario logado.

- Y si no estoy logado, he intento ir a la página de posts, me añade un query string a la URL con la página deseada.

- Una vez logado, me redirige a ella.

Para implementarlo, la parte de autenticación la tenemos en la API Rest, pero en [common/auth.ts](./frontend/src/common/auth.ts) tenemos esta información para poder utilizarla en la aplicación:

- Si esta autenticado, el nombre del usuario y los métodos login, logout. Opcionalmente, lo he añadido al local storage para que me lo guarde al recargar la página a modo de demo.

Esta información, la incluimos en el contexto del router [common/router.ts](./frontend/src/common/router.ts) para que todas las rutas lo tengan disponible.

- Todas las rutas que teniamos antes, las hemos agrupado en una carpeta `_private` (lo que pongamos con `_` no lo va a incluir en la URL).
- Y en el fichero `route.tsx` vemos que si no esta autenticado, lo redirigimos a la página de login y pillamos el valor de la ruta que quiere ir.
- Además, aprovechamos este fichero, para tener un layout común para las rutas hijas.

- Por otro lado, en la página de login, definimos el query param `redirect`, por lo que vamos a tener intesillense de este párametro cuando naveguemos a esta ruta.
- Si está autenticado, lo redirigimos a donde diga el parámetro.
- Y sino, mostramos el formulario de login.
- Una vez rellenado, en el submit llamamos la login y navegamos.
