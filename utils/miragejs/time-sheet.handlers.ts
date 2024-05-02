import { Response, Server } from "miragejs";

const employeeClocks = [
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
  {
    id: 1000,
    hour: "12:23:30",
    name: "Ana Maria Carla",
    tag: "check-out",
    department: "Design",
  },
  {
    id: 1001,
    hour: "12:22:30",
    name: "Jorge Felipe Araújo",
    tag: "check-in",
    department: "Marketing",
  },
];

const nodes = [
  {
    userId: 999,
    name: "Ana Maria Carla",
    role: "Nutricionista",
    currentBalance: "+ 16h 09min",
    negative: false,
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
    userId: 999,
    name: "Ana Maria Carla",
    role: "Nutricionista",
    currentBalance: "+ 16h 09min",
    negative: false,
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
    userId: 999,
    name: "Ana Maria Carla",
    role: "Nutricionista",
    currentBalance: "+ 16h 09min",
    negative: false,
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
    userId: 999,
    name: "Ana Maria Carla",
    role: "Nutricionista",
    currentBalance: "+ 16h 09min",
    negative: false,
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
];

function paginate(array, page: string, limit: string) {
  const initialIdx = (+page - 1) * +limit;
  const finalIdx = initialIdx + +limit;
  return array.slice(initialIdx, finalIdx);
}

export default function (server: Server) {
  server.get("/time-sheet/pending", (schema, request) => {
    const { page, limit } = request.queryParams;
    const results = paginate(nodes, page, limit);

    return new Response(
      200,
      {},
      {
        status: "success",
        total: nodes.length,
        pending: results,
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

  server.put("/time-sheet/pending/:id", () => {
    return new Response(200, {}, { message: "deu bom" });
  });

  server.get("/time-sheet/clocks", (schema, request) => {
    const { page, limit } = request.queryParams;
    const results = paginate(employeeClocks, page, limit);

    return new Response(
      200,
      {},
      {
        status: "success",
        results,
        total: employeeClocks.length,
      },
    );
  });
}
