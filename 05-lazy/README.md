# Lazy

En este ejemplo, si abrimos las DevTools del navegador y cargamos la página principal, veremos que solamente cargan los componentes del layout común:

- `navbar.component`
- `footer.component`

Y la página principal:

- `home.component`

Y si cargamos la página de posts, se descarga solamente los ficheros necesarios y hace la llamada a la API para los datos.

Lo mismo ocurre con el detalle del post.

Si volvemos a navegar a las mismas rutas, como ya tiene esos ficheros descargados, no se los vuelve a bajar, solamente hace la petición a la API si es necesario.

Para tener este comportamiento, simplemente hemos activado el `autoCodeSplitting` en el fichero `vite.config.ts`.
