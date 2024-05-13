export const timeTrackingMock = {
  getOpenClockClosing: {
    total: 7,
    clocks: [
      {
        id: "ITERA0000",
        period: "01/06/2023 - 30/06/2023",
        employeesCount: 32,
        status: "Em aberto",
      },
      {
        id: "ITERA0001",
        period: "10/06/2023 - 21/06/2023",
        employeesCount: 45,
        status: "Concluído",
      },
      {
        id: "ITERA0002",
        period: "12/06/2023 - 28/06/2023",
        employeesCount: 76,
        status: "Em aberto",
      },
      {
        id: "ITERA0003",
        period: "05/06/2023 - 30/06/2023",
        employeesCount: 18,
        status: "Concluído",
      },
      {
        id: "ITERA0004",
        period: "02/06/2023 - 26/06/2023",
        employeesCount: 89,
        status: "Cancelado",
      },
      {
        id: "ITERA0005",
        period: "06/06/2023 - 27/06/2023",
        employeesCount: 53,
        status: "Em aberto",
      },
      {
        id: "ITERA0006",
        period: "03/06/2023 - 24/06/2023",
        employeesCount: 61,
        status: "Concluído",
      },
    ],
  },
  getClockClosingDetails: {
    total: 4,
    pendingSignatureCount: 1,
    employees: [
      {
        id: 1,
        name: "Ana Maria Carla",
        role: "Analista de SEO",
        status: "Aguardando assinatura",
        pendingSignature: true,
        pdfUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      },
      {
        id: 3,
        name: "Carla Santos Pereira",
        role: "Analista de SEO",
        status: "Aguardando assinatura",
        pendingSignature: true,
        pdfUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      },
      {
        id: 2,
        name: "João Felipe Cardoso",
        role: "Analista de SEO",
        status: "Assinado",
        pendingSignature: false,
        pdfUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      },
    ],
  },
  requestSignature: { message: "success" },
  requestSignatureBatch: { message: "success" },
};
