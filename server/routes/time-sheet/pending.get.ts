export default defineEventHandler((event) => {
  return {
    total: 21,
    pending: [
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
    ],
  };
});
