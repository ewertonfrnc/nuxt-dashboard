export default defineEventHandler((event) => {
  return {
    user: {
      id: 15,
      gender: "female",
      lastName: "Xavier",
      firstName: "Felipe",
      cnpj: "01.270.742/0001-08",
      email: "felipe.xavier@usemobile.com.br",
      companyName: "Usemobile Soluções em Tecnologia",
      image: "https://randomuser.me/api/portraits/women/39.jpg",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMTc3Mzg4NiwiZXhwIjoxNzExNzc3NDg2fQ.GNIAwEDvoFZ5AtotEr9fPvGP3NVrjPiJha5R03bbuGI",
    },
    status: "success",
  };
});
