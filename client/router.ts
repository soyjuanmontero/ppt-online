
import { initPageWelcome } from "./pages/welcome";
import { initPageStepUno } from "./pages/step-1";
import { initPagePlay } from "./pages/play";
import { initpageMove } from "./pages/move";
import { initPageResult } from "./pages/result";

type RouterPath = {
  pathRegex: RegExp;
  render: (params: { goTo: (path: string) => void }) => {
    element: Element;
    onDestroy?: () => void;
  };
};

const routes: RouterPath[] = [
  {
    pathRegex: /^\/$/,
    render: ({ goTo }) => initPageWelcome({ goTo }),
  },
  {
    pathRegex: /^\/step-1$/,
    render: ({ goTo }) => initPageStepUno({ goTo }),
  },
  {
    pathRegex: /^\/play$/,
    render: ({ goTo }) => initPagePlay({ goTo }),
  },
  {
    pathRegex: /^\/move$/,
    render: ({ goTo }) => initpageMove({ goTo }),
  },
  {
    pathRegex: /^\/result$/,
    render: ({ goTo }) => initPageResult({ goTo }),
  },
];

let rootContainer: Element | null = null;
let currentCleanup: (() => void) | undefined;

// Función optimizada para extraer la ruta real limpia
function getCleanPathFromURL(): string {
  let path = window.location.pathname;
  const isGitHubPages = window.location.hostname.includes("github.io");

  if (isGitHubPages) {
    const pathSegments = path.split("/");
    const repoName = pathSegments[1]; 

    if (repoName) {
      // Remueve exactamente "/nombre-del-repo" al inicio de la cadena
      path = path.replace(new RegExp(`^\\/${repoName}`), "");
    }
  }

  // Si el path quedó vacío o es solo una barra, devolvemos la raíz
  if (path === "" || path === "/") {
    return "/";
  }

  // Remueve una barra diagonal al final si existe (ej: /step-1/ pasa a /step-1)
  // Esto evita fallos en los regex estrictos de tus rutas
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function goTo(path: string): void {
  const isGitHubPages = window.location.hostname.includes("github.io");
  let finalPath = path;

  if (isGitHubPages) {
    const repoName = window.location.pathname.split("/")[1];
    if (repoName && !path.startsWith(`/${repoName}`)) {
      // Asegura que no se dupliquen las barras diagonales
      finalPath = `/${repoName}${path.startsWith("/") ? path : "/" + path}`;
    }
  }

  window.history.pushState({}, "", finalPath);
  renderPath(); 
}

function renderPath(): void {
  if (!rootContainer) return;

  const cleanPath = getCleanPathFromURL();
  const route = routes.find((r) => r.pathRegex.test(cleanPath));

  if (route) {
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = undefined;
    }

    const component = route.render({ goTo });
    rootContainer.innerHTML = "";
    rootContainer.appendChild(component.element);

    currentCleanup = component.onDestroy;
  } else {
    console.warn(`El path limpio '${cleanPath}' no coincide con ninguna ruta.`);
  }
}

export function initRouter(container: Element): void {
  rootContainer = container;
  


  renderPath();
}
