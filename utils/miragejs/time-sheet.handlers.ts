import { Response, Server } from "miragejs";

const nodes = [
  {
    id: 1000,
    name: "Usuário 1",
    currentBalance: "+22h 53min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2023-10-23T08:17:35.095Z",
        dateBalance: "+5h 40min",
      },
      {
        id: 2,
        date: "2024-01-15T06:26:29.403Z",
        dateBalance: "+21h 33min",
      },
      {
        id: 3,
        date: "2023-01-13T09:31:51.764Z",
        dateBalance: "+23h 45min",
      },
      {
        id: 4,
        date: "2023-11-08T16:26:09.621Z",
        dateBalance: "+6h 48min",
      },
    ],
  },
  {
    id: 1001,
    name: "Usuário 2",
    currentBalance: "+0h 52min",
    totalRequests: 3,
    requests: [
      {
        id: 1,
        date: "2022-05-16T21:53:36.592Z",
        dateBalance: "+5h 32min",
      },
      {
        id: 2,
        date: "2023-12-23T15:50:39.913Z",
        dateBalance: "+14h 14min",
      },
      {
        id: 3,
        date: "2023-11-23T11:17:11.254Z",
        dateBalance: "+8h 20min",
      },
      {
        id: 4,
        date: "2022-03-26T01:34:20.945Z",
        dateBalance: "+22h 31min",
      },
    ],
  },
  {
    id: 1002,
    name: "Usuário 3",
    currentBalance: "+10h 36min",
    totalRequests: 9,
    requests: [
      {
        id: 1,
        date: "2022-04-02T01:18:06.849Z",
        dateBalance: "+4h 31min",
      },
      {
        id: 2,
        date: "2022-09-22T09:38:17.764Z",
        dateBalance: "+2h 2min",
      },
      {
        id: 3,
        date: "2022-04-11T14:25:46.940Z",
        dateBalance: "+5h 26min",
      },
      {
        id: 4,
        date: "2022-10-09T12:16:59.995Z",
        dateBalance: "+18h 49min",
      },
    ],
  },
  {
    id: 1003,
    name: "Usuário 4",
    currentBalance: "+9h 24min",
    totalRequests: 5,
    requests: [
      {
        id: 1,
        date: "2022-04-28T16:03:21.410Z",
        dateBalance: "+15h 46min",
      },
      {
        id: 2,
        date: "2024-03-08T21:10:47.030Z",
        dateBalance: "+22h 23min",
      },
      {
        id: 3,
        date: "2022-05-04T17:07:57.783Z",
        dateBalance: "+13h 12min",
      },
      {
        id: 4,
        date: "2023-11-18T11:39:21.838Z",
        dateBalance: "+19h 41min",
      },
    ],
  },
  {
    id: 1004,
    name: "Usuário 5",
    currentBalance: "+0h 34min",
    totalRequests: 8,
    requests: [
      {
        id: 1,
        date: "2022-08-05T15:22:45.570Z",
        dateBalance: "+9h 48min",
      },
      {
        id: 2,
        date: "2022-09-12T06:13:11.512Z",
        dateBalance: "+12h 2min",
      },
      {
        id: 3,
        date: "2022-01-30T09:43:07.511Z",
        dateBalance: "+20h 34min",
      },
      {
        id: 4,
        date: "2023-01-15T23:12:09.606Z",
        dateBalance: "+18h 35min",
      },
    ],
  },
  {
    id: 1005,
    name: "Usuário 6",
    currentBalance: "+21h 36min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2023-12-10T18:25:30.742Z",
        dateBalance: "+20h 39min",
      },
      {
        id: 2,
        date: "2022-10-09T12:43:44.333Z",
        dateBalance: "+20h 2min",
      },
      {
        id: 3,
        date: "2022-10-29T20:50:20.787Z",
        dateBalance: "+13h 13min",
      },
      {
        id: 4,
        date: "2023-11-02T08:25:09.553Z",
        dateBalance: "+17h 0min",
      },
    ],
  },
  {
    id: 1006,
    name: "Usuário 7",
    currentBalance: "+18h 10min",
    totalRequests: 7,
    requests: [
      {
        id: 1,
        date: "2022-02-06T04:32:45.782Z",
        dateBalance: "+13h 4min",
      },
      {
        id: 2,
        date: "2023-02-24T04:48:54.569Z",
        dateBalance: "+6h 43min",
      },
      {
        id: 3,
        date: "2024-02-03T03:30:30.639Z",
        dateBalance: "+8h 21min",
      },
      {
        id: 4,
        date: "2023-12-01T10:40:34.303Z",
        dateBalance: "+1h 33min",
      },
    ],
  },
  {
    id: 1007,
    name: "Usuário 8",
    currentBalance: "+17h 51min",
    totalRequests: 5,
    requests: [
      {
        id: 1,
        date: "2023-11-04T03:35:30.615Z",
        dateBalance: "+12h 51min",
      },
      {
        id: 2,
        date: "2022-12-18T15:13:00.379Z",
        dateBalance: "+21h 25min",
      },
      {
        id: 3,
        date: "2024-02-19T19:26:49.841Z",
        dateBalance: "+1h 49min",
      },
      {
        id: 4,
        date: "2023-12-02T16:07:31.676Z",
        dateBalance: "+11h 54min",
      },
    ],
  },
  {
    id: 1008,
    name: "Usuário 9",
    currentBalance: "+23h 15min",
    totalRequests: 1,
    requests: [
      {
        id: 1,
        date: "2022-10-06T12:26:25.332Z",
        dateBalance: "+10h 21min",
      },
      {
        id: 2,
        date: "2023-02-14T22:38:14.685Z",
        dateBalance: "+1h 5min",
      },
      {
        id: 3,
        date: "2022-03-26T05:46:03.520Z",
        dateBalance: "+19h 40min",
      },
      {
        id: 4,
        date: "2023-04-01T13:57:34.755Z",
        dateBalance: "+16h 1min",
      },
    ],
  },
  {
    id: 1009,
    name: "Usuário 10",
    currentBalance: "+12h 52min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2022-09-15T14:06:00.149Z",
        dateBalance: "+1h 0min",
      },
      {
        id: 2,
        date: "2024-03-22T16:02:31.131Z",
        dateBalance: "+8h 34min",
      },
      {
        id: 3,
        date: "2022-06-12T07:56:43.867Z",
        dateBalance: "+5h 37min",
      },
      {
        id: 4,
        date: "2023-04-19T14:47:32.568Z",
        dateBalance: "+2h 43min",
      },
    ],
  },
  {
    id: 1010,
    name: "Usuário 11",
    currentBalance: "+11h 25min",
    totalRequests: 3,
    requests: [
      {
        id: 1,
        date: "2022-05-09T20:21:55.055Z",
        dateBalance: "+9h 5min",
      },
      {
        id: 2,
        date: "2023-10-01T23:38:44.149Z",
        dateBalance: "+8h 20min",
      },
      {
        id: 3,
        date: "2022-09-26T00:37:04.709Z",
        dateBalance: "+7h 10min",
      },
      {
        id: 4,
        date: "2024-04-01T08:57:35.321Z",
        dateBalance: "+17h 53min",
      },
    ],
  },
  {
    id: 1011,
    name: "Usuário 12",
    currentBalance: "+14h 3min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2022-10-20T13:12:53.736Z",
        dateBalance: "+3h 0min",
      },
      {
        id: 2,
        date: "2023-07-14T16:34:20.210Z",
        dateBalance: "+17h 32min",
      },
      {
        id: 3,
        date: "2022-04-28T03:43:31.922Z",
        dateBalance: "+16h 32min",
      },
      {
        id: 4,
        date: "2023-01-19T12:49:52.330Z",
        dateBalance: "+6h 38min",
      },
    ],
  },
  {
    id: 1012,
    name: "Usuário 13",
    currentBalance: "+9h 43min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2022-10-20T04:58:44.000Z",
        dateBalance: "+23h 16min",
      },
      {
        id: 2,
        date: "2022-12-02T12:37:38.087Z",
        dateBalance: "+3h 30min",
      },
      {
        id: 3,
        date: "2023-02-04T07:02:58.488Z",
        dateBalance: "+4h 14min",
      },
      {
        id: 4,
        date: "2022-11-14T03:49:58.203Z",
        dateBalance: "+8h 3min",
      },
    ],
  },
  {
    id: 1013,
    name: "Usuário 14",
    currentBalance: "+15h 4min",
    totalRequests: 2,
    requests: [
      {
        id: 1,
        date: "2023-04-03T23:21:19.524Z",
        dateBalance: "+12h 6min",
      },
      {
        id: 2,
        date: "2022-02-05T19:49:38.413Z",
        dateBalance: "+4h 24min",
      },
      {
        id: 3,
        date: "2022-09-13T03:56:01.164Z",
        dateBalance: "+12h 30min",
      },
      {
        id: 4,
        date: "2022-12-13T20:45:44.915Z",
        dateBalance: "+6h 38min",
      },
    ],
  },
  {
    id: 1014,
    name: "Usuário 15",
    currentBalance: "+5h 14min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "2023-01-24T02:59:12.709Z",
        dateBalance: "+4h 53min",
      },
      {
        id: 2,
        date: "2022-12-17T00:25:11.429Z",
        dateBalance: "+23h 17min",
      },
      {
        id: 3,
        date: "2022-08-09T10:52:08.809Z",
        dateBalance: "+5h 29min",
      },
      {
        id: 4,
        date: "2023-05-30T04:21:47.714Z",
        dateBalance: "+19h 17min",
      },
    ],
  },
  {
    id: 1015,
    name: "Usuário 16",
    currentBalance: "+3h 23min",
    totalRequests: 1,
    requests: [
      {
        id: 1,
        date: "2022-12-06T00:32:08.977Z",
        dateBalance: "+19h 14min",
      },
      {
        id: 2,
        date: "2023-05-10T18:06:45.553Z",
        dateBalance: "+21h 3min",
      },
      {
        id: 3,
        date: "2022-08-29T11:50:36.006Z",
        dateBalance: "+23h 13min",
      },
      {
        id: 4,
        date: "2024-02-03T23:29:57.142Z",
        dateBalance: "+14h 12min",
      },
    ],
  },
  {
    id: 1016,
    name: "Usuário 17",
    currentBalance: "+20h 16min",
    totalRequests: 7,
    requests: [
      {
        id: 1,
        date: "2024-02-16T19:30:47.709Z",
        dateBalance: "+13h 44min",
      },
      {
        id: 2,
        date: "2022-09-19T18:21:22.185Z",
        dateBalance: "+23h 21min",
      },
      {
        id: 3,
        date: "2022-12-03T02:17:05.847Z",
        dateBalance: "+6h 7min",
      },
      {
        id: 4,
        date: "2023-08-22T14:37:55.767Z",
        dateBalance: "+6h 3min",
      },
    ],
  },
  {
    id: 1017,
    name: "Usuário 18",
    currentBalance: "+5h 58min",
    totalRequests: 5,
    requests: [
      {
        id: 1,
        date: "2024-02-09T17:54:01.965Z",
        dateBalance: "+3h 41min",
      },
      {
        id: 2,
        date: "2022-12-20T08:11:48.544Z",
        dateBalance: "+7h 41min",
      },
      {
        id: 3,
        date: "2023-07-08T16:22:00.210Z",
        dateBalance: "+6h 55min",
      },
      {
        id: 4,
        date: "2023-11-03T01:46:04.604Z",
        dateBalance: "+17h 31min",
      },
    ],
  },
  {
    id: 1018,
    name: "Usuário 19",
    currentBalance: "+19h 17min",
    totalRequests: 3,
    requests: [
      {
        id: 1,
        date: "2023-11-04T15:52:59.949Z",
        dateBalance: "+4h 32min",
      },
      {
        id: 2,
        date: "2023-08-03T07:47:11.460Z",
        dateBalance: "+14h 5min",
      },
      {
        id: 3,
        date: "2022-03-27T13:40:48.952Z",
        dateBalance: "+8h 46min",
      },
      {
        id: 4,
        date: "2023-12-03T10:18:48.665Z",
        dateBalance: "+2h 47min",
      },
    ],
  },
  {
    id: 1019,
    name: "Usuário 20",
    currentBalance: "+4h 40min",
    totalRequests: 6,
    requests: [
      {
        id: 1,
        date: "2022-10-21T14:30:06.744Z",
        dateBalance: "+2h 7min",
      },
      {
        id: 2,
        date: "2023-05-12T21:32:12.038Z",
        dateBalance: "+20h 6min",
      },
      {
        id: 3,
        date: "2022-12-18T18:36:24.817Z",
        dateBalance: "+7h 2min",
      },
      {
        id: 4,
        date: "2023-11-14T09:07:27.295Z",
        dateBalance: "+13h 29min",
      },
    ],
  },
];

export default function (server: Server) {
  server.get("/time-sheet/pending", () => {
    return new Response(
      200,
      {},
      {
        status: "success",
        pending: nodes,
      },
    );
  });
}
