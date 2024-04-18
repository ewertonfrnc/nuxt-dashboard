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
                :wrong-crendentials-message="wrongCpfMessage"
                mask="999.999.999-99"
                name="username"
                placeholder="Insira seu CPF"
              />
            </label>
          </div>
        </form>
      </div>

      <div class="recover__footer">
        <BaseButton
          class="btn__primary--outlined"
          label="Cancelar"
          @click.prevent="goToLogin"
        />
        <BaseButton
          :loading="loading"
          class="btn__primary"
          label="Próximo"
          @click.prevent="recoverHandler"
        />
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { mapActions } from "pinia";
import { RecoverPassword } from "~/interfaces/auth/auth.interface";
import { validateCPF } from "~/utils/validators";

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
      formData: {} as RecoverPassword | undefined,
      wrongCpfMessage: "",
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["recoverPassword"]),
    goToLogin() {
      this.$emit("changeStep", "login");
    },
    goToChangePassword() {
      this.$emit("changeStep", "code");
    },
    async recoverHandler() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;
        if (!validateCPF(this.formData.username)) {
          this.wrongCpfMessage = "CPF inválido!";
          return;
        }

        this.loading = true;

        const userEmail = await this.recoverPassword(this.formData);
        this.goToChangePassword();
        this.$emit("recoverEmail", userEmail);

        this.$toast.add({
          severity: "success",
          summary: "E-mail enviado",
          detail: "Verifique seu e-mail para copiar o código de recuperação.",
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
          values: { username: "" },
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
