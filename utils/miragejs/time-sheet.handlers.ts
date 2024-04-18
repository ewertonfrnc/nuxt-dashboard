import { Response, Server } from "miragejs";

const nodes = [
  {
    userId: 999,
    name: "Ana Maria Carla",
    currentBalance: "+ 16h 09min",
    totalRequests: 4,
    requests: [
      {
        id: 1,
        date: "02/06 - Sexta-feira",
        negative: false,
        before: {
          total: "08:00:00",
          negative: false,
          checkins: [
            {
              time: "08:00:00",
              manipulated: false,
            },
            {
              time: "16:00:00",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "12:00:00",
              manipulated: false,
            },
            {
              time: "16:10:00",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "08:00:00",
          checkins: [
            {
              time: "08:00:00",
              manipulated: false,
            },
            {
              time: "13:00:00",
              manipulated: true,
            },
            {
              time: "15:30:00",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "12:00:00",
              manipulated: false,
            },
            {
              time: "15:30:00",
              manipulated: true,
            },
            {
              time: "18:30:00",
              manipulated: true,
            },
          ],
        },
      },
      {
        id: 2,
        date: "01/06 - Quinta-feira",
        negative: true,
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
      {
        id: 3,
        date: "31/05 - Quarta-feira",
        negative: true,
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
      {
        id: 4,
        date: "30/06 - Terça-feira",
        negative: true,
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
    ],
  },
  {
    userId: 1000,
    name: "Lucas Diego",
    role: "Programador",
    currentBalance: "- 05h 38min",
    totalRequests: 6,
    negative: true,
    requests: [
      {
        date: "02/06 - Sexta-feira",
        before: {
          total: "03:10:00",
          checkins: [
            {
              time: "08:00:00",
              manipulated: false,
            },
            {
              time: "16:00:00",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "12:00:00",
              manipulated: false,
            },
            {
              time: "16:10:00",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "08:00:00",
          checkins: [
            {
              time: "08:00:00",
              manipulated: false,
            },
            {
              time: "13:00:00",
              manipulated: true,
            },
            {
              time: "15:30:00",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "12:00:00",
              manipulated: false,
            },
            {
              time: "15:30:00",
              manipulated: true,
            },
            {
              time: "18:30:00",
              manipulated: true,
            },
          ],
        },
      },
      {
        date: "01/06 - Quinta-feira",
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
      {
        date: "31/05 - Quarta-feira",
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
      {
        date: "30/06 - Terça-feira",
        before: {
          total: "02:13:28",
          checkins: [
            {
              time: "04:18:26",
              manipulated: false,
            },
            {
              time: "06:46:50",
              manipulated: false,
            },
          ],
          checkouts: [
            {
              time: "05:35:04",
              manipulated: false,
            },
            {
              time: "02:31:03",
              manipulated: false,
            },
          ],
        },
        after: {
          total: "05:46:32",
          checkins: [
            {
              time: "00:51:36",
              manipulated: true,
            },
            {
              time: "04:27:20",
              manipulated: true,
            },
            {
              time: "05:05:42",
              manipulated: true,
            },
          ],
          checkouts: [
            {
              time: "07:31:38",
              manipulated: true,
            },
            {
              time: "03:31:35",
              manipulated: true,
            },
            {
              time: "07:24:49",
              manipulated: true,
            },
          ],
        },
      },
    ],
  },
  {
    userId: 1001,
    name: "Juliana Mariana",
    role: "Arquiteto",
    requests: {
      date: "02/06 - Quarta-feira",
      before: {
        total: "07:00:07",
        checkins: [
          {
            time: "07:36:24",
            manipulated: false,
          },
          {
            time: "02:24:28",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "04:03:51",
            manipulated: false,
          },
          {
            time: "07:10:15",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "00:59:53",
        checkins: [
          {
            time: "00:17:42",
            manipulated: true,
          },
          {
            time: "06:34:01",
            manipulated: true,
          },
          {
            time: "03:47:35",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "06:47:39",
            manipulated: true,
          },
          {
            time: "01:32:11",
            manipulated: true,
          },
          {
            time: "06:53:42",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1002,
    name: "Carla Diego",
    role: "Fisioterapeuta",
    requests: {
      date: "02/06 - Sexta-feira",
      before: {
        total: "01:36:22",
        checkins: [
          {
            time: "03:53:54",
            manipulated: false,
          },
          {
            time: "01:01:24",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:02:01",
            manipulated: false,
          },
          {
            time: "04:39:59",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "06:23:38",
        checkins: [
          {
            time: "04:00:27",
            manipulated: true,
          },
          {
            time: "01:19:20",
            manipulated: true,
          },
          {
            time: "04:55:48",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "04:20:42",
            manipulated: true,
          },
          {
            time: "01:51:51",
            manipulated: true,
          },
          {
            time: "07:56:19",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1003,
    name: "Ana Juliana",
    role: "Arquiteto",
    requests: {
      date: "02/06 - Quinta-feira",
      before: {
        total: "07:04:32",
        checkins: [
          {
            time: "03:45:58",
            manipulated: false,
          },
          {
            time: "02:16:41",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "05:24:43",
            manipulated: false,
          },
          {
            time: "00:51:41",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "00:55:28",
        checkins: [
          {
            time: "04:42:57",
            manipulated: true,
          },
          {
            time: "02:08:57",
            manipulated: true,
          },
          {
            time: "03:10:01",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "01:58:06",
            manipulated: true,
          },
          {
            time: "01:34:45",
            manipulated: true,
          },
          {
            time: "03:59:05",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1004,
    name: "Luiz Ana",
    role: "Engenheiro",
    requests: {
      date: "02/06 - Quarta-feira",
      before: {
        total: "06:41:36",
        checkins: [
          {
            time: "07:14:22",
            manipulated: false,
          },
          {
            time: "05:22:14",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "07:08:17",
            manipulated: false,
          },
          {
            time: "00:16:54",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "01:18:24",
        checkins: [
          {
            time: "01:53:10",
            manipulated: true,
          },
          {
            time: "04:20:42",
            manipulated: true,
          },
          {
            time: "03:54:35",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "07:08:49",
            manipulated: true,
          },
          {
            time: "06:11:53",
            manipulated: true,
          },
          {
            time: "00:24:41",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1005,
    name: "Maria Maria",
    role: "Arquiteto",
    requests: {
      date: "02/06 - Quinta-feira",
      before: {
        total: "03:33:38",
        checkins: [
          {
            time: "05:25:14",
            manipulated: false,
          },
          {
            time: "03:06:35",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:41:59",
            manipulated: false,
          },
          {
            time: "03:39:17",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "04:26:22",
        checkins: [
          {
            time: "05:18:00",
            manipulated: true,
          },
          {
            time: "07:28:12",
            manipulated: true,
          },
          {
            time: "00:11:42",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "05:56:26",
            manipulated: true,
          },
          {
            time: "01:29:24",
            manipulated: true,
          },
          {
            time: "06:40:43",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1006,
    name: "Diego Maria",
    role: "Arquiteto",
    requests: {
      date: "02/06 - Quarta-feira",
      before: {
        total: "02:22:23",
        checkins: [
          {
            time: "03:23:42",
            manipulated: false,
          },
          {
            time: "00:08:37",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "00:54:51",
            manipulated: false,
          },
          {
            time: "04:13:41",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "05:37:37",
        checkins: [
          {
            time: "03:23:10",
            manipulated: true,
          },
          {
            time: "06:09:07",
            manipulated: true,
          },
          {
            time: "03:32:56",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "06:30:00",
            manipulated: true,
          },
          {
            time: "00:55:07",
            manipulated: true,
          },
          {
            time: "03:58:28",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1007,
    name: "Ana Lucas",
    role: "Designer",
    requests: {
      date: "02/06 - Quarta-feira",
      before: {
        total: "02:32:31",
        checkins: [
          {
            time: "04:13:52",
            manipulated: false,
          },
          {
            time: "05:00:39",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "00:25:00",
            manipulated: false,
          },
          {
            time: "05:03:53",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "05:27:29",
        checkins: [
          {
            time: "03:11:48",
            manipulated: true,
          },
          {
            time: "06:58:01",
            manipulated: true,
          },
          {
            time: "02:58:02",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "01:29:02",
            manipulated: true,
          },
          {
            time: "00:52:06",
            manipulated: true,
          },
          {
            time: "00:38:19",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1008,
    name: "Luiz Lucas",
    role: "Psicólogo",
    requests: {
      date: "02/06 - Terça-feira",
      before: {
        total: "03:32:35",
        checkins: [
          {
            time: "05:35:47",
            manipulated: false,
          },
          {
            time: "06:26:13",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:18:33",
            manipulated: false,
          },
          {
            time: "01:04:54",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "04:27:25",
        checkins: [
          {
            time: "01:00:24",
            manipulated: true,
          },
          {
            time: "00:14:46",
            manipulated: true,
          },
          {
            time: "02:13:59",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "06:33:59",
            manipulated: true,
          },
          {
            time: "02:22:42",
            manipulated: true,
          },
          {
            time: "00:28:08",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1009,
    name: "João Diego",
    role: "Médico",
    requests: {
      date: "02/06 - Quinta-feira",
      before: {
        total: "01:22:24",
        checkins: [
          {
            time: "04:39:54",
            manipulated: false,
          },
          {
            time: "00:28:19",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "04:00:17",
            manipulated: false,
          },
          {
            time: "04:00:04",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "06:37:36",
        checkins: [
          {
            time: "00:27:56",
            manipulated: true,
          },
          {
            time: "00:09:19",
            manipulated: true,
          },
          {
            time: "03:35:48",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "01:00:00",
            manipulated: true,
          },
          {
            time: "01:20:11",
            manipulated: true,
          },
          {
            time: "03:24:39",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1010,
    name: "Lucas Ana",
    role: "Engenheiro",
    requests: {
      date: "02/06 - Segunda-feira",
      before: {
        total: "02:25:24",
        checkins: [
          {
            time: "01:19:28",
            manipulated: false,
          },
          {
            time: "07:39:32",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:03:27",
            manipulated: false,
          },
          {
            time: "06:03:11",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "05:34:36",
        checkins: [
          {
            time: "00:33:49",
            manipulated: true,
          },
          {
            time: "06:30:23",
            manipulated: true,
          },
          {
            time: "03:12:56",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "05:35:11",
            manipulated: true,
          },
          {
            time: "01:12:06",
            manipulated: true,
          },
          {
            time: "03:01:19",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1011,
    name: "Ana Carla",
    role: "Programador",
    requests: {
      date: "02/06 - Segunda-feira",
      before: {
        total: "06:12:14",
        checkins: [
          {
            time: "01:42:17",
            manipulated: false,
          },
          {
            time: "07:15:51",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "02:04:34",
            manipulated: false,
          },
          {
            time: "01:53:17",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "01:47:46",
        checkins: [
          {
            time: "06:34:00",
            manipulated: true,
          },
          {
            time: "03:02:07",
            manipulated: true,
          },
          {
            time: "00:56:43",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "01:09:45",
            manipulated: true,
          },
          {
            time: "01:18:23",
            manipulated: true,
          },
          {
            time: "00:55:00",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1012,
    name: "Carla Carla",
    role: "Veterinário",
    requests: {
      date: "02/06 - Quarta-feira",
      before: {
        total: "03:44:05",
        checkins: [
          {
            time: "04:13:31",
            manipulated: false,
          },
          {
            time: "01:27:15",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "04:13:57",
            manipulated: false,
          },
          {
            time: "05:28:32",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "04:15:55",
        checkins: [
          {
            time: "01:32:01",
            manipulated: true,
          },
          {
            time: "02:49:50",
            manipulated: true,
          },
          {
            time: "04:24:14",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "06:57:19",
            manipulated: true,
          },
          {
            time: "01:17:16",
            manipulated: true,
          },
          {
            time: "03:08:24",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1013,
    name: "Pedro João",
    role: "Designer",
    requests: {
      date: "02/06 - Terça-feira",
      before: {
        total: "05:40:47",
        checkins: [
          {
            time: "03:20:58",
            manipulated: false,
          },
          {
            time: "05:46:16",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "02:27:16",
            manipulated: false,
          },
          {
            time: "02:17:04",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "02:19:13",
        checkins: [
          {
            time: "04:09:32",
            manipulated: true,
          },
          {
            time: "06:57:23",
            manipulated: true,
          },
          {
            time: "02:10:20",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "03:55:36",
            manipulated: true,
          },
          {
            time: "07:56:46",
            manipulated: true,
          },
          {
            time: "06:10:16",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1014,
    name: "Pedro Maria",
    role: "Designer",
    requests: {
      date: "02/06 - Segunda-feira",
      before: {
        total: "06:00:58",
        checkins: [
          {
            time: "04:01:57",
            manipulated: false,
          },
          {
            time: "07:24:46",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:48:12",
            manipulated: false,
          },
          {
            time: "05:44:14",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "01:59:02",
        checkins: [
          {
            time: "05:50:57",
            manipulated: true,
          },
          {
            time: "01:29:33",
            manipulated: true,
          },
          {
            time: "02:00:00",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "04:17:34",
            manipulated: true,
          },
          {
            time: "07:40:39",
            manipulated: true,
          },
          {
            time: "03:34:03",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1015,
    name: "Juliana Luiz",
    role: "Veterinário",
    requests: {
      date: "02/06 - Quinta-feira",
      before: {
        total: "07:50:15",
        checkins: [
          {
            time: "02:59:38",
            manipulated: false,
          },
          {
            time: "06:27:09",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "03:06:42",
            manipulated: false,
          },
          {
            time: "06:35:48",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "00:09:45",
        checkins: [
          {
            time: "00:35:14",
            manipulated: true,
          },
          {
            time: "04:15:19",
            manipulated: true,
          },
          {
            time: "05:10:19",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "02:10:32",
            manipulated: true,
          },
          {
            time: "02:16:48",
            manipulated: true,
          },
          {
            time: "03:18:36",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1016,
    name: "Mariana Maria",
    role: "Designer",
    requests: {
      date: "02/06 - Terça-feira",
      before: {
        total: "01:17:03",
        checkins: [
          {
            time: "02:18:36",
            manipulated: false,
          },
          {
            time: "01:36:54",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "04:17:43",
            manipulated: false,
          },
          {
            time: "00:53:04",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "06:42:57",
        checkins: [
          {
            time: "05:23:57",
            manipulated: true,
          },
          {
            time: "01:35:12",
            manipulated: true,
          },
          {
            time: "02:21:26",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "06:57:49",
            manipulated: true,
          },
          {
            time: "05:48:12",
            manipulated: true,
          },
          {
            time: "06:40:53",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1017,
    name: "Mariana Pedro",
    role: "Engenheiro",
    requests: {
      date: "02/06 - Segunda-feira",
      before: {
        total: "01:29:12",
        checkins: [
          {
            time: "05:03:02",
            manipulated: false,
          },
          {
            time: "00:02:38",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "00:55:37",
            manipulated: false,
          },
          {
            time: "02:24:03",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "06:30:48",
        checkins: [
          {
            time: "06:20:47",
            manipulated: true,
          },
          {
            time: "04:42:42",
            manipulated: true,
          },
          {
            time: "02:05:18",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "04:46:27",
            manipulated: true,
          },
          {
            time: "03:44:43",
            manipulated: true,
          },
          {
            time: "03:54:14",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1018,
    name: "Maria Luiz",
    role: "Engenheiro",
    requests: {
      date: "02/06 - Segunda-feira",
      before: {
        total: "00:10:26",
        checkins: [
          {
            time: "06:35:29",
            manipulated: false,
          },
          {
            time: "01:38:00",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "00:28:29",
            manipulated: false,
          },
          {
            time: "03:34:16",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "07:49:34",
        checkins: [
          {
            time: "01:37:18",
            manipulated: true,
          },
          {
            time: "06:37:50",
            manipulated: true,
          },
          {
            time: "01:35:37",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "03:31:39",
            manipulated: true,
          },
          {
            time: "02:35:00",
            manipulated: true,
          },
          {
            time: "00:28:15",
            manipulated: true,
          },
        ],
      },
    },
  },
  {
    userId: 1019,
    name: "Lucas Luiz",
    role: "Veterinário",
    requests: {
      date: "02/06 - Terça-feira",
      before: {
        total: "01:19:12",
        checkins: [
          {
            time: "02:04:42",
            manipulated: false,
          },
          {
            time: "04:19:25",
            manipulated: false,
          },
        ],
        checkouts: [
          {
            time: "04:59:33",
            manipulated: false,
          },
          {
            time: "01:07:32",
            manipulated: false,
          },
        ],
      },
      after: {
        total: "06:40:48",
        checkins: [
          {
            time: "05:54:14",
            manipulated: true,
          },
          {
            time: "03:50:17",
            manipulated: true,
          },
          {
            time: "02:49:29",
            manipulated: true,
          },
        ],
        checkouts: [
          {
            time: "07:30:58",
            manipulated: true,
          },
          {
            time: "05:36:16",
            manipulated: true,
          },
          {
            time: "02:58:04",
            manipulated: true,
          },
        ],
      },
    },
  },
];

// const nodes = [
//   {
//     id: 1000,
//     name: "Ana Maria Martins Rocha",
//     currentBalance: "+22h 53min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         userId: 1000,
//         date: "02/06 (Sexta)",
//         dateBalance: "+5h 40min",
//       },
//       {
//         id: 2,
//         userId: 1000,
//         date: "01/06 (Quinta)",
//         dateBalance: "+21h 33min",
//       },
//       {
//         id: 3,
//         userId: 1000,
//         date: "31/05 (Quarta)",
//         dateBalance: "+23h 45min",
//       },
//       {
//         id: 4,
//         userId: 1000,
//         date: "30/05 (Terça)",
//         dateBalance: "+6h 48min",
//       },
//     ],
//   },
//   {
//     id: 1001,
//     name: "Felipe Cândido Pereira",
//     currentBalance: "+0h 52min",
//     totalRequests: 3,
//     requests: [
//       {
//         id: 1,
//         userId: 1001,
//         date: "2022-05-16T21:53:36.592Z",
//         dateBalance: "+5h 32min",
//       },
//       {
//         id: 2,
//         userId: 1001,
//         date: "2023-12-23T15:50:39.913Z",
//         dateBalance: "+14h 14min",
//       },
//       {
//         id: 3,
//         userId: 1001,
//         date: "2023-11-23T11:17:11.254Z",
//         dateBalance: "+8h 20min",
//       },
//       {
//         id: 4,
//         userId: 1001,
//         date: "2022-03-26T01:34:20.945Z",
//         dateBalance: "+22h 31min",
//       },
//     ],
//   },
//   {
//     id: 1002,
//     name: "Usuário 3",
//     currentBalance: "+10h 36min",
//     totalRequests: 9,
//     requests: [
//       {
//         id: 1,
//         date: "2022-04-02T01:18:06.849Z",
//         dateBalance: "+4h 31min",
//       },
//       {
//         id: 2,
//         date: "2022-09-22T09:38:17.764Z",
//         dateBalance: "+2h 2min",
//       },
//       {
//         id: 3,
//         date: "2022-04-11T14:25:46.940Z",
//         dateBalance: "+5h 26min",
//       },
//       {
//         id: 4,
//         date: "2022-10-09T12:16:59.995Z",
//         dateBalance: "+18h 49min",
//       },
//     ],
//   },
//   {
//     id: 1003,
//     name: "Usuário 4",
//     currentBalance: "+9h 24min",
//     totalRequests: 5,
//     requests: [
//       {
//         id: 1,
//         date: "2022-04-28T16:03:21.410Z",
//         dateBalance: "+15h 46min",
//       },
//       {
//         id: 2,
//         date: "2024-03-08T21:10:47.030Z",
//         dateBalance: "+22h 23min",
//       },
//       {
//         id: 3,
//         date: "2022-05-04T17:07:57.783Z",
//         dateBalance: "+13h 12min",
//       },
//       {
//         id: 4,
//         date: "2023-11-18T11:39:21.838Z",
//         dateBalance: "+19h 41min",
//       },
//     ],
//   },
//   {
//     id: 1004,
//     name: "Usuário 5",
//     currentBalance: "+0h 34min",
//     totalRequests: 8,
//     requests: [
//       {
//         id: 1,
//         date: "2022-08-05T15:22:45.570Z",
//         dateBalance: "+9h 48min",
//       },
//       {
//         id: 2,
//         date: "2022-09-12T06:13:11.512Z",
//         dateBalance: "+12h 2min",
//       },
//       {
//         id: 3,
//         date: "2022-01-30T09:43:07.511Z",
//         dateBalance: "+20h 34min",
//       },
//       {
//         id: 4,
//         date: "2023-01-15T23:12:09.606Z",
//         dateBalance: "+18h 35min",
//       },
//     ],
//   },
//   {
//     id: 1005,
//     name: "Usuário 6",
//     currentBalance: "+21h 36min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         date: "2023-12-10T18:25:30.742Z",
//         dateBalance: "+20h 39min",
//       },
//       {
//         id: 2,
//         date: "2022-10-09T12:43:44.333Z",
//         dateBalance: "+20h 2min",
//       },
//       {
//         id: 3,
//         date: "2022-10-29T20:50:20.787Z",
//         dateBalance: "+13h 13min",
//       },
//       {
//         id: 4,
//         date: "2023-11-02T08:25:09.553Z",
//         dateBalance: "+17h 0min",
//       },
//     ],
//   },
//   {
//     id: 1006,
//     name: "Usuário 7",
//     currentBalance: "+18h 10min",
//     totalRequests: 7,
//     requests: [
//       {
//         id: 1,
//         date: "2022-02-06T04:32:45.782Z",
//         dateBalance: "+13h 4min",
//       },
//       {
//         id: 2,
//         date: "2023-02-24T04:48:54.569Z",
//         dateBalance: "+6h 43min",
//       },
//       {
//         id: 3,
//         date: "2024-02-03T03:30:30.639Z",
//         dateBalance: "+8h 21min",
//       },
//       {
//         id: 4,
//         date: "2023-12-01T10:40:34.303Z",
//         dateBalance: "+1h 33min",
//       },
//     ],
//   },
//   {
//     id: 1007,
//     name: "Usuário 8",
//     currentBalance: "+17h 51min",
//     totalRequests: 5,
//     requests: [
//       {
//         id: 1,
//         date: "2023-11-04T03:35:30.615Z",
//         dateBalance: "+12h 51min",
//       },
//       {
//         id: 2,
//         date: "2022-12-18T15:13:00.379Z",
//         dateBalance: "+21h 25min",
//       },
//       {
//         id: 3,
//         date: "2024-02-19T19:26:49.841Z",
//         dateBalance: "+1h 49min",
//       },
//       {
//         id: 4,
//         date: "2023-12-02T16:07:31.676Z",
//         dateBalance: "+11h 54min",
//       },
//     ],
//   },
//   {
//     id: 1008,
//     name: "Usuário 9",
//     currentBalance: "+23h 15min",
//     totalRequests: 1,
//     requests: [
//       {
//         id: 1,
//         date: "2022-10-06T12:26:25.332Z",
//         dateBalance: "+10h 21min",
//       },
//       {
//         id: 2,
//         date: "2023-02-14T22:38:14.685Z",
//         dateBalance: "+1h 5min",
//       },
//       {
//         id: 3,
//         date: "2022-03-26T05:46:03.520Z",
//         dateBalance: "+19h 40min",
//       },
//       {
//         id: 4,
//         date: "2023-04-01T13:57:34.755Z",
//         dateBalance: "+16h 1min",
//       },
//     ],
//   },
//   {
//     id: 1009,
//     name: "Usuário 10",
//     currentBalance: "+12h 52min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         date: "2022-09-15T14:06:00.149Z",
//         dateBalance: "+1h 0min",
//       },
//       {
//         id: 2,
//         date: "2024-03-22T16:02:31.131Z",
//         dateBalance: "+8h 34min",
//       },
//       {
//         id: 3,
//         date: "2022-06-12T07:56:43.867Z",
//         dateBalance: "+5h 37min",
//       },
//       {
//         id: 4,
//         date: "2023-04-19T14:47:32.568Z",
//         dateBalance: "+2h 43min",
//       },
//     ],
//   },
//   {
//     id: 1010,
//     name: "Usuário 11",
//     currentBalance: "+11h 25min",
//     totalRequests: 3,
//     requests: [
//       {
//         id: 1,
//         date: "2022-05-09T20:21:55.055Z",
//         dateBalance: "+9h 5min",
//       },
//       {
//         id: 2,
//         date: "2023-10-01T23:38:44.149Z",
//         dateBalance: "+8h 20min",
//       },
//       {
//         id: 3,
//         date: "2022-09-26T00:37:04.709Z",
//         dateBalance: "+7h 10min",
//       },
//       {
//         id: 4,
//         date: "2024-04-01T08:57:35.321Z",
//         dateBalance: "+17h 53min",
//       },
//     ],
//   },
//   {
//     id: 1011,
//     name: "Usuário 12",
//     currentBalance: "+14h 3min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         date: "2022-10-20T13:12:53.736Z",
//         dateBalance: "+3h 0min",
//       },
//       {
//         id: 2,
//         date: "2023-07-14T16:34:20.210Z",
//         dateBalance: "+17h 32min",
//       },
//       {
//         id: 3,
//         date: "2022-04-28T03:43:31.922Z",
//         dateBalance: "+16h 32min",
//       },
//       {
//         id: 4,
//         date: "2023-01-19T12:49:52.330Z",
//         dateBalance: "+6h 38min",
//       },
//     ],
//   },
//   {
//     id: 1012,
//     name: "Usuário 13",
//     currentBalance: "+9h 43min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         date: "2022-10-20T04:58:44.000Z",
//         dateBalance: "+23h 16min",
//       },
//       {
//         id: 2,
//         date: "2022-12-02T12:37:38.087Z",
//         dateBalance: "+3h 30min",
//       },
//       {
//         id: 3,
//         date: "2023-02-04T07:02:58.488Z",
//         dateBalance: "+4h 14min",
//       },
//       {
//         id: 4,
//         date: "2022-11-14T03:49:58.203Z",
//         dateBalance: "+8h 3min",
//       },
//     ],
//   },
//   {
//     id: 1013,
//     name: "Usuário 14",
//     currentBalance: "+15h 4min",
//     totalRequests: 2,
//     requests: [
//       {
//         id: 1,
//         date: "2023-04-03T23:21:19.524Z",
//         dateBalance: "+12h 6min",
//       },
//       {
//         id: 2,
//         date: "2022-02-05T19:49:38.413Z",
//         dateBalance: "+4h 24min",
//       },
//       {
//         id: 3,
//         date: "2022-09-13T03:56:01.164Z",
//         dateBalance: "+12h 30min",
//       },
//       {
//         id: 4,
//         date: "2022-12-13T20:45:44.915Z",
//         dateBalance: "+6h 38min",
//       },
//     ],
//   },
//   {
//     id: 1014,
//     name: "Usuário 15",
//     currentBalance: "+5h 14min",
//     totalRequests: 4,
//     requests: [
//       {
//         id: 1,
//         date: "2023-01-24T02:59:12.709Z",
//         dateBalance: "+4h 53min",
//       },
//       {
//         id: 2,
//         date: "2022-12-17T00:25:11.429Z",
//         dateBalance: "+23h 17min",
//       },
//       {
//         id: 3,
//         date: "2022-08-09T10:52:08.809Z",
//         dateBalance: "+5h 29min",
//       },
//       {
//         id: 4,
//         date: "2023-05-30T04:21:47.714Z",
//         dateBalance: "+19h 17min",
//       },
//     ],
//   },
//   {
//     id: 1015,
//     name: "Usuário 16",
//     currentBalance: "+3h 23min",
//     totalRequests: 1,
//     requests: [
//       {
//         id: 1,
//         date: "2022-12-06T00:32:08.977Z",
//         dateBalance: "+19h 14min",
//       },
//       {
//         id: 2,
//         date: "2023-05-10T18:06:45.553Z",
//         dateBalance: "+21h 3min",
//       },
//       {
//         id: 3,
//         date: "2022-08-29T11:50:36.006Z",
//         dateBalance: "+23h 13min",
//       },
//       {
//         id: 4,
//         date: "2024-02-03T23:29:57.142Z",
//         dateBalance: "+14h 12min",
//       },
//     ],
//   },
//   {
//     id: 1016,
//     name: "Usuário 17",
//     currentBalance: "+20h 16min",
//     totalRequests: 7,
//     requests: [
//       {
//         id: 1,
//         date: "2024-02-16T19:30:47.709Z",
//         dateBalance: "+13h 44min",
//       },
//       {
//         id: 2,
//         date: "2022-09-19T18:21:22.185Z",
//         dateBalance: "+23h 21min",
//       },
//       {
//         id: 3,
//         date: "2022-12-03T02:17:05.847Z",
//         dateBalance: "+6h 7min",
//       },
//       {
//         id: 4,
//         date: "2023-08-22T14:37:55.767Z",
//         dateBalance: "+6h 3min",
//       },
//     ],
//   },
//   {
//     id: 1017,
//     name: "Usuário 18",
//     currentBalance: "+5h 58min",
//     totalRequests: 5,
//     requests: [
//       {
//         id: 1,
//         date: "2024-02-09T17:54:01.965Z",
//         dateBalance: "+3h 41min",
//       },
//       {
//         id: 2,
//         date: "2022-12-20T08:11:48.544Z",
//         dateBalance: "+7h 41min",
//       },
//       {
//         id: 3,
//         date: "2023-07-08T16:22:00.210Z",
//         dateBalance: "+6h 55min",
//       },
//       {
//         id: 4,
//         date: "2023-11-03T01:46:04.604Z",
//         dateBalance: "+17h 31min",
//       },
//     ],
//   },
//   {
//     id: 1018,
//     name: "Usuário 19",
//     currentBalance: "+19h 17min",
//     totalRequests: 3,
//     requests: [
//       {
//         id: 1,
//         date: "2023-11-04T15:52:59.949Z",
//         dateBalance: "+4h 32min",
//       },
//       {
//         id: 2,
//         date: "2023-08-03T07:47:11.460Z",
//         dateBalance: "+14h 5min",
//       },
//       {
//         id: 3,
//         date: "2022-03-27T13:40:48.952Z",
//         dateBalance: "+8h 46min",
//       },
//       {
//         id: 4,
//         date: "2023-12-03T10:18:48.665Z",
//         dateBalance: "+2h 47min",
//       },
//     ],
//   },
//   {
//     id: 1019,
//     name: "Usuário 20",
//     currentBalance: "+4h 40min",
//     totalRequests: 6,
//     requests: [
//       {
//         id: 1,
//         date: "2022-10-21T14:30:06.744Z",
//         dateBalance: "+2h 7min",
//       },
//       {
//         id: 2,
//         date: "2023-05-12T21:32:12.038Z",
//         dateBalance: "+20h 6min",
//       },
//       {
//         id: 3,
//         date: "2022-12-18T18:36:24.817Z",
//         dateBalance: "+7h 2min",
//       },
//       {
//         id: 4,
//         date: "2023-11-14T09:07:27.295Z",
//         dateBalance: "+13h 29min",
//       },
//     ],
//   },
// ];

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

  server.get(
    "/time-sheet/pending/:id",
    (schema, request) => {
      const userId = +request.params.id;
      const user = nodes.find((item) => item.userId === userId);

      return new Response(200, {}, user);
    },
    { timing: 0 },
  );
}
