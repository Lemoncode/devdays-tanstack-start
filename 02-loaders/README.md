# Loaders

En este ejemplo, hemos movido los datos a un servidor con una API REST. Y llamamos a las peticiones desde las rutas usando `loaders`:

- Lista de posts
- Y en el detalle de un post, para que se entienda como funcionan los loaders, he dejado un delay de 3 segundos en la llamada a la API.

Es decir, ahora, si navegamos al detalle por primera vez, tardará 3 segundos en mostrar el contenido porque al no tener ninguna información todavía guardada, hasta que no le responda la API, no navega.

A partir de aquí, utiliza el patrón SWR (Stale While Revalidate). Es decir, ya tenemos guardados los datos en caché, mientras tanto los enseño y por detrás estoy lanzando la petición a la API.

Con lo cual, tengo al usuario siempre viendo algo que no sea un spinner dando vueltas.

La caché por defecto está configurada para que se consideren los datos antiguos nada más consumirlos. Es decir, si miramos las `Router DevTools` vemos que el `staleTime` es 0 lo que significa que cada vez que navego a la ruta, siempre va a volver a lanzar la petición a la API mientras te muestra lo antiguo.

> `age` el tiempo que tienen los datos que se están mostrando.
>
> `gcTime` el garbage collector, el tiempo que se guardan los datos en caché y si no se utilizan, se eliminan.

Todos estos tiempos se pueden modificar en la configuración del router.

Por último, en los componentes donde necesitemos consumir los datos, simplemente tenemos que usar el `useLoaderData` de la ruta correspondiente y ya está.
