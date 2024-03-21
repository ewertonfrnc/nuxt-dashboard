import {
  changePassword,
  loginMock,
  recoverCodeMock,
  recoverPasswordMock,
} from "~/utils/miragejs/auth.helper";

export default function (server) {
  server.post(
    "/login",
    async (schema, request) => await loginMock(schema, request),
  );

  server.post("/recover-password", (schema, request) =>
    recoverPasswordMock(schema, request),
  );

  server.post("/recover-code", (schema, request) =>
    recoverCodeMock(schema, request),
  );

  server.post("/change-password", (schema, request) =>
    changePassword(schema, request),
  );
}
