import baseWorker from './worker-entry-v6.mjs';

function isAdminPage(url) {
  return url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/' || url.pathname.startsWith('/__cr-admin/');
}

class AdminFrenchInjector {
  element(element) {
    element.append('<script defer src="/assets/wiki-admin-fr.js?v=admin-fr-1"></script>', { html: true });
  }
}

export default {
  async fetch(req, env, ctx) {
    const response = await baseWorker.fetch(req, env, ctx);
    const url = new URL(req.url);
    if (!isAdminPage(url) || !response.ok) return response;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;
    return new HTMLRewriter().on('body', new AdminFrenchInjector()).transform(response);
  }
};
