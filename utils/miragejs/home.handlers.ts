import { Response, Server } from "miragejs";

export default function (server: Server) {
  server.get("/home", () => {
    return new Response(
      200,
      {},
      {
        status: "success",
        indicators: {
          pendingAdjustments: 5,
          collaborators: 36,
          availableClosings: 1,
          monthlyTurnover: 9.8,
          annualTurnover: 3,
        },
      },
    );
  });
}
