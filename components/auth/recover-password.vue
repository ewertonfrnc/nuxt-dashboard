<template>
  <UiModal>
    <div class="recover fadein animation-duration-500">
      <div class="recover__header">
        <h1 class="heading__tertiary">Recuperar senha</h1>
        <p class="body__primary">Insira suas credenciais de acesso:</p>
      </div>

      <div class="recover__body">
        <VeeForm
          class="form"
          :validation-schema="formSchema"
          @submit="recoverHandler"
        >
          <div class="form__control">
            <BaseFormInputMask
              label="Usuário"
              name="username"
              mask="999.999.999-99"
              placeholder="Insira seu CPF"
            />
          </div>

          <div class="form__control form__btn-group">
            <BaseButton
              class="btn__primary--outlined"
              label="Cancelar"
              @click.prevent="goToLogin"
            />

            <BaseButton
              type="submit"
              class="btn__primary"
              label="Próximo"
              :loading="loading"
            />
          </div>
        </VeeForm>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { GenericObject } from "vee-validate";
import { mapActions } from "pinia";
import { RecoverPassword } from "~/interfaces/auth/auth.interface";

export default {
  emits: ["changeStep", "recoverEmail"],
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,

      formSchema: {
        username: "required|min:3|max:255|cpf",
      },
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
    recoverHandler(values: GenericObject) {
      const formData = { ...values } as RecoverPassword;

      this.loading = true;

      setTimeout(() => {
        this.recoverPassword(formData)
          .then((userEmail) => {
            this.goToChangePassword();
            this.$emit("recoverEmail", userEmail);
            this.$toast.add({
              severity: "success",
              summary: "E-mail enviado",
              detail:
                "Verifique seu e-mail para copiar o código de recuperação.",
              life: 4000,
            });
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.recover {
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

.form {
  display: grid;
  gap: 16px;

  &__btn-group {
    display: flex;
    gap: 13px;
  }
}
</style>
