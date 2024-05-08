export const employeeMock = {
  getEmployeeData: {
    employee: {
      id: 1000,
      name: "Ana Maria Martins Rocha",
      role: "Nutricionista",
      photo:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      personalData: {
        fullname: "Ana Maria Martins Rocha",
        nickname: "Aninha",
        rg: "26.090.766-2",
        cpf: "075.799.026-64",
        role: "Administrador",
        birthDate: "05/06/1995",
        birthCity: "Conselheiro Lafaiete",
        ethnicity: "Branco(a)",
        profileImg:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
  },
  updateEmployeeData: {
    employee: {
      id: 1000,
      name: "Ana Maria Martins Rochas",
      role: "Nutricionista",
      photo:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      personalData: {
        fullname: "Ana Maria",
        nickname: "Aninha",
        rg: "26.090.766-2",
        cpf: "075.799.026-64",
        role: "Colaborador",
        birthDate: "05/06/1995",
        birthCity: "Conselheiro Lafaiete",
        ethnicity: "Negros",
        profileImg:
          "https://images.unsplash.com/photo-1487573884658-a5d3c667584e?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
  },
  getRegisteredClocks: {
    total: 10,
    clocks: [
      {
        date: "02/06",
        currentBalance: "+ 08h 09m",
        firstCheckIn: "09:50:30",
        lastCheckOut: "17:50:30",
        dayStatus: "Ajuste pendente",
        negative: false,
        requests: {
          id: 1,
          date: "02/06/2023",
          negative: false,
          currentBalance: "+ 08h 09m",
          hours: [
            { in: "08:30:00", out: "12:00:00" },
            { in: "13:00:00", out: "16:00:00" },
          ],
        },
      },
      {
        date: "04/06",
        currentBalance: "+ 07h 30m",
        firstCheckIn: "10:00:00",
        lastCheckOut: "17:30:00",
        dayStatus: "Em andamento",
        negative: true,
      },
      {
        date: "06/06",
        currentBalance: "+ 06h 45m",
        firstCheckIn: "09:15:00",
        lastCheckOut: "16:00:00",
        dayStatus: "Falta check-out",
        negative: true,
      },
      {
        date: "08/06",
        currentBalance: "+ 09h 00m",
        firstCheckIn: "09:00:00",
        lastCheckOut: "18:00:00",
        dayStatus: "Ponto fechado",
        negative: false,
      },
      {
        date: "10/06",
        currentBalance: "+ 08h 45m",
        firstCheckIn: "09:30:00",
        lastCheckOut: "18:15:00",
        dayStatus: "Em andamento",
        negative: false,
      },
      {
        date: "12/06",
        currentBalance: "+ 07h 15m",
        firstCheckIn: "10:15:00",
        lastCheckOut: "17:30:00",
        dayStatus: "Falta check-out",
        negative: true,
      },
      {
        date: "14/06",
        currentBalance: "+ 08h 30m",
        firstCheckIn: "09:45:00",
        lastCheckOut: "18:15:00",
        dayStatus: "Ponto fechado",
        negative: true,
      },
      {
        date: "16/06",
        currentBalance: "+ 09h 15m",
        firstCheckIn: "09:00:00",
        lastCheckOut: "18:15:00",
        dayStatus: "Ajuste pendente",
        negative: false,
      },
      {
        date: "18/06",
        currentBalance: "+ 08h 00m",
        firstCheckIn: "10:30:00",
        lastCheckOut: "18:30:00",
        dayStatus: "Em andamento",
        negative: true,
      },
      {
        date: "20/06",
        currentBalance: "+ 07h 45m",
        firstCheckIn: "09:15:00",
        lastCheckOut: "17:00:00",
        dayStatus: "Falta check-out",
        negative: false,
      },
    ],
  },
  getDatesToAdjust: {
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
  },
};
