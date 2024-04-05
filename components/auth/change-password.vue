<template>
  <UiModal>
    <div class="change-password fadein animation-duration-500">
      <div class="change-password__header">
        <h1 class="heading__tertiary">Alterar senha</h1>
        <p class="body__primary">Insira a nova senha</p>
      </div>

      <div class="change-password__body">
        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Nova senha
              <BaseInputPassword
                name="password"
                placeholder="Insira a nova senha"
                @updated-value="validatePassword"
              />
            </label>
          </div>

          <BaseInlineMessage
            :severity="isValidPassword ? 'success' : 'error'"
            text="4 dígitos numéricos"
          />

          <div class="form__control">
            <label class="caption__primary">
              Repita a senha
              <BaseInputPassword
                name="passwordConfirm"
                placeholder="Repita a nova senha"
              />
            </label>
          </div>
        </form>
      </div>

      <div class="change-password__footer">
        <BaseButton
          label="Voltar"
          class="btn__primary--outlined"
          @click.prevent="goToLogin"
        />
        <BaseButton
          label="Salvar"
          class="btn__primary"
          @click.prevent="changePassword"
        />
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { changePassword } from "~/utils/schemas";

export default {
  emits: ["changeStep"],
  setup() {
    const { handleSubmit, resetForm } = useForm({
      initialValues: { password: "", passwordConfirm: "" },
      validationSchema: changePassword,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { onSubmit, resetForm };
  },
  data() {
    return {
      loading: false,
      isValidPassword: true,
      formData: {},
    };
  },
  methods: {
    goToLogin() {
      this.$emit("changeStep", "login");
    },
    validatePassword(password: string) {
      if (!password) return;

      if (password.length >= 4) this.isValidPassword = true;
      else this.isValidPassword = false;
    },
    async changePassword() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.loading = true;
        await this.$axios.post("/api/change-password", this.formData);

        this.$emit("changeStep", "login");
        this.$toast.add({
          severity: "success",
          summary: "Senha alterada",
          detail: "Faça login utilizando sua nova senha.",
          life: 4000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });

        this.resetForm({
          values: { password: "", passwordConfirm: "" },
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.change-password {
  width: 35rem;

  &__header {
    margin-bottom: $spacing-md;
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

.form {
  display: grid;
  gap: $spacing-md;
}
</style>
