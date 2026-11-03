# PPT Online 🎮

Aplicación fullstack multijugador de **Piedra, Papel o Tijera**, en la que dos jugadores pueden crear o unirse a una sala, conectarse y jugar partidas en tiempo real.

El proyecto comenzó como una aplicación frontend y evolucionó hacia una arquitectura fullstack, incorporando un backend propio, persistencia de datos, comunicación en tiempo real y gestión del estado de las partidas.

## 🚀 Demo y documentación

- **Aplicación online:** https://ppt-online-t3i3.onrender.com/
- **Documentación de la API:** https://documenter.getpostman.com/view/56367858/2sBYHXRdyK

## ✨ Funcionalidades

- Creación de usuarios y salas de juego.
- Ingreso a salas existentes mediante su identificador.
- Capacidad máxima de dos jugadores por sala.
- Reconexión de jugadores a salas existentes.
- Indicador de conexión de los jugadores.
- Sistema de preparación (*ready*) para iniciar las partidas.
- Sincronización del estado de la sala en tiempo real.
- Selección de movimientos: piedra, papel o tijera.
- Evaluación del resultado de cada partida.
- Identificación del ganador.
- Actualización de puntuaciones.
- Registro del historial de partidas.
- Persistencia del estado de la aplicación en `localStorage`.

## 🛠️ Tecnologías

### Frontend
- **TypeScript:** desarrollo con tipado estático.
- **Web Components:** construcción de componentes reutilizables.
- **Firebase Realtime Database:** recepción de actualizaciones en tiempo real.
- **Firebase SDK:** conexión con los servicios de Firebase.
- **HTML y CSS:** estructura y presentación de la interfaz.
- **Parcel:** empaquetado y desarrollo de la aplicación.

### Backend
- **Node.js:** entorno de ejecución.
- **Express:** creación y gestión de endpoints REST.
- **TypeScript:** tipado y organización del código del servidor.
- **Firebase Admin SDK:** comunicación del backend con Firebase.

### Base de datos
- **Firebase Realtime Database:** almacenamiento y sincronización de información dinámica de las salas, jugadores, elecciones y partidas.
- **Cloud Firestore:** almacenamiento de información persistente de usuarios y relaciones entre identificadores de salas.

## 🏗️ Arquitectura y funcionamiento

El proyecto utiliza una arquitectura cliente-servidor en la que el frontend se comunica con un backend propio mediante peticiones HTTP, mientras que Firebase Realtime Database permite mantener sincronizada la información entre los jugadores.

### Comunicación entre frontend y backend

El frontend realiza peticiones a los endpoints de Express para ejecutar operaciones como la creación de usuarios, creación e ingreso a salas y actualización de las elecciones de los jugadores.

El backend procesa estas solicitudes y realiza las operaciones correspondientes sobre Firebase mediante Firebase Admin SDK.

De esta manera, las operaciones principales de la aplicación no dependen de escrituras directas desde el cliente a la base de datos.

### Sincronización en tiempo real

Firebase Realtime Database permite que los cambios realizados en una sala sean recibidos por los clientes conectados.

Para implementar esta funcionalidad se utiliza `onValue`, que permite escuchar los cambios de una referencia de la base de datos.

Cuando se reciben actualizaciones, el estado global de la aplicación se actualiza y notifica a los componentes suscritos para que reflejen la información más reciente.

### Gestión de presencia de jugadores

Se implementó un sistema de presencia utilizando la referencia especial `.info/connected` de Firebase Realtime Database y `onDisconnect`.

Esto permite detectar cuándo el cliente establece una conexión con Firebase y registrar una operación en el servidor para actualizar el estado del jugador cuando se pierde la conexión.

La operación de desconexión se registra antes de establecer al jugador como conectado, evitando depender únicamente de eventos de cierre de la página.

### Gestión del estado

La aplicación cuenta con un sistema centralizado de estado que permite compartir información entre las diferentes páginas y componentes.

Se implementaron métodos para:

- Consultar el estado actual.
- Actualizar y persistir información.
- Suscribir componentes a los cambios del estado.
- Cancelar suscripciones cuando dejan de ser necesarias.

El patrón de suscripción permite mantener sincronizada la interfaz con los cambios de información sin tener que consultar manualmente el estado desde cada componente.

Además, se utiliza `localStorage` para conservar el estado de la aplicación al recargar la página y se restablecen los datos al regresar a la página inicial para comenzar una nueva sesión.

### Navegación y router propio

Se desarrolló un **router personalizado** para gestionar la navegación de la aplicación como una SPA (*Single Page Application*), sin depender de librerías externas de enrutamiento.

El router permite:

- Definir y administrar las rutas disponibles mediante expresiones regulares (`RegExp`).
- Identificar la ruta actual a partir de la URL del navegador.
- Renderizar dinámicamente la página correspondiente dentro del contenedor principal.
- Navegar entre páginas mediante la API `History` del navegador, utilizando `pushState`.
- Gestionar la navegación hacia atrás y adelante mediante el evento `popstate`.
- Adaptar las rutas para el despliegue en GitHub Pages.
- Ejecutar funciones de limpieza (`onDestroy`) al abandonar una página, permitiendo cancelar suscripciones y liberar recursos asociados.

Esta implementación permite centralizar la navegación, controlar el ciclo de vida de las páginas y mantener la aplicación dentro de una única carga de documento.

## 🗄️ Organización de los datos

Se utilizan dos servicios de Firebase con responsabilidades diferentes:

- **Cloud Firestore:** conserva información persistente relacionada con los usuarios y la correspondencia entre identificadores cortos y largos de las salas.
- **Realtime Database:** administra la información dinámica de las salas, incluyendo jugadores, estados de conexión, preparación, elecciones e historial de partidas.

Esta separación permite utilizar Firestore para información persistente y Realtime Database para los datos que necesitan sincronizarse durante el juego.

## 📡 API

El backend expone endpoints REST para gestionar las operaciones principales de la aplicación.

La colección de Postman incluye las peticiones disponibles, sus métodos HTTP, parámetros, cuerpos de solicitud y ejemplos de respuestas.

**[Consultar documentación completa de la API](https://documenter.getpostman.com/view/56367858/2sBYHXRdyK)**

## 🌐 Despliegue

- **Frontend y aplicación online:** desplegados en Render.
- **Backend:** desplegado en Render.
- **Base de datos:** servicios Firebase.

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como parte de mi formación en desarrollo de software y como una oportunidad para llevar una aplicación frontend a una implementación fullstack.

Durante su desarrollo trabajé con TypeScript, Node.js, Express, Firebase, APIs REST, gestión de estado, suscripciones, sincronización en tiempo real, persistencia de datos y arquitectura cliente-servidor.

El objetivo principal fue comprender cómo se conectan las diferentes partes de una aplicación y cómo gestionar información compartida entre múltiples usuarios.
