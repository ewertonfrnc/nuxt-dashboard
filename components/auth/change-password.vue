<template>
  <UiModal>
    <div class="change-password fadein animation-duration-500">
      <div class="change-password__header">
        <h1 class="heading__tertiary">Alterar senha</h1>
        <p class="body__primary">Insira a nova senha</p>
      </div>

      <div class="change-password__body">
        <VeeForm
          v-slot="{ values, meta }"
          class="form"
          :validation-schema="formSchema"
          @submit="changePasswordHandler"
        >
          <div class="form__control">
            <BaseFormInputPassword
              label="Nova senha"
              name="password"
              placeholder="Insira a nova senha"
              @updated-value="validatePassword"
            />
          </div>

          <BaseInlineMessage
            v-if="!values.password"
            severity="info"
            text="6 dígitos contendo letras e números"
          />
          <BaseInlineMessage
            v-else
            :severity="isValidPassword ? 'success' : 'error'"
            text="6 dígitos contendo letras e números"
          />

          <div class="form__control">
            <BaseFormInputPassword
              label="Repita a senha"
              name="passwordConfirm"
              placeholder="Repita a nova senha"
            />
          </div>

          <div class="form__btn-group">
            <BaseButton
              label="Voltar"
              class="btn__primary--outlined"
              @click.prevent="goToLogin"
            />

            <BaseButton
              type="submit"
              label="Salvar"
              class="btn__primary"
              :loading="loading"
              :disabled="meta.dirty && !meta.valid"
            />
          </div>
        </VeeForm>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { GenericObject } from "vee-validate";
import { ChangePassword } from "~/interfaces/auth/auth.interface";

export default {
  emits: ["changeStep"],
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isValidPassword: true,

      formSchema: {
        password: "required|min:6",
        passwordConfirm: "required|min:6|passwords_mismatch:@password",
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["changePassword"]),
    goToLogin() {
      this.$emit("changeStep", "login");
    },
    validatePassword(password: string) {
      if (!password) return;
      this.isValidPassword = password.length >= 6;
    },
    changePasswordHandler(values: GenericObject) {
      const formData = { ...values } as ChangePassword;

      this.loading = true;

      setTimeout(() => {
        this.changePassword(formData)
          .then(() => {
            this.$emit("changeStep", "login");

            this.$toast.add({
              severity: "success",
              summary: "Senha alterada",
              detail: "Faça login utilizando sua nova senha.",
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

<style scoped lang="scss">
.change-password {
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
  gap: 16px;

  &__btn-group {
    display: flex;
    gap: 13px;
  }
}
</style>
