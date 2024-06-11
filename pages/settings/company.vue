<template>
  <BaseCard>
    <VeeForm
      class="form-container"
      :initial-values="inititalValues"
      :validation-schema="formSchema"
      @submit="handleSubmit"
    >
      <div class="form-container__header">
        <h2 class="heading__secondary">Empresa</h2>

        <div class="form-container__header--btns">
          <template v-if="!isEditing">
            <BaseButton
              class="btn__primary--outlined"
              icon="pi pi-building"
              label="Criar nova empresa"
            />
            <BaseButton
              class="btn__primary"
              icon="pi pi-pencil"
              label="Editar"
              @click="isEditing = true"
            />
          </template>

          <template v-else>
            <BaseButton
              class="btn__danger--outlined"
              icon="pi pi-times"
              label="Cancelar"
              @click="cancelEditing"
            />
            <BaseButton
              type="submit"
              class="btn__secondary"
              icon="pi pi-save"
              label="Salvar alterações"
              :loading="loading"
            />
          </template>
        </div>
      </div>

      <form class="form">
        <div class="'form__editing fadein animation-duration-500'">
          <div class="form__company-name">
            <div class="form__control">
              <BaseFormInputText
                label="Nome da empresa"
                name="name"
                :readonly="!isEditing"
              />
            </div>

            <div class="form__control">
              <BaseFormInputText
                label="Razão social"
                name="legalName"
                :readonly="!isEditing"
              />
            </div>

            <div :class="['form__control', isEditing && 'form__disabled']">
              <BaseFormInputMask
                label="CNPJ"
                name="cnpj"
                mask="99.999.999/9999-99"
                :disabled="isEditing"
                :readonly="!isEditing"
              />
            </div>
          </div>

          <div class="form__control">
            <BaseFormDropdown
              label="Tamanho da empresa"
              name="companySize"
              :readonly="!isEditing"
              :options="companySizeOptions"
            />
          </div>

          <div class="form__search">
            <div class="form__control">
              <div
                :class="[
                  'form__control',
                  !isSearchable && isEditing && 'form__disabled',
                ]"
              >
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
          </div>

          <div class="form__state-city">
            <div :class="['form__control', isEditing && 'form__disabled']">
              <BaseFormInputText
                label="Estado"
                name="state"
                :readonly="!isEditing"
                :disabled="isEditing"
              />
            </div>

            <div :class="['form__control', isEditing && 'form__disabled']">
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

          <div class="form__control">
            <BaseFormInputText
              label="Complemento"
              name="additionalAddressDetails"
              :readonly="!isEditing"
            />
            <Transition>
              <small v-if="isEditing" class="caption__secondary">
                Opcional
              </small>
            </Transition>
          </div>

          <div class="form__upload">
            <div
              v-if="isEditing"
              class="form__upload fadein animation-duration-500"
            >
              <span class="subtitle__primary">Logo da empresa</span>
              <BaseUpload @on-upload="handleUpload" />
            </div>

            <div v-else class="fadein animation-duration-500">
              <figure class="form__figure">
                <figcaption class="subtitle__primary">
                  Logo da empresa
                </figcaption>

                <img
                  :src="inititalValues.companyLogo"
                  :alt="`Foto de perfil de ${inititalValues.name}`"
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
import { GenericObject } from "vee-validate";
import { CompanyInfo } from "~/interfaces/settings/company.interface";
import { useCompanyStore } from "~/stores/settings/company.store";
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

      inititalValues: {} as CompanyInfo,
      formSchema: {
        name: "required|min:3|max:255",
        legalName: "required|min:3|max:255",
        street: "required|min:5|max:255",
        houseNumber: "required|min:3|max:255",
        additionalAddressDetails: "max:128",
      },
    };
  },
  computed: {
    ...mapState(useCompanyStore, ["company"]),
  },
  created() {
    this.getCompanyInfo();
    this.inititalValues = { ...this.company };
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
    },
    searchAddres(cep: string) {
      if (!cepRegex.test(cep)) return;

      this.searchEmployeeAddres(cep)
        .then((newAddres) => {
          this.inititalValues = newAddres;
        })
        .catch(() => this.getToast("error"));
    },
    handleSubmit(values: GenericObject) {
      const formData = { ...values } as CompanyInfo;

      this.loading = true;

      setTimeout(() => {
        this.saveCompanyInfo(formData)
          .then(() => {
            this.cancelEditing();
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

  &__disabled {
    color: map-get($color-scheme-light, "$color-neutral-neutral-4");
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

  &__company-name,
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

  &__figure {
    display: grid;
    gap: 24px;

    img {
      max-width: 100%;
      border-radius: 11px;
      border: $border-light;
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

.dark-mode .form {
  &__disabled {
    color: map-get($color-scheme-dark, "$color-neutral-neutral-4");
  }
  &__figure {
    img {
      border: $border-dark;
    }
  }
}
</style>
