import { createServer, Model, Response } from "miragejs";
import { useAuthStore } from "~/stores/auth.store";

export function makeServer() {
  return createServer({
    models: { product: Model },

    routes() {
      this.urlPrefix = "http://localhost:3000/";
      this.namespace = "api";

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

      this.post("/recover-password", (schema, request) => {
        const { username } = JSON.parse(request.requestBody);
        if (!username) return;

        if (username !== "111.111.111-11") {
          return new Response(
            404,
            {},
            { status: "fail", message: "Usuário não encontrado!" },
          );
        }

        return new Response(
          201,
          {},
          { status: "success", userEmail: "ewerton.silva@usemobile.xyz" },
        );
      });

      this.post("/recover-code", (schema, request) => {
        const { code } = JSON.parse(request.requestBody);
        if (!code) return;

        if (code !== "1234") {
          return new Response(
            404,
            {},
            { status: "fail", message: "Usuário não encontrado!" },
          );
        }

        return new Response(201, {}, { status: "success" });
      });

      this.passthrough("https://dummyjson.com/auth/login");
      this.passthrough("https://dummyjson.com/users");
    },
  });
}
