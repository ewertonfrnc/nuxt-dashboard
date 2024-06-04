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
            icon="pi pi-user"
            label="Cadastrar"
            class="btn__primary"
            @click="toggleVisibility"
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
      :is-visible="isVisible"
      :toggle-dialog="toggleVisibility"
      confirm-dialog
      confirm-icon="pi-users"
      title="Cadastrar por arquivo"
    >
      <p class="body__secondary">
        Suba o arquivo em formato .csv de acordo com o modelo para cadastrar
        vários colaboradores
      </p>

      <template #footer>
        <BaseDialogFooter
          :loading="false"
          primary-colors
          confirm-icon="pi pi-upload"
          confirmlabel="Carregar arquivo .csv"
          message="Selecione uma ação para prosseguir"
          @click-handler="footerActionHandler"
        />
        <FileUpload
          mode="basic"
          name="file"
          accept=".csv"
          :max-file-size="1000000"
          @select="onSelect"
        />
      </template>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import Papa, { ParseResult } from "papaparse";
import { mapActions, mapState } from "pinia";
import { FileUploadSelectEvent } from "primevue/fileupload";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";

export default {
  setup() {
    const { getToast } = usePVToast();
    const { isVisible, toggleVisibility } = useToggle();
    return { isVisible, toggleVisibility, getToast };
  },
  data() {
    return { parsedCsv: [] as RegisterEmployee[] };
  },
  computed: { ...mapState(useRegisterEmployeesStore, ["csvData"]) },
  methods: {
    ...mapActions(useRegisterEmployeesStore, ["updateCsvData"]),
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") () => {};
      else this.toggleVisibility();
    },
    onSelect(event: FileUploadSelectEvent) {
      const file = event.files[0];

      if (file && file.type === "text/csv") {
        Papa.parse(file, {
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

            this.updateCsvData(this.parsedCsv);
            this.$router.push("/register/many-employees");
          },
        });
      }
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
</style>
