<template>
  <VeeForm
    class="form-container fadein animation-duration-500"
    :initial-values="initialValues"
    :validation-schema="formSchema"
    @submit="handleSubmit"
  >
    <div class="form-container__header">
      <h2 class="heading__secondary">Contatos</h2>

      <div class="form-container__header--btns">
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
          :disabled="loading"
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          :loading="loading"
        />
      </div>
    </div>

    <div
      :class="[
        'form__view fadein animation-duration-500',
        isEditing && 'hidden',
      ]"
    >
      <div class="form__control">
        <BaseFormInputText label="E-mail" name="email" :readonly="!isEditing" />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="Telefone"
          name="phone"
          mask="(99) 99999-9999"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="CEP"
          name="cep"
          mask="99999-999"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Estado"
          name="state"
          :readonly="!isEditing"
          :disabled="isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Cidade"
          name="city"
          :readonly="!isEditing"
          :disabled="isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Logradouro"
          name="street"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="URL para linkedin"
          name="linkedinUrl"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Número de emergência"
          name="emergencyNumber"
          mask="(99) 99999-9999"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="  Quem é o contato de emergência"
          name="emergencyContact"
          :readonly="!isEditing"
        />
      </div>
    </div>

    <div
      :class="[
        'form__editing fadein animation-duration-500',
        !isEditing && 'hidden',
      ]"
    >
      <div class="form__email-phone">
        <div class="form__control">
          <BaseFormInputText
            label="E-mail"
            name="email"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputMask
            label="Telefone"
            name="phone"
            mask="(99) 99999-9999"
            :readonly="!isEditing"
          />
        </div>
      </div>

      <div class="form__search">
        <div :class="['form__control', !isSearchable && 'form__disabled']">
          <BaseFormInputMask
            label="CEP"
            name="cep"
            mask="99999-999"
            right-icon="pi pi-search"
            :disabled="isEditing && !isSearchable"
            :readonly="!isEditing"
            @right-icon-click="toggleSearch"
            @handle-change="searchAddres"
          />
        </div>
      </div>

      <div class="form__state-city">
        <div class="form__control form__disabled">
          <BaseFormInputText
            label="Estado"
            name="state"
            :readonly="!isEditing"
            :disabled="isEditing"
          />
        </div>

        <div class="form__control form__disabled">
          <BaseFormInputText
            label="Cidade"
            name="city"
            :readonly="!isEditing"
            :disabled="isEditing"
          />
        </div>
      </div>

      <div class="form__address">
        <div class="form__control">
          <BaseFormInputText
            label="Bairro"
            name="neighborhood"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Logradouro"
            name="street"
            :readonly="!isEditing"
          />
        </div>

        <div v-if="isEditing" class="form__control">
          <BaseFormInputText
            label="Número"
            name="houseNumber"
            :readonly="!isEditing"
          />
        </div>
      </div>

      <div v-if="isEditing" class="form__control">
        <BaseFormInputText
          label="Complemento"
          name="additionalAddressDetails"
          :readonly="!isEditing"
        />
        <small class="caption__secondary">Opcional</small>
      </div>

      <div class="form__additional">
        <div class="form__control">
          <BaseFormInputText
            label="URL para linkedin"
            name="linkedinUrl"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label=" Número de emergência"
            name="emergencyNumber"
            mask="(99) 99999-9999"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Quem é o contato de emergência"
            name="emergencyContact"
            :readonly="!isEditing"
          />
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { GenericObject } from "vee-validate";
import { EmployeeContact } from "~/interfaces/employee/employee.interface";
import { cepRegex } from "~/utils/schemas/regex";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      isSearchable: false,

      initialValues: {} as EmployeeContact,
      formSchema: {
        email: "required|email|min:10|max:50",
        phone: "required|phone|min:15",
        emergencyNumber: "phone",
        emergencyContact: "required|min:2|max:100",
        additionalAddressDetails: "max:128",
      },
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  created() {
    this.initialValues = this.employee.contact;
  },
  methods: {
    ...mapActions(useEmployeeStore, [
      "searchEmployeeAddres",
      "updateEmployeeContact",
    ]),
    toggleSearch() {
      this.isSearchable = !this.isSearchable;
    },
    cancelEditing() {
      this.isEditing = false;
      this.isSearchable = false;
    },
    searchAddres(cep: string) {
      if (!cepRegex.test(cep)) return;

      this.searchEmployeeAddres(cep)
        .then((newAddres) => {
          this.initialValues = newAddres;
        })
        .catch(() => this.getToast("error"));
    },
    handleSubmit(values: GenericObject) {
      const formData = { ...values } as EmployeeContact;

      this.loading = true;

      setTimeout(() => {
        this.updateEmployeeContact(String(this.employee.id), formData)
          .then(() => {
            this.isEditing = false;
            this.getToast("success");
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 24px;
  }

  &__label {
    transition: all 0.3s;
    &--disabled {
      color: map-get($color-scheme-light, "$color-neutral-neutral-4");
    }
  }

  &__control {
    width: 343px;
    height: 100%;
    margin-top: 24px;

    @include respond(phone) {
      width: 100%;
      margin-top: 12px;
    }
  }

  &__disabled {
    color: map-get($color-scheme-light, "$color-neutral-neutral-4");
  }

  &__email-phone,
  &__state-city,
  &__address,
  &__additional {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    @include respond(phone) {
      width: 100%;
      gap: 12px;
    }
  }

  &__search {
    height: 90px;
    display: flex;
    align-items: center;
    gap: 24px;

    &--btn {
      padding-top: 10px;
    }

    button {
      width: max-content;
    }

    @include respond(phone) {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 100%;

      &--btn {
        width: 100%;
        padding: 0;
      }

      button {
        width: 100%;
      }
    }
  }
}
</style>
