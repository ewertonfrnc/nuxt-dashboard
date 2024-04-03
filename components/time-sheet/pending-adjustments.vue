<script lang="ts">
export default {
  data() {
    return {
      columns: [
        { field: "id", header: "Código", sortable: false, hasFilter: false },
        {
          field: "firstName",
          header: "Nome",
          sortable: true,
          hasFilter: true,
        },
        { field: "age", header: "Idade", sortable: false, hasFilter: true },
        {
          field: "birthDate",
          header: "Data de nascimento",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "email",
          header: "Email",
          sortable: false,
          hasFilter: false,
        },
      ],
      nodes: [
        {
          id: 1001,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=OD&height=120&width=120",
          firstName: "Orin",
          lastName: "Dach",
          email: "Orin.Dach@dummyapis.com",
          contactNumber: "4918291275",
          age: 77,
          dob: "17/05/1947",
          salary: 1,
          address: "Address1",
        },
        {
          id: 1002,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=DH&height=120&width=120",
          firstName: "Deshaun",
          lastName: "Hintz",
          email: "Deshaun.Hintz@dummyapis.com",
          contactNumber: "4495594837",
          age: 90,
          dob: "06/12/1934",
          salary: 2,
          address: "Address2",
        },
        {
          id: 1003,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=EJ&height=120&width=120",
          firstName: "Enola",
          lastName: "Jaskolski",
          email: "Enola.Jaskolski@dummyapis.com",
          contactNumber: "4897997688",
          age: 24,
          dob: "23/03/2000",
          salary: 3,
          address: "Address3",
        },
        {
          id: 1004,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=CE&height=120&width=120",
          firstName: "Carissa",
          lastName: "Erdman",
          email: "Carissa.Erdman@dummyapis.com",
          contactNumber: "4086198847",
          age: 37,
          dob: "05/12/1987",
          salary: 4,
          address: "Address4",
        },
        {
          id: 1005,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=SL&height=120&width=120",
          firstName: "Samanta",
          lastName: "Langosh",
          email: "Samanta.Langosh@dummyapis.com",
          contactNumber: "4940397419",
          age: 87,
          dob: "11/06/1937",
          salary: 5,
          address: "Address5",
        },
        {
          id: 1006,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=BM&height=120&width=120",
          firstName: "Beau",
          lastName: "Mertz",
          email: "Beau.Mertz@dummyapis.com",
          contactNumber: "4788997904",
          age: 63,
          dob: "25/09/1961",
          salary: 6,
          address: "Address6",
        },
        {
          id: 1007,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=AG&height=120&width=120",
          firstName: "Aimee",
          lastName: "Gutmann",
          email: "Aimee.Gutmann@dummyapis.com",
          contactNumber: "4857693552",
          age: 26,
          dob: "04/07/1998",
          salary: 7,
          address: "Address7",
        },
        {
          id: 1008,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=LG&height=120&width=120",
          firstName: "Leilani",
          lastName: "Gerlach",
          email: "Leilani.Gerlach@dummyapis.com",
          contactNumber: "4741091712",
          age: 67,
          dob: "20/08/1957",
          salary: 8,
          address: "Address8",
        },
        {
          id: 1009,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=PH&height=120&width=120",
          firstName: "Patsy",
          lastName: "Hand",
          email: "Patsy.Hand@dummyapis.com",
          contactNumber: "4210191522",
          age: 48,
          dob: "09/11/1976",
          salary: 9,
          address: "Address9",
        },
        {
          id: 1010,
          imageUrl:
            "https://hub.dummyapis.com/Image?text=MD&height=120&width=120",
          firstName: "Myrna",
          lastName: "Dach",
          email: "Myrna.Dach@dummyapis.com",
          contactNumber: "4743095947",
          age: 52,
          dob: "10/11/1972",
          salary: 10,
          address: "Address10",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Ajustes pendentes</h2>

    <BaseTable :columns="columns" :nodes="nodes" header-shown is-expandable />
  </div>
</template>

<style scoped lang="scss"></style>
