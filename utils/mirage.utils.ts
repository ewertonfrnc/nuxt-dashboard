import { createServer, Model } from "miragejs";

import authHandlers from "~/utils/miragejs/auth.handlers";
import homeHandlers from "~/utils/miragejs/home.handlers";

export function makeServer() {
  return createServer({
    models: { product: Model },

    routes() {
      this.urlPrefix = "http://localhost:3000/";
      this.namespace = "api";

      // auth
      authHandlers(this);

      // home
      homeHandlers(this);
    },
  });
}
