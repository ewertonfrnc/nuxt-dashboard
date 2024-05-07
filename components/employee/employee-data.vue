<template>
  <VeeForm
    v-slot="{ values }"
    :initial-values="userInfo"
    class="container"
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
          @click="isEditing = false"
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

    <!--    <pre>userInfo: {{ userInfo }}</pre>-->
    <!--    <pre>values: {{ values }}</pre>-->

    <form class="form" @change="handleChange">
      <div class="form__control">
        <label class="form__label">
          Nome completo ou social

          <BaseInputText
            name="fullname"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <transition>
        <div v-if="isEditing" class="form__control">
          <label class="form__label">
            <BaseCheckbox
              :checked="usePreferredName"
              @checkbox-value="handleCheckbox"
            />
            Utilizar nome social
          </label>
        </div>
      </transition>

      <div class="form__control">
        <label class="form__label">
          Apelido

          <BaseInputText name="nickname" :readonly="!isEditing" />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label">
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
        <label class="form__label">
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
        <label class="form__label">
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
        <label class="form__label">
          Cidade natal

          <BaseInputText
            name="birthCity"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label">
          Etnia

          <BaseDropdown
            name="ethnicity"
            :readonly="!isEditing"
            :options="['Amarelos', 'Brancos', 'Indígenas', 'Negros', 'Pardos']"
          />
        </label>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { checkEqualObjs } from "~/utils/validators";

export default {
  data() {
    return {
      isEditing: false,
      hasChanges: false,
      usePreferredName: false,
      wrongCrendentialsMessage: "",
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    userInfo() {
      return this.employee.personalData;
    },
  },
  methods: {
    handleCheckbox(value: boolean) {
      this.usePreferredName = value;
    },
    handleSubmit(values) {
      this.hasChanges = !checkEqualObjs(values, this.employee.personalData);

      if (this.hasChanges) {
        this.wrongCrendentialsMessage = "";
      } else {
        this.wrongCrendentialsMessage = "Preencha o campo para prosseguir";
      }
    },
    handleChange() {
      console.log("changed");
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  &__control {
  }
}
</style>
