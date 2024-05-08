<template>
  <VeeForm
    v-slot="{ values }"
    :initial-values="userInfo"
    class="container fadein animation-duration-500"
    as="section"
  >
    <div class="container__header">
      <h2 class="heading__secondary">Dados principais</h2>
      <div class="container__header--btns">
        <BaseButton
          v-if="!isEditing"
          class="btn__primary"
          icon="pi pi-pencil"
          label="Editar"
          @click="isEditing = true"
        />

        <BaseButton
          v-if="isEditing"
          class="btn__danger--outlined"
          icon="pi pi-times"
          label="Cancelar"
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          @click.prevent="handleSubmit(values)"
        />
      </div>
    </div>

    <form class="form" @change="handleChange">
      <div class="form__container">
        <div class="form__control">
          <label class="form__label caption__primary">
            Nome completo ou social

            <BaseInputText
              name="fullname"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <transition>
          <div v-if="isEditing" class="form__control form__control--checkbox">
            <BaseCheckbox
              input-id="preferredName"
              :checked="usePreferredName"
              @checkbox-value="handleCheckbox"
            />
            <label class="form__label" for="preferredName">
              Utilizar nome social
            </label>
          </div>
        </transition>

        <div class="form__control">
          <label class="form__label caption__primary">
            Apelido

            <BaseInputText
              name="nickname"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            CPF

            <BaseInputMask
              name="cpf"
              mask="999.999.999-99"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            RG

            <BaseInputMask
              name="rg"
              mask="99.999.999-9"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Data de nascimento

            <BaseInputMask
              name="birthDate"
              mask="99/99/9999"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Cidade natal

            <BaseInputText
              name="birthCity"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Etnia

            <BaseDropdown
              name="ethnicity"
              :readonly="!isEditing"
              :options="ethnicityOptions"
            />
          </label>
        </div>
      </div>

      <div class="form__additional">
        <div class="form__control form__control--highlight">
          <label class="form__label caption__primary">
            Visualização

            <BaseDropdown
              name="role"
              :readonly="!isEditing"
              :options="visualizeOptions"
            />
          </label>
        </div>

        <div v-if="isEditing" class="fadein animation-duration-500">
          <BaseUpload @on-upload="handleUpload" />
        </div>

        <div v-else class="fadein animation-duration-500">
          <figure class="form__figure">
            <img
              :src="userInfo.profileImg"
              :alt="`Foto de perfil de ${userInfo.name}`"
            />

            <figcaption class="body__primary">Foto de perfil</figcaption>
          </figure>
        </div>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { checkEqualObjs } from "~/utils/validators";

export default {
  data() {
    return {
      loading: false,
      isEditing: false,
      hasChanges: false,
      usePreferredName: false,
      wrongCrendentialsMessage: "",
      visualizeOptions: ["Administrador", "Colaborador"],
      ethnicityOptions: [
        "Amarelos",
        "Branco(a)",
        "Indígenas",
        "Negros",
        "Pardos",
      ],
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    userInfo() {
      return this.employee.personalData;
    },
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeData"]),
    handleCheckbox(value: boolean) {
      this.usePreferredName = value;
    },
    handleUpload() {
      this.employee.personalData.profileImg =
        "https://images.unsplash.com/photo-1487573884658-a5d3c667584e?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    },
    cancelEditing() {
      this.isEditing = false;
      this.wrongCrendentialsMessage = "";
    },
    async handleSubmit(values) {
      this.hasChanges = !checkEqualObjs(values, this.employee.personalData);

      if (this.hasChanges) {
        this.loading = true;
        this.wrongCrendentialsMessage = "";

        try {
          await this.updateEmployeeData(String(this.employee.id), values);
          this.isEditing = false;

          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: "Ação realizada com sucesso.",
            life: 4000,
          });
        } catch (error) {
          this.$toast.add({
            severity: "error",
            summary: "Ocorreu um erro!",
            detail: "Ocorreu um erro de processamento, tente novamente.",
            life: 4000,
          });
        } finally {
          this.loading = false;
        }
      } else {
        this.wrongCrendentialsMessage = "Preencha o campo para prosseguir";
      }
    },
    handleChange() {
      this.hasChanges = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &--btns {
      display: flex;
      gap: 8px;

      button {
        width: max-content;
      }
    }
  }
}

.form {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  &__additional {
    margin-top: 24px;
    display: grid;
    gap: 24px;
  }

  &__figure {
    width: 100%;
    display: flex;
    gap: 24px;

    img {
      border-radius: 8px;
      overflow: hidden;
      width: 130px;
      height: 92px;
    }

    figcaption {
      align-self: center;
    }
  }

  &__control {
    &--checkbox {
      display: flex;
      align-items: center;
      gap: 8px;

      label {
        color: map-get($color-scheme-light, "$color-neutral-neutral-2");
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    &--highlight {
      width: 359px;
      padding: 10px;
      border: 1px solid #6e57f5;
      border-radius: 8px;
    }
  }
}
</style>
