import { createServer, Model, Response } from "miragejs";

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
        // const { authenticateUser } = useAuthStore();
        // const user = await authenticateUser(JSON.parse(request.requestBody));

        const userCredentials = JSON.parse(request.requestBody);
        if (userCredentials.password !== "12341234") {
          throw new Error("deu ruim");
        }

        const user = {
          id: 15,
          username: "kminchelle",
          email: "kminchelle@qq.com",
          firstName: "Jeanne",
          lastName: "Halvorson",
          gender: "female",
          image: "https://robohash.org/Jeanne.png?set=set4",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs",
        };
        return new Response(201, {}, { status: "success", data: user });
      });

      this.passthrough("https://dummyjson.com/auth/login");
      this.passthrough("https://dummyjson.com/users");
    },
  });
}
