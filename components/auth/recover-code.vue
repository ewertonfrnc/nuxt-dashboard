<template>
  <UiModal>
    <div class="recover-code login fadein animation-duration-500">
      <div class="recover-code__header">
        <h1 class="heading__tertiary">Código de recuperação</h1>
        <p class="body__primary">
          Insira o código que enviamos para seu e-mail
          <span class="highlight"> {{ recoverEmail }}. </span>
        </p>
      </div>

      <div class="recover-code__body">
        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Código de recuperação
              <BaseInputText
                name="code"
                placeholder="Insira o código de recuperação"
              />
            </label>
          </div>
        </form>
      </div>

      <div class="recover-code__footer">
        <BaseButton
          label="Voltar"
          class="btn__primary--outlined"
          @click.prevent="goBack"
        />
        <BaseButton
          label="Confirmar"
          :loading="loading"
          class="btn__primary"
          @click.prevent="sendRecoverCode"
        />
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { recoverCode } from "~/utils/schemas";

export default {
  props: {
    recoverEmail: { type: String, default: "", required: true },
  },
  emits: ["changeStep"],
  setup() {
    const { handleSubmit, resetForm } = useForm({
      initialValues: { code: "" },
      validationSchema: recoverCode,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { onSubmit, resetForm };
  },
  data() {
    return {
      loading: false,
      formData: {},
    };
  },
  methods: {
    goBack() {
      this.$emit("changeStep", "recover");
    },
    async sendRecoverCode() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.loading = true;

        const {
          data: { status },
        } = await this.$axios.post("/api/recover-code", this.formData);

        if (status && status === "success") this.$emit("changeStep", "change");
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });

        this.resetForm({
          values: { code: "" },
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recover-code {
  width: 35rem;

  &__header {
    margin-bottom: $spacing-md;
    display: grid;
    gap: 0.8rem;
  }

  &__body {
    margin-bottom: $spacing-md;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.highlight {
  color: $color-feedback-warning-4;
  font-weight: bold;
}
</style>
