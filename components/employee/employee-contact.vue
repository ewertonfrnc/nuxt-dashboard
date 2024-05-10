<template>
  <VeeForm
    v-slot="{ values, errors }"
    :initial-values="contactInfo"
    :validation-schema="formSchema"
    class="form-container fadein animation-duration-500"
    as="section"
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
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          @click.prevent="handleSubmit(values, errors)"
        />
      </div>
    </div>

    <form class="form" @change="handleChange(values, errors)">
      <div
        :class="[
          'form__view fadein animation-duration-500',
          isEditing && 'hidden',
        ]"
      >
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
              mask="(99) 99999-9999"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            CEP

            <BaseInputMask
              name="cep"
              mask="99999-999"
              :right-icon="isSearchable ? 'pi pi-search' : 'pi pi-pencil'"
              :disabled="isEditing && !isSearchable"
              :readonly="!isEditing"
              @right-icon-click="toggleSearch"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Estado

            <BaseInputText
              name="state"
              :readonly="!isEditing"
              :disabled="isEditing"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Cidade

            <BaseInputText
              name="city"
              :readonly="!isEditing"
              :disabled="isEditing"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Logradouro

            <BaseInputText name="street" :readonly="!isEditing" />
          </label>
        </div>

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
              mask="(99) 99999-9999"
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
      </div>

      <div
        :class="[
          'form__editing fadein animation-duration-500',
          !isEditing && 'hidden',
        ]"
      >
        <div class="form__email-phone">
          <div class="form__control">
            <label class="form__label caption__primary">
              E-mail

              <BaseInputText name="email" :readonly="!isEditing" />
            </label>
          </div>

          <div class="form__control">
            <label class="form__label caption__primary">
              Telefone

              <BaseInputMask
                name="phone"
                mask="(99) 99999-9999"
                :readonly="!isEditing"
                :wrong-crendentials-message="wrongCrendentialsMessage"
              />
            </label>
          </div>
        </div>

        <div class="form__search">
          <div class="form__control">
            <label
              :class="[
                'form__label caption__primary',
                isEditing && !isSearchable && 'form__label--disabled',
              ]"
            >
              CEP

              <BaseInputMask
                name="cep"
                mask="99999-999"
                :right-icon="isSearchable ? 'pi pi-search' : 'pi pi-pencil'"
                :disabled="isEditing && !isSearchable"
                :readonly="!isEditing"
                @right-icon-click="toggleSearch"
              />
            </label>
          </div>

          <div v-if="isEditing" class="form__search--btn">
            <BaseButton
              label="Buscar"
              class="btn__primary"
              :disabled="!isSearchable"
              @click="searchAddres(values)"
            />
          </div>
        </div>

        <div class="form__state-city">
          <div class="form__control">
            <label
              :class="[
                'form__label caption__primary',
                isEditing && 'form__label--disabled',
              ]"
            >
              Estado

              <BaseInputText
                name="state"
                :readonly="!isEditing"
                :disabled="isEditing"
              />
            </label>
          </div>

          <div class="form__control">
            <label
              :class="[
                'form__label caption__primary',
                isEditing && 'form__label--disabled',
              ]"
            >
              Cidade

              <BaseInputText
                name="city"
                :readonly="!isEditing"
                :disabled="isEditing"
              />
            </label>
          </div>
        </div>

        <div class="form__address">
          <div class="form__control">
            <label class="form__label caption__primary">
              Bairro

              <BaseInputText name="neighborhood" :readonly="!isEditing" />
            </label>
          </div>

          <div class="form__control">
            <label class="form__label caption__primary">
              Logradouro

              <BaseInputText name="street" :readonly="!isEditing" />
            </label>
          </div>

          <div v-if="isEditing" class="form__control">
            <label class="form__label caption__primary">
              Número

              <BaseInputText name="houseNumber" :readonly="!isEditing" />
            </label>
          </div>
        </div>

        <div v-if="isEditing" class="form__control">
          <label class="form__label caption__primary">
            Complemento

            <BaseInputText
              name="additionalAddressDetails"
              :readonly="!isEditing"
            />
          </label>
          <small class="caption__secondary">Opcional</small>
        </div>

        <div class="form__additional">
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
                mask="(99) 99999-9999"
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
        </div>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { EmployeeContact } from "~/interfaces/employee/employee.interface";
import { checkForErrors } from "~/utils/forms";
import { contactFormSchema } from "~/utils/schemas/employee/employee.schema";
import { checkEqualObjs } from "~/utils/validators";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      hasChanges: false,
      isEditing: false,
      validForm: false,
      isSearchable: false,
      wrongCrendentialsMessage: "",
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    contactInfo() {
      return this.employee.contact;
    },
    formSchema() {
      return contactFormSchema;
    },
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
    async handleSubmit(values: EmployeeContact) {
      if (!this.hasChanges) return this.cancelEditing();
      if (!this.validForm) return;

      this.loading = true;
      this.wrongCrendentialsMessage = "";

      try {
        await this.updateEmployeeContact(String(this.employee.id), values);
        this.isEditing = false;
        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
    handleChange(values: EmployeeContact, errors: Object) {
      this.hasChanges = !checkEqualObjs(values, this.employee.personalData);
      this.validForm = checkForErrors(errors);
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
