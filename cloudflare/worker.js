export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CONFIGURACIÓN: Reemplaza esto con la URL real de tu VPS de Ghost
    const GHOST_ORIGIN = env.GHOST_ORIGIN || "https://tu-instancia-ghost.com";

    // Proxy para el Blog
    if (url.pathname.startsWith('/blog')) {
      const newUrl = new URL(request.url);
      newUrl.hostname = new URL(GHOST_ORIGIN).hostname;
      newUrl.protocol = new URL(GHOST_ORIGIN).protocol;
      
      const modifiedRequest = new Request(newUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual'
      });

      return fetch(modifiedRequest);
    }

    // Proxy para el contenido principal (Astro en Cloudflare Pages)
    // En Workers, si no interceptamos, la petición sigue su curso normal 
    // pero si este Worker se despliega en "thinka.cl/*", debemos asegurarnos
    // de que las peticiones que NO son /blog lleguen a Pages.
    return fetch(request);
  }
}
