<template>
  <VeeForm
    v-slot="{ values }"
    :initial-values="userDocs"
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

    <form class="form" @change="handleChange(values)">
      <section class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Documento de identidade
        </p>

        <div>
          <div class="form__identity">
            <div>
              <p class="subtitle__primary form__section--subtitle">
                Frente do RG
              </p>
              <div v-if="isEditing" class="fadein animation-duration-500">
                <BaseUpload @on-upload="handleUpload" />
              </div>

              <div v-else class="fadein animation-duration-500">
                <div class="form__control">
                  <SharedImgPreview
                    :img-src="userDocs.rgFront"
                    alt-text="Frente do RG"
                  />
                  <span class="body__primary">Frente do RG</span>
                </div>
              </div>
            </div>

            <div>
              <p class="subtitle__primary form__section--subtitle">
                Verso do RG
              </p>
              <div v-if="isEditing" class="fadein animation-duration-500">
                <BaseUpload @on-upload="handleUpload" />
              </div>

              <div v-else class="fadein animation-duration-500">
                <div class="form__control">
                  <SharedImgPreview
                    :img-src="userDocs.rgBack"
                    alt-text="Frente do RG"
                  />
                  <span class="body__primary">Verso do RG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Comprovante de residência
        </p>

        <div>
          <div v-if="isEditing" class="fadein animation-duration-500">
            <BaseUpload @on-upload="handleUpload" />
          </div>

          <div v-else class="fadein animation-duration-500">
            <div class="form__control">
              <SharedImgPreview
                :img-src="userDocs.proofOfAddress"
                alt-text="Comprovante de residência"
              />
              <span class="body__primary">Comprovante de residência</span>
            </div>
          </div>
        </div>
      </section>

      <p v-if="employee.isMarried" class="subtitle__primary">
        Se o colaborador for casado(a):
      </p>

      <section v-if="employee.isMarried" class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Certidão de casamento
        </p>

        <div>
          <div v-if="isEditing" class="fadein animation-duration-500">
            <BaseUpload @on-upload="handleUpload" />
          </div>

          <div v-else class="fadein animation-duration-500">
            <div class="form__control">
              <SharedImgPreview
                :img-src="userDocs.weddingCertificate"
                alt-text="Certidão de casamento"
              />
              <span class="body__primary">Certidão de casamento</span>
            </div>
          </div>
        </div>
      </section>

      <p v-if="employee.isMarried" class="subtitle__primary">
        Se o colaborador possuir filhos:
      </p>

      <section v-if="employee.isMarried" class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Certidão de nascimento
        </p>

        <div>
          <div v-if="isEditing" class="fadein animation-duration-500">
            <BaseUpload @on-upload="handleUpload" />
          </div>

          <div v-else class="fadein animation-duration-500">
            <div class="form__control">
              <SharedImgPreview
                :img-src="userDocs.birthCertificate"
                alt-text="Certidão de nascimento"
              />
              <span class="body__primary">Certidão de nascimento</span>
            </div>
          </div>
        </div>
      </section>

      <section class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Foto da CTPS (Carteira de trabalho) (Página com foto)
        </p>

        <div>
          <div v-if="isEditing" class="fadein animation-duration-500">
            <BaseUpload @on-upload="handleUpload" />
          </div>

          <div v-else class="fadein animation-duration-500">
            <div class="form__control">
              <SharedImgPreview
                :img-src="userDocs.ctps"
                alt-text="Foto da carteira de trabalho"
              />
              <span class="body__primary">Foto da carteira de trabalho</span>
            </div>
          </div>
        </div>
      </section>

      <section class="form__section">
        <p class="subtitle__primary form__section--subtitle">
          Certidão de alistamento militar
        </p>

        <div>
          <div v-if="isEditing" class="fadein animation-duration-500">
            <BaseUpload @on-upload="handleUpload" />
          </div>

          <div v-else class="fadein animation-duration-500">
            <div class="form__control">
              <SharedImgPreview
                :img-src="userDocs.militaryEnlistment"
                alt-text="Certidão de alistamento militar"
              />
              <span class="body__primary">Certidão de alistamento militar</span>
            </div>
          </div>
        </div>
      </section>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { checkEqualObjs } from "~/utils/validators";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      hasChanges: false,
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    userDocs() {
      return this.employee.documents;
    },
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeDocs"]),

    handleUpload() {},
    cancelEditing() {
      this.isEditing = false;
    },
    async handleSubmit(values) {
      this.loading = true;

      try {
        await this.updateEmployeeDocs(String(this.employee.id), values);
        this.isEditing = false;

        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
    handleChange(values) {
      this.hasChanges = !checkEqualObjs(values, this.employee.personalData);
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
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__section {
    display: grid;
    gap: 24px;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid
      map-get($color-scheme-light, "$color-neutral-neutral-5");
  }

  &__identity {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 24px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
