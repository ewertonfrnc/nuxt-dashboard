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
        const userCredentials = JSON.parse(request.requestBody);

        if (!userCredentials) return;

        if (userCredentials.password !== "12341234") {
          return new Response(
            404,
            {},
            { status: "fail", message: "Usuário e/ou senha incorretos" },
          );
        }

        const { authenticateUser } = useAuthStore();
        const user = await authenticateUser(JSON.parse(request.requestBody));

        return new Response(201, {}, { status: "success", user });
      });

      this.passthrough("https://dummyjson.com/auth/login");
      this.passthrough("https://dummyjson.com/users");
    },
  });
}
