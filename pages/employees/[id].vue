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

        <BaseButton
          class="btn__primary"
          icon="pi pi-ellipsis-v"
          label="Opções"
          @click="toggle"
        />
        <Menu
          ref="menu"
          :model="menuItems"
          :popup="true"
          :pt="{
            menu: 'options',
          }"
        >
          <template #item="{ item }">
            <div class="options__item">
              <i :class="item.icon" />
              <span class="body__primary" v-text="item.label" />
            </div>
          </template>
        </Menu>
      </section>

      <section class="info">
        <UiActivityIndicator v-if="loading" size="medium" />

        <template v-else>
          <img
            class="info__img"
            :src="employee.photo"
            :alt="`Foto de perfil de ${employee.name}`"
          />

          <div class="info__name">
            <h4 class="heading__quaternary">{{ employee.name }}</h4>
            <h5 class="heading__quinary">{{ employee.role }}</h5>
          </div>
        </template>
      </section>

      <section>
        <BaseTabMenu :items="items" />
      </section>
    </div>

    <BaseDialog
      confirm-dialog
      confirm-icon="pi-envelope"
      :is-visible="isVisible"
      :toggle-dialog="toggleVisibility"
      title="Alterar senha"
    >
      <div>
        <p class="body__secondary">
          Deseja enviar um e-mail de recuperação de senha para
          ana****@gmail.com?
        </p>
      </div>

      <template #footer>
        <BaseDialogFooter
          :loading="loading"
          confirm-icon="pi pi-check"
          confirmlabel="Confirmar"
          message="Selecione uma ação para prosseguir"
          @click-handler="footerActionHandler"
        />
      </template>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";

import EmployeeClocks from "~/components/employee/employee-clocks.vue";
import EmployeeData from "~/components/employee/employee-data.vue";
import EmployeeContacts from "~/components/employee/employee-contact.vue";
import EmployeeWorkInfo from "~/components/employee/employee-work-info.vue";
import EmployeeDocuments from "~/components/employee/employee-documents.vue";
import EmployeeSchools from "~/components/employee/employee-schools.vue";

export default {
  setup() {
    const { getToast } = usePVToast();
    const { isVisible, toggleVisibility } = useToggle();
    return { getToast, isVisible, toggleVisibility };
  },
  data() {
    return {
      loading: false,
      showErrorMessage: false,
      menuItems: [
        {
          label: "Alterar senha",
          icon: "pi pi-lock",
          command: () => {
            this.toggleVisibility();
          },
        },
        {
          label: "Desativar colaborador",
          icon: "pi pi-user-minus",
          command: () => {
            console.log("desativar colaborador");
          },
        },
      ],
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
          component: EmployeeWorkInfo,
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
    ...mapActions(useEmployeeStore, [
      "getEmployeeData",
      "sendRecoverPasswordEmail",
    ]),
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.changePasswordHandler();
      else this.toggleVisibility();
    },
    async getEmployee() {
      this.loading = true;
      try {
        await this.getEmployeeData(String(this.$route.params.id));
        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
    async changePasswordHandler() {
      this.loading = true;
      try {
        await this.sendRecoverPasswordEmail(String(this.$route.params.id));
        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
        this.toggleVisibility();
      }
    },
    goBack() {
      this.$router.back();
    },
    toggle(event: Event) {
      this.$refs.menu.toggle(event);
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
  height: 6.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin: 23px 0 23px 10px;

  &__img {
    width: 64px;
    height: 64px;
    border-radius: 72px;
    object-fit: cover;
  }

  &__name h5 {
    color: map-get($color-scheme-light, "$color-neutral-neutral-2");
  }
}

.options {
  background-color: red;
}
</style>
