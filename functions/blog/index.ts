export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/blog/, '') || '/';
  const GHOST_ORIGIN = 'https://blog.marketing.thinkahub.cl';
  const ghostUrl = `${GHOST_ORIGIN}${path}${url.search}`;
  const resp = await fetch(ghostUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'manual'
  });
  let response = resp;
  if (resp.headers.get('content-type')?.includes('text/html')) {
    let html = await resp.text();
    html = html.replace(/https?:\/\/blog\.marketing\.thinkahub\.cl/g, 'https://thinka.cl/blog');
    response = new Response(html, resp);
    response.headers.set('Content-Type', 'text/html; charset=utf-8');
  }
  return response;
}
