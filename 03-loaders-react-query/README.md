# Loaders con React Query

Como la caché de React Router es muy básica, porque por ejemplo no tiene nada implementado para mutaciones ni `updates optimistas` se puede combinar con React Query u otra librería similar.

Los cambios son mínimos:

1. En el router añadimos la instancia del `queryClient` al contexto, para que se pueda acceder desde cualquier ruta.

> `defaultPreloadStaleTime: 0` -> Recomendación oficial para que las llamadas de los loaders no se queden siempre antiguas. Por defecto 30 segundos.

2. En las rutas usamos ese contexto, y con el método `ensureQueryData` hacemos una llamada a la API utilizando React Query, así ya lo tenemos preparado en la caché.

> Si se quiere, se pueden usar las propiedades `pendingComponent` y `errorComponent` en cada ruta para mostrar un loading o un error

3. Y por último en el componente, en lugar de usar como antes el `useLoaderData`, usamos el hook `useSuspenseQuery` con las mismas opciones, para que React Query se encargue de pedir los nuevos datos si los necesita. 
