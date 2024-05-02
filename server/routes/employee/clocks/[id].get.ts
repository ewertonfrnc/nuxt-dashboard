export default defineEventHandler((event) => {
  return {
    total: 6,
    clocks: [
      {
        date: "02/06",
        currentBalance: "+ 8h 09m",
        firstCheckIn: "08:30:00",
        lastCheckOut: "16:10:00",
        dayStatus: "Ajuste pendente",
        negative: false,
        requests: {
          id: 1,
          negative: false,
          date: "02/06 - Sexta-feira",
          currentBalance: "+ 8h 09m",
          hours: [
            { in: "08:30:00", out: "12:00:00" },
            { in: "13:00:00", out: "16:10:00" },
          ],
        },
      },
      {
        date: "04/06",
        currentBalance: "- 07h 30m",
        firstCheckIn: "10:00:00",
        lastCheckOut: "17:30:00",
        dayStatus: "Em andamento",
        negative: true,
      },
      {
        date: "06/06",
        currentBalance: "- 06h 45m",
        firstCheckIn: "",
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
        currentBalance: "- 08h 45m",
        firstCheckIn: "09:30:00",
        lastCheckOut: "",
        dayStatus: "Em andamento",
        negative: true,
      },
      {
        date: "12/06",
        currentBalance: "+ 07h 15m",
        firstCheckIn: "10:15:00",
        lastCheckOut: "17:30:00",
        dayStatus: "Falta check-out",
        negative: false,
      },
    ],
  };
});
