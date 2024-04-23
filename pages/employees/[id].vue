<template>
  <BaseCard>
    <div class="container">
      <section class="header">
        <div class="header__navigation">
          <button type="button" class="btn__primary--text" @click="goBack">
            <i class="pi pi-arrow-left"></i>
          </button>
          <h2 class="heading__secondary">Perfil</h2>
        </div>

        <BaseButton class="btn__primary" label="Opções" />
      </section>

      <section class="info">
        <img
          class="info__img"
          :src="employee.photo"
          :alt="`Foto de perfil de ${employee.name}`"
        />

        <div class="info__name">
          <h4 class="heading__quaternary">{{ employee.name }}</h4>
          <h5 class="heading__quinary">{{ employee.role }}</h5>
        </div>
      </section>

      <section>
        <BaseTabMenu :items="items" />
      </section>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";

import EmployeeClocks from "~/components/employees/employee-clocks.vue";
import EmployeeData from "~/components/employees/employee-data.vue";
import EmployeeContacts from "~/components/employees/employee-contact.vue";
import EmployeeJobs from "~/components/employees/employee-jobs.vue";
import EmployeeDocuments from "~/components/employees/employee-documents.vue";
import EmployeeSchools from "~/components/employees/employee-schools.vue";

export default {
  data() {
    return {
      items: [
        {
          label: "Pontos",
          icon: "pi pi-circle",
          component: EmployeeClocks,
        },
        {
          label: "Dados principais",
          icon: "pi pi-users",
          component: EmployeeData,
        },
        {
          label: "Contatos",
          icon: "pi pi-phone",
          component: EmployeeContacts,
        },
        {
          label: "Dados profissionais",
          icon: "pi pi-building",
          component: EmployeeJobs,
        },
        {
          label: "Documentos",
          icon: "pi pi-id-card",
          component: EmployeeDocuments,
        },
        {
          label: "Formação acadêmica",
          icon: "pi pi-book",
          component: EmployeeSchools,
        },
      ],
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  async created() {
    await this.getEmployee();
  },
  methods: {
    ...mapActions(useEmployeeStore, ["getEmployeeData"]),
    async getEmployee() {
      try {
        await this.getEmployeeData(String(this.$route.params.id));
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado!",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  button {
    width: 12.4rem;
  }

  &__navigation {
    display: flex;
    align-items: center;
    margin-right: auto;

    button {
      width: 4.4rem;
      height: 4.4rem;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-family: inherit;
      cursor: pointer;
      margin-right: 1rem;
    }
  }
}

.info {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin: 23px 0 23px 10px;

  &__img {
    width: 64px;
    height: 64px;
    border-radius: 72px;
  }

  &__name h5 {
    color: map-get($color-scheme-light, "$color-neutral-neutral-2");
  }
}
</style>
