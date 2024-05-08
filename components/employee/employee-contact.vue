<template>
  <VeeForm
    v-slot="{ values }"
    :initial-values="contactInfo"
    class="container fadein animation-duration-500"
    as="section"
  >
    <div class="container__header">
      <h2 class="heading__secondary">Contatos</h2>
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

    <form class="form form__editing" @change="handleChange">
      <div class="form__control">
        <label class="form__label caption__primary">
          E-mail

          <BaseInputText
            name="email"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Telefone

          <BaseInputMask
            name="phone"
            mask="(99) 9 9999-9999"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div
        :class="[
          'form__control form__control--search',
          isEditing && 'form__control--cep',
        ]"
      >
        <label class="form__label caption__primary">
          CEP

          <BaseInputMask
            name="cep"
            mask="99999-9999"
            right-icon="pi pi-search"
            :disabled="isEditing && !isSearchable"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
            @right-icon-click="toggleSearch"
          />
        </label>

        <Transition>
          <div v-if="isEditing">
            <BaseButton
              label="Buscar"
              class="btn__primary"
              :disabled="!isSearchable"
              @click="searchAddres(values)"
            />
          </div>
        </Transition>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Estado

          <BaseInputText
            name="state"
            :readonly="!isEditing"
            :disabled="isEditing && !isSearchable"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div :class="['form__control', isEditing && ' form__control--city']">
        <label class="form__label caption__primary">
          Cidade

          <BaseInputText
            name="city"
            :readonly="!isEditing"
            :disabled="isEditing && !isSearchable"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Logradouro

          <BaseInputText
            name="street"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <Transition>
        <div v-if="isEditing" class="form__control">
          <label class="form__label caption__primary">
            Número

            <BaseInputText
              name="houseNumber"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>
      </Transition>

      <Transition>
        <div
          v-if="isEditing"
          :class="['form__control ', isEditing && 'form__control--details']"
        >
          <label class="form__label caption__primary">
            Complemento

            <BaseInputText
              name="additionalAddressDetails"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
          <small class="caption__secondary">Opcional</small>
        </div>
      </Transition>

      <div class="form__control">
        <label class="form__label caption__primary">
          URL para linkedin

          <BaseInputText
            name="linkedinUrl"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Número de emergência

          <BaseInputMask
            name="emergencyNumber"
            mask="(99) 9 9999-9999"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Quem é o contato de emergência

          <BaseInputText
            name="emergencyContact"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { EmployeeContact } from "~/interfaces/employee/employee.interface";

export default {
  data() {
    return {
      hasChanges: false,
      isEditing: false,
      isSearchable: false,
      wrongCrendentialsMessage: "",
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    contactInfo() {
      return this.employee.contact;
    },
  },
  methods: {
    ...mapActions(useEmployeeStore, ["searchEmployeeAddres"]),
    toggleSearch() {
      this.isSearchable = !this.isSearchable;
    },
    cancelEditing() {
      this.isEditing = false;
      this.wrongCrendentialsMessage = "";
    },
    async searchAddres(values: EmployeeContact) {
      try {
        const newCep = await this.searchEmployeeAddres(values.cep);
        Object.keys(this.employee.contact).forEach((item) => {
          if (!newCep[item]) return;
          this.employee.contact[item] = newCep[item];
        });
      } catch (error) {}
    },
    handleSubmit(values: EmployeeContact) {
      console.log("handleSubmit", { ...values });
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  .form__control {
    &--cep {
      gap: 16px;
      grid-column: 1 / 4;

      display: flex;
      align-items: center;

      label {
        width: 345px;

        & + div {
          padding-top: 10px;
        }
      }
    }

    &--city {
      width: 345px;
      grid-column: 2/4;
    }

    &--details {
      width: 345px;
      grid-column: 1 / 4;
    }
  }
}
</style>
