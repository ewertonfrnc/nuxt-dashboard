import { createServer, Model, Response } from "miragejs";
import { useAuthStore } from "~/stores/auth.store";

export function makeServer() {
  return createServer({
    models: { product: Model },

    routes() {
      this.urlPrefix = "http://localhost:3000/";
      this.namespace = "api";

      this.get("/products", (schema) => {
        return new Response(
          200,
          {},
          { status: "success", data: schema.db.products },
        );
      });

      this.post("/products", (schema, request) => {
        schema.db.products.push(JSON.parse(request.requestBody));

        return new Response(201, {}, { status: "success" });
      });

      this.post("/login", async (schema, request) => {
        const { authenticateUser } = useAuthStore();
        const user = await authenticateUser(JSON.parse(request.requestBody));

        return new Response(201, {}, { status: "success", data: user });
      });

      this.passthrough("https://dummyjson.com/auth/login");
      this.passthrough("https://dummyjson.com/users");
    },
  });
}
