# 🎮 Piedra, Papel o Tijera (Desafío SPA)

[![Demo en Vivo](https://shields.io)](https://soyjuanmontero.github.io/piedra-papel-o-tijera/)
[![Prototipo](https://shields.io)](https://github.com)

¡Bienvenido a **Piedra, Papel o Tijera**! Este proyecto es una aplicación web interactiva (Single Page Application - SPA) que recrea el clásico juego utilizando un desarrollo moderno, modular y fuertemente tipado.

## 🚀 Características Clave

- **Single Page Application (SPA):** Navegación fluida e instantánea sin recargar el navegador.
- **Router Propio Adaptable:** Sistema de ruteo personalizado mediante expresiones regulares (`RegExp`) optimizado para producción y compatible con subcarpetas en **GitHub Pages**.
- **Gestión de Ciclo de Vida (`onDestroy`):** Control manual de limpieza de eventos y elementos DOM al cambiar de vista para prevenir fugas de memoria (*memory leaks*).
- **TypeScript Total:** Código robusto, escalable y autodocumentado mediante interfaces sólidas.

## 🛠️ Tecnologías Utilizadas

- ![TypeScript](https://shields.io)
- ![HTML5](https://shields.io)
- ![CSS3](https://shields.io)

## 📁 Estructura de Páginas (Flujo del Juego)

El enrutador gestiona dinámicamente las siguientes vistas:
1. `Welcome (/)`: Pantalla de bienvenida e inicio del juego.
2. `Step-1 (/step-1)`: Configuración inicial o instrucciones antes de la partida.
3. `Play (/play)`: Zona de juego donde el usuario realiza su elección.
4. `Move (/move)`: Visualización animada de las jugadas elegidas.
5. `Result (/result)`: Pantalla final que muestra el marcador, si ganaste, perdiste o empataste, y permite reiniciar.

## 📦 Instalación y Uso Local

Para clonar y ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com.git
   ```

2. **Ingresar a la carpeta:**
   ```bash
   cd piedra-papel-o-tijera
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 🛠️ Detalles Técnicos: El Router

El núcleo de la navegación se basa en una arquitectura desacoplada donde cada ruta se define formalmente:

```typescript
type RouterPath = {
  pathRegex: RegExp;
  render: (params: { goTo: (path: string) => void }) => {
    element: Element;
    onDestroy?: () => void;
  };
};
```

Cuenta con la función `getCleanPathFromURL()`, la cual remueve de forma automática los prefijos de entorno generados por plataformas de hosting estático (como el subdirectorio de GitHub Pages), asegurando que las expresiones regulares de las rutas validen correctamente tanto en `localhost` como en producción.

---
Desarrollado con 💻 por [Juan Montero](https://github.com).
