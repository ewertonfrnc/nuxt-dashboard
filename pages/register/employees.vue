<template>
  <BaseCard>
    <h1 class="heading__secondary">Cadastro de colaboradores</h1>

    <div class="register">
      <div class="register__option">
        <p class="subtitle__primary">Cadastrar um colaborador</p>
        <p class="body__primary">
          Cadastre as informações principais de um colaborador manualmente.
        </p>

        <div>
          <BaseButton
            icon="pi pi-user"
            label="Cadastrar"
            class="btn__primary"
            @click="toggleAddOneDialog"
          />
        </div>
      </div>

      <div class="register__option">
        <p class="subtitle__primary">Cadastrar vários colaboradores</p>
        <p class="body__primary">
          Cadastre as informações principais de um ou mais colaboradores subindo
          um arquivo .csv para a plataforma.
        </p>

        <div>
          <BaseButton
            icon="pi pi-users"
            label="Cadastrar"
            class="btn__primary"
            @click="toggleAddBatchVisibility"
          />

          <BaseButton
            icon="pi pi-file"
            label="Baixar modelo"
            class="btn__primary--text"
          />
        </div>
      </div>
    </div>

    <BaseDialog
      :is-visible="isAddbatchVisible"
      :toggle-dialog="toggleAddBatchVisibility"
      confirm-dialog
      confirm-icon="pi-users"
      title="Cadastrar por arquivo"
    >
      <p class="body__secondary">
        Suba o arquivo em formato .csv de acordo com o modelo para cadastrar
        vários colaboradores
      </p>

      <template #footer>
        <div class="footer-buttons">
          <BaseButton
            icon="pi pi-times"
            label="Cancelar"
            class="btn__primary--outlined"
            @click="toggleAddBatchVisibility"
          />

          <BaseButton
            icon="pi pi-upload"
            label="Carregar arquivo .csv"
            class="btn__primary"
            @click="($refs.input as HTMLInputElement).click()"
          />
          <input
            ref="input"
            type="file"
            name="file"
            accept=".csv"
            hidden
            @change="onSelect"
          />
        </div>
      </template>
    </BaseDialog>

    <BaseDialog
      :is-visible="isAddOneDialogVisible"
      :toggle-dialog="toggleAddOneDialog"
      title="Adicionar colaborador no cadastro"
    >
      <RegisterAddEditForm
        :loading="loading"
        :toggle-dialog="toggleAddOneDialog"
        @submit="onSubmit"
      />
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { ParseResult, parse } from "papaparse";
import { mapActions, mapState } from "pinia";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";

export default {
  setup() {
    const { getToast } = usePVToast();

    const {
      isVisible: isAddOneDialogVisible,
      toggleVisibility: toggleAddOneDialog,
    } = useToggle();

    const {
      isVisible: isAddbatchVisible,
      toggleVisibility: toggleAddBatchVisibility,
    } = useToggle();

    return {
      isAddbatchVisible,
      toggleAddBatchVisibility,
      isAddOneDialogVisible,
      toggleAddOneDialog,
      getToast,
    };
  },
  data() {
    return {
      loading: false,
      parsedCsv: [] as RegisterEmployee[],
    };
  },
  computed: {
    ...mapState(useRegisterEmployeesStore, ["csvData"]),
  },
  methods: {
    ...mapActions(useRegisterEmployeesStore, [
      "updateCsvData",
      "saveEmployeesBatch",
    ]),
    onSelect(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (file && file.type === "text/csv") {
        this.loading = true;
        parse(file, {
          complete: (results: ParseResult<string[]>) => {
            this.parsedCsv = results.data
              .splice(1)
              .map((result: string[], index: number) => ({
                id: index + 1,
                name: result[0] || "",
                email: result[1] || "",
                cpf: result[2] || "",
                phone: result[3] || "",
                department: result[4] || "",
                role: result[5] || "",
                workType: result[6] || "",
                workRegime: result[7] || "",
                missingField: false,
              }));

            this.loading = true;
            this.updateCsvData(this.parsedCsv);
            this.$router.push("/register/many-employees");
          },
        });
      }
    },
    onSubmit(values: RegisterEmployee) {
      const batch: RegisterEmployee[] = [values];

      this.loading = true;
      setTimeout(() => {
        this.saveEmployeesBatch(batch)
          .then(() => this.getToast("success"))
          .catch(() => this.getToast("error"));

        this.loading = false;
        this.toggleAddOneDialog();
      }, 2000);
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px 0;

  @include respond(phone) {
    display: flex;
    flex-direction: column;
  }

  &__option {
    height: 282px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    & > div {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      button {
        width: max-content;
      }
    }

    &:last-child {
      border-left: $border-light;
      padding-left: 24px;

      @include respond(phone) {
        border-left: none;
        padding-left: 0;
      }
    }
  }
}

.footer-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;

  button {
    width: max-content;
  }
}
</style>
