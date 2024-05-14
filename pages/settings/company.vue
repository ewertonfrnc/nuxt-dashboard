<template>
  <BaseCard>
    <VeeForm
      v-slot="{ values, errors, meta }"
      :initial-values="companyInfo"
      :validation-schema="formSchema"
      as="div"
      class="form-container"
    >
      <!--      <pre>values: {{ values }}</pre>-->
      <!--      <pre>meta: {{ meta }}</pre>-->

      <div class="form-container__header">
        <h2 class="heading__secondary">Empresa</h2>

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
            :loading="loading"
            :disabled="!validForm"
            @click.prevent="handleSubmit(values, meta)"
          />
        </div>
      </div>

      <form class="form" @change="handleChange(values, errors)">
        <div class="'form__editing fadein animation-duration-500'">
          <div class="form__email-phone">
            <div class="form__control">
              <label class="form__label caption__primary">
                Nome da empresa

                <BaseInputText name="name" :readonly="!isEditing" />
              </label>
            </div>

            <div class="form__control">
              <label class="form__label caption__primary">
                Razão social

                <BaseInputText name="legalName" :readonly="!isEditing" />
              </label>
            </div>

            <div class="form__control">
              <label
                :class="[
                  'form__label caption__primary',
                  isEditing && 'form__label--disabled',
                ]"
              >
                CNPJ

                <BaseInputMask
                  name="cnpj"
                  mask="99.999.999/9999-99"
                  :disabled="isEditing"
                  :readonly="!isEditing"
                />
              </label>
            </div>
          </div>

          <div class="form__control">
            <label class="form__label caption__primary">
              Tamanho da empresa

              <BaseDropdown
                name="companySize"
                :readonly="!isEditing"
                :options="companySizeOptions"
                :wrong-crendentials-message="wrongCrendentialsMessage"
                @on-change="handleChange(values, meta.valid)"
              />
            </label>
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
                  right-icon="pi pi-search"
                  :disabled="isEditing && !isSearchable"
                  :readonly="!isEditing"
                  @right-icon-click="toggleSearch"
                />
              </label>
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

            <div class="form__control">
              <label class="form__label caption__primary">
                Número

                <BaseInputText name="houseNumber" :readonly="!isEditing" />
              </label>
            </div>
          </div>

          <div class="form__control">
            <label class="form__label caption__primary">
              Complemento

              <BaseInputText
                name="additionalAddressDetails"
                :readonly="!isEditing"
              />
            </label>
            <Transition>
              <small v-if="isEditing" class="caption__secondary"
                >Opcional</small
              >
            </Transition>
          </div>

          <div class="form__upload">
            <div
              v-if="isEditing"
              class="form__upload fadein animation-duration-500"
            >
              <span class="body__primary">Foto de perfil</span>
              <BaseUpload @on-upload="handleUpload" />
            </div>

            <div v-else class="fadein animation-duration-500">
              <figure class="form__figure">
                <figcaption class="subtitle__primary">
                  Logo da empresa
                </figcaption>

                <img
                  :src="companyInfo.companyLogo"
                  :alt="`Foto de perfil de ${companyInfo.name}`"
                />
              </figure>
            </div>
          </div>
        </div>
      </form>
    </VeeForm>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FormMeta, GenericObject } from "vee-validate";
import { CompanyInfo } from "~/interfaces/settings/company.interface";
import { useCompanyStore } from "~/stores/settings/company.store";
import { companyFormSchema } from "~/utils/schemas/settings/company.schema";
import { checkForErrors } from "~/utils/forms";

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
      validForm: true,
      isSearchable: false,
      wrongCrendentialsMessage: "",
      companySizeOptions: [
        "1 a 5 colaboradores",
        "6 a 10 colaboradores",
        "11 a 50 colaboradores",
        "51 a 250 colaboradores",
        "251 a 1000 colaboradores",
        "1.000 a 5.000 colaboradores",
        "5.000 a 10.000 colaboradores",
        "10.001 a 50.000 colaboradores",
        "50.001 a 100.000 colaboradores",
        "100.000+ colaboradores",
        "Não trabalho para uma empresa",
      ],
    };
  },
  computed: {
    ...mapState(useCompanyStore, ["company"]),
    companyInfo() {
      return this.company;
    },
    formSchema() {
      return companyFormSchema;
    },
  },
  created() {
    this.getCompanyInfo();
  },
  methods: {
    ...mapActions(useEmployeeStore, ["searchEmployeeAddres"]),
    ...mapActions(useCompanyStore, ["getCompanyInfo", "saveCompanyInfo"]),
    handleUpload() {},
    toggleSearch() {
      this.isSearchable = !this.isSearchable;
    },
    cancelEditing() {
      this.isEditing = false;
      this.isSearchable = false;
      this.wrongCrendentialsMessage = "";
    },
    searchAddres(values: CompanyInfo) {
      this.searchEmployeeAddres(values.cep)
        .then((result) => {
          Object.keys(this.company).forEach((item) => {
            if (!result[item]) return;
            this.company[item] = result[item];
          });
        })
        .catch(() => this.getToast("error"));
    },
    handleSubmit(values: CompanyInfo, meta: FormMeta<GenericObject>) {
      if (!meta.dirty) return this.cancelEditing();
      if (!this.validForm) return;

      this.loading = true;
      this.saveCompanyInfo(values)
        .then(() => this.getToast("success"))
        .catch(() => this.getToast("error"))
        .finally(() => (this.loading = false));
    },
    handleChange(values: CompanyInfo, errors: Object) {
      if (values.cep !== this.company.cep) this.searchAddres(values);
      this.validForm = !!checkForErrors(errors);
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

  &__upload {
    margin-top: 24px;
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
