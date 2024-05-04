export default defineEventHandler((event) => {
  return {
    total: 4,
    adjusts: [
      {
        id: 1,
        dateToAdjust: "02/06",
        requestDate: "01/02/1990",
        status: "Pendente",
        negative: false,
        requests: [
          {
            date: "02-06-2024",
            total: "08:00:00",
            negative: false,
            pendingFix: false,
            title: "02/06 - Terça-feira",
            motive: "Esquecimento",
            beforeTotal: {
              negative: true,
              total: "03:10:00",
            },
            afterTotal: {
              negative: false,
              total: "08:00:00",
            },
            beforeHours: [
              { in: "08:00:00", out: "12:00:00" },
              { in: "16:00:00", out: "16:10:00" },
            ],
            afterHours: [
              {
                in: "08:00:00",
                out: "12:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: true,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "03-06-2024",
            total: "07:45:00",
            negative: true,
            pendingFix: true,
            title: "03/06 - Quarta-feira",
            motive: "Atraso",
            beforeTotal: {
              negative: true,
              total: "04:00:00",
            },
            afterTotal: {
              negative: true,
              total: "05:45:00",
            },
            beforeHours: [
              { in: "07:45:00", out: "11:45:00" },
              { in: "13:00:00", out: "15:00:00" },
            ],
            afterHours: [
              {
                in: "07:45:00",
                out: "11:45:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "04-06-2024",
            total: "08:30:00",
            negative: false,
            pendingFix: false,
            title: "04/06 - Quinta-feira",
            motive: "Regularidade",
            beforeTotal: {
              negative: false,
              total: "08:30:00",
            },
            afterTotal: {
              negative: false,
              total: "08:30:00",
            },
            beforeHours: [
              { in: "08:30:00", out: "12:30:00" },
              { in: "13:30:00", out: "16:30:00" },
            ],
            afterHours: [
              {
                in: "08:30:00",
                out: "12:30:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "16:30:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
          {
            date: "05-06-2024",
            total: "07:00:00",
            negative: true,
            pendingFix: true,
            title: "05/06 - Sexta-feira",
            motive: "Falta",
            beforeTotal: {
              negative: true,
              total: "05:00:00",
            },
            afterTotal: {
              negative: true,
              total: "07:00:00",
            },
            beforeHours: [
              { in: "07:00:00", out: "11:00:00" },
              { in: "13:00:00", out: "14:30:00" },
            ],
            afterHours: [
              {
                in: "07:00:00",
                out: "11:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "14:30:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:00:00",
                out: "17:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "06-06-2024",
            total: "08:15:00",
            negative: false,
            pendingFix: false,
            title: "06/06 - Sábado",
            motive: "Trabalho Extra",
            beforeTotal: {
              negative: false,
              total: "08:15:00",
            },
            afterTotal: {
              negative: false,
              total: "08:15:00",
            },
            beforeHours: [
              { in: "08:15:00", out: "12:15:00" },
              { in: "13:30:00", out: "17:00:00" },
            ],
            afterHours: [
              {
                in: "08:15:00",
                out: "12:15:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "17:00:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        dateToAdjust: "01/06",
        requestDate: "03/04/1991",
        status: "Aprovado",
        negative: false,
        requests: [
          {
            date: "02-06-2024",
            total: "08:00:00",
            negative: false,
            pendingFix: false,
            title: "02/06 - Terça-feira",
            motive: "Esquecimento",
            beforeTotal: {
              negative: true,
              total: "03:10:00",
            },
            afterTotal: {
              negative: false,
              total: "08:00:00",
            },
            beforeHours: [
              { in: "08:00:00", out: "12:00:00" },
              { in: "16:00:00", out: "16:10:00" },
            ],
            afterHours: [
              {
                in: "08:00:00",
                out: "12:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: true,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "03-06-2024",
            total: "07:45:00",
            negative: true,
            pendingFix: true,
            title: "03/06 - Quarta-feira",
            motive: "Atraso",
            beforeTotal: {
              negative: true,
              total: "04:00:00",
            },
            afterTotal: {
              negative: true,
              total: "05:45:00",
            },
            beforeHours: [
              { in: "07:45:00", out: "11:45:00" },
              { in: "13:00:00", out: "15:00:00" },
            ],
            afterHours: [
              {
                in: "07:45:00",
                out: "11:45:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "04-06-2024",
            total: "08:30:00",
            negative: false,
            pendingFix: false,
            title: "04/06 - Quinta-feira",
            motive: "Regularidade",
            beforeTotal: {
              negative: false,
              total: "08:30:00",
            },
            afterTotal: {
              negative: false,
              total: "08:30:00",
            },
            beforeHours: [
              { in: "08:30:00", out: "12:30:00" },
              { in: "13:30:00", out: "16:30:00" },
            ],
            afterHours: [
              {
                in: "08:30:00",
                out: "12:30:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "16:30:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
          {
            date: "05-06-2024",
            total: "07:00:00",
            negative: true,
            pendingFix: true,
            title: "05/06 - Sexta-feira",
            motive: "Falta",
            beforeTotal: {
              negative: true,
              total: "05:00:00",
            },
            afterTotal: {
              negative: true,
              total: "07:00:00",
            },
            beforeHours: [
              { in: "07:00:00", out: "11:00:00" },
              { in: "13:00:00", out: "14:30:00" },
            ],
            afterHours: [
              {
                in: "07:00:00",
                out: "11:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "14:30:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:00:00",
                out: "17:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "06-06-2024",
            total: "08:15:00",
            negative: false,
            pendingFix: false,
            title: "06/06 - Sábado",
            motive: "Trabalho Extra",
            beforeTotal: {
              negative: false,
              total: "08:15:00",
            },
            afterTotal: {
              negative: false,
              total: "08:15:00",
            },
            beforeHours: [
              { in: "08:15:00", out: "12:15:00" },
              { in: "13:30:00", out: "17:00:00" },
            ],
            afterHours: [
              {
                in: "08:15:00",
                out: "12:15:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "17:00:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        dateToAdjust: "31/05",
        requestDate: "01/06/1992",
        status: "Aprovado",
        negative: false,
        requests: [
          {
            date: "02-06-2024",
            total: "08:00:00",
            negative: false,
            pendingFix: false,
            title: "02/06 - Terça-feira",
            motive: "Esquecimento",
            beforeTotal: {
              negative: true,
              total: "03:10:00",
            },
            afterTotal: {
              negative: false,
              total: "08:00:00",
            },
            beforeHours: [
              { in: "08:00:00", out: "12:00:00" },
              { in: "16:00:00", out: "16:10:00" },
            ],
            afterHours: [
              {
                in: "08:00:00",
                out: "12:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: true,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "03-06-2024",
            total: "07:45:00",
            negative: true,
            pendingFix: true,
            title: "03/06 - Quarta-feira",
            motive: "Atraso",
            beforeTotal: {
              negative: true,
              total: "04:00:00",
            },
            afterTotal: {
              negative: true,
              total: "05:45:00",
            },
            beforeHours: [
              { in: "07:45:00", out: "11:45:00" },
              { in: "13:00:00", out: "15:00:00" },
            ],
            afterHours: [
              {
                in: "07:45:00",
                out: "11:45:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "04-06-2024",
            total: "08:30:00",
            negative: false,
            pendingFix: false,
            title: "04/06 - Quinta-feira",
            motive: "Regularidade",
            beforeTotal: {
              negative: false,
              total: "08:30:00",
            },
            afterTotal: {
              negative: false,
              total: "08:30:00",
            },
            beforeHours: [
              { in: "08:30:00", out: "12:30:00" },
              { in: "13:30:00", out: "16:30:00" },
            ],
            afterHours: [
              {
                in: "08:30:00",
                out: "12:30:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "16:30:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
          {
            date: "05-06-2024",
            total: "07:00:00",
            negative: true,
            pendingFix: true,
            title: "05/06 - Sexta-feira",
            motive: "Falta",
            beforeTotal: {
              negative: true,
              total: "05:00:00",
            },
            afterTotal: {
              negative: true,
              total: "07:00:00",
            },
            beforeHours: [
              { in: "07:00:00", out: "11:00:00" },
              { in: "13:00:00", out: "14:30:00" },
            ],
            afterHours: [
              {
                in: "07:00:00",
                out: "11:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "14:30:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:00:00",
                out: "17:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "06-06-2024",
            total: "08:15:00",
            negative: false,
            pendingFix: false,
            title: "06/06 - Sábado",
            motive: "Trabalho Extra",
            beforeTotal: {
              negative: false,
              total: "08:15:00",
            },
            afterTotal: {
              negative: false,
              total: "08:15:00",
            },
            beforeHours: [
              { in: "08:15:00", out: "12:15:00" },
              { in: "13:30:00", out: "17:00:00" },
            ],
            afterHours: [
              {
                in: "08:15:00",
                out: "12:15:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "17:00:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
        ],
      },
      {
        id: 4,
        dateToAdjust: "30/06",
        requestDate: "21/08/1993",
        status: "Reprovado",
        negative: false,
        requests: [
          {
            date: "02-06-2024",
            total: "08:00:00",
            negative: false,
            pendingFix: false,
            title: "02/06 - Terça-feira",
            motive: "Esquecimento",
            beforeTotal: {
              negative: true,
              total: "03:10:00",
            },
            afterTotal: {
              negative: false,
              total: "08:00:00",
            },
            beforeHours: [
              { in: "08:00:00", out: "12:00:00" },
              { in: "16:00:00", out: "16:10:00" },
            ],
            afterHours: [
              {
                in: "08:00:00",
                out: "12:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: true,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "03-06-2024",
            total: "07:45:00",
            negative: true,
            pendingFix: true,
            title: "03/06 - Quarta-feira",
            motive: "Atraso",
            beforeTotal: {
              negative: true,
              total: "04:00:00",
            },
            afterTotal: {
              negative: true,
              total: "05:45:00",
            },
            beforeHours: [
              { in: "07:45:00", out: "11:45:00" },
              { in: "13:00:00", out: "15:00:00" },
            ],
            afterHours: [
              {
                in: "07:45:00",
                out: "11:45:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "15:00:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:30:00",
                out: "18:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "04-06-2024",
            total: "08:30:00",
            negative: false,
            pendingFix: false,
            title: "04/06 - Quinta-feira",
            motive: "Regularidade",
            beforeTotal: {
              negative: false,
              total: "08:30:00",
            },
            afterTotal: {
              negative: false,
              total: "08:30:00",
            },
            beforeHours: [
              { in: "08:30:00", out: "12:30:00" },
              { in: "13:30:00", out: "16:30:00" },
            ],
            afterHours: [
              {
                in: "08:30:00",
                out: "12:30:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "16:30:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
          {
            date: "05-06-2024",
            total: "07:00:00",
            negative: true,
            pendingFix: true,
            title: "05/06 - Sexta-feira",
            motive: "Falta",
            beforeTotal: {
              negative: true,
              total: "05:00:00",
            },
            afterTotal: {
              negative: true,
              total: "07:00:00",
            },
            beforeHours: [
              { in: "07:00:00", out: "11:00:00" },
              { in: "13:00:00", out: "14:30:00" },
            ],
            afterHours: [
              {
                in: "07:00:00",
                out: "11:00:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:00:00",
                out: "14:30:00",
                changedIn: false,
                changedOut: true,
              },
              {
                in: "15:00:00",
                out: "17:30:00",
                changedIn: true,
                changedOut: true,
              },
            ],
          },
          {
            date: "06-06-2024",
            total: "08:15:00",
            negative: false,
            pendingFix: false,
            title: "06/06 - Sábado",
            motive: "Trabalho Extra",
            beforeTotal: {
              negative: false,
              total: "08:15:00",
            },
            afterTotal: {
              negative: false,
              total: "08:15:00",
            },
            beforeHours: [
              { in: "08:15:00", out: "12:15:00" },
              { in: "13:30:00", out: "17:00:00" },
            ],
            afterHours: [
              {
                in: "08:15:00",
                out: "12:15:00",
                changedIn: false,
                changedOut: false,
              },
              {
                in: "13:30:00",
                out: "17:00:00",
                changedIn: false,
                changedOut: false,
              },
            ],
          },
        ],
      },
    ],
  };
});
