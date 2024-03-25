<script lang="ts">
import { useForm } from "vee-validate";

export default {
  emits: ["changeStep", "recoverEmail"],
  setup() {
    const { handleSubmit, resetForm } = useForm({
      initialValues: { username: "" },
      validationSchema: recoverPassword,
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
    goToLogin() {
      this.$emit("changeStep", "login");
    },
    goToChangePassword() {
      this.$emit("changeStep", "code");
    },
    async recoverPassword() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.loading = true;

        const {
          data: { userEmail },
        } = await this.$axios.post("/api/recover-password", this.formData);
        this.goToChangePassword();
        this.$emit("recoverEmail", userEmail);

        this.$toast.add({
          severity: "success",
          detail: "Verifique seu e-mail para copiar o código de recuperação.",
          summary: "E-mail enviado",
          life: 4000,
        });
      } catch (error) {
        console.error(error.message);
        this.resetForm({
          values: { username: "" },
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <UiModal>
    <div class="recover fadein animation-duration-500">
      <div class="recover__header">
        <h1 class="heading__tertiary">Recuperar senha</h1>
        <p class="body__primary">Insira suas credenciais de acesso:</p>
      </div>

      <div class="recover__body">
        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Usuário
              <BaseInputMask
                name="username"
                mask="999.999.999-99"
                placeholder="Insira seu CPF"
              />
            </label>
          </div>
        </form>
      </div>

      <div class="recover__footer">
        <BaseButton
          label="Cancelar"
          class="btn__primary--outlined"
          @click.prevent="goToLogin"
        />
        <BaseButton
          label="Próximo"
          :loading="loading"
          class="btn__primary"
          @click.prevent="recoverPassword"
        />
      </div>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.recover {
  width: 35rem;

  &__header {
    margin-bottom: 1.6rem;
  }

  &__body {
    margin-bottom: 1.6rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
