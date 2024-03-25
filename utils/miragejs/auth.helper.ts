import { Response } from "miragejs";

export async function loginMock(schema, request) {
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
}

export function recoverPasswordMock(schema, request) {
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
    { status: "success", userEmail: "ana******@usemobile.xyz" },
  );
}

export function recoverCodeMock(schema, request) {
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
}

export function changePassword(schema, request) {
  const { password, passwordConfirm } = JSON.parse(request.requestBody);
  if (!password || !passwordConfirm) return;

  return new Response(201, {}, { status: "success" });
}
