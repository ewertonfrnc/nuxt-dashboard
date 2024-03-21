import { createServer, Model } from "miragejs";

import authHandlers from "~/utils/miragejs/auth.handlers";

export function makeServer() {
  return createServer({
    models: { product: Model },

    routes() {
      this.urlPrefix = "http://localhost:3000/";
      this.namespace = "api";

      // auth
      authHandlers(this);
    },
  });
}
