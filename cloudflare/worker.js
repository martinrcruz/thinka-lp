export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const GHOST_ORIGIN = env.GHOST_ORIGIN || "https://blog.marketing.thinkahub.cl";

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', ghost: GHOST_ORIGIN }), {
        headers: { 'content-type': 'application/json' }
      });
    }

    if (url.pathname.startsWith('/blog')) {
      const ghostPath = url.pathname.replace(/^\/blog/, '') || '/';
      const ghostUrl = `${GHOST_ORIGIN}${ghostPath}${url.search}`;

      try {
        const modifiedRequest = new Request(ghostUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body,
          redirect: 'manual'
        });
        let response = await fetch(modifiedRequest);
        if (response.headers.get('content-type')?.includes('text/html')) {
          let html = await response.text();
          html = html.replace(
            /https?:\/\/blog\.marketing\.thinkahub\.cl/g,
            'https://thinka.cl/blog'
          );
          response = new Response(html, response);
          response.headers.set('Content-Type', 'text/html; charset=utf-8');
        }
        return response;
      } catch (err) {
        return new Response(`Proxy error: ${err.message}`, { status: 502 });
      }
    }

    return Response.redirect('https://thinka.cl', 301);
  }
}
