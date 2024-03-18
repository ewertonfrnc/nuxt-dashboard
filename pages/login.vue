<script>
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { loginSchema } from "~/utils/schemas";

export default {
  setup() {
    const router = useRouter();
    const { authenticated } = storeToRefs(useAuthStore());

    const { handleSubmit, resetForm } = useForm({
      initialValues: { username: "", password: "" },
      validationSchema: loginSchema,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { router, authenticated, onSubmit, resetForm };
  },
  data() {
    return {
      isLoading: false,
      formData: {},
      remindUser: false,
      wrongCredentialsMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.isLoading = true;
        const user = await this.$axios.post("/api/login", this.formData);

        if (this.authenticated) {
          await this.router.push("/");
        }
      } catch (error) {
        this.wrongCredentialsMessage = error.response.data.message;
      } finally {
        this.isLoading = false;

        this.resetForm({
          values: {
            username: "",
            password: "",
          },
        });
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <img
      src="~/assets/img/login-feature.png"
      class="container__detail--1"
      alt="container details"
    />
    <img
      src="~/assets/img/login-feature.png"
      class="container__detail--2"
      alt="container details"
    />

    <UiModal>
      <div class="login">
        <img src="~/assets/img/LOGO.png" alt="Itera logo" class="logo" />

        <div class="login__header">
          <h3 class="heading__tertiary">Área do RH</h3>
          <p class="body__primary">Insira suas credenciais de acesso:</p>
        </div>

        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Usuário
              <BaseInputMask
                name="username"
                mask="999.999.999-99"
                placeholder="Insira seu CPF"
                :wrong-crendentials-message="wrongCredentialsMessage"
              />
            </label>
          </div>

          <div class="form__control">
            <label class="caption__primary">
              Senha
              <BaseInputPassword
                name="password"
                placeholder="Insira sua senha"
                :wrong-crendentials-message="wrongCredentialsMessage"
              />
            </label>
          </div>

          <div class="form__reminder">
            <label class="form__reminder--label">
              <BaseCheckbox />
              Lembre-me
            </label>

            <span>
              <BaseButton label="Cadastre-se" class="btn__primary--text" />
            </span>
          </div>

          <BaseButton
            label="Entrar"
            class="btn__primary"
            :loading="isLoading"
            @click.prevent="login"
          />
        </form>

        <div class="register">
          <span>Não tem cadastro?</span>
          <span>
            <BaseButton label="Cadastre-se" class="btn__primary--text" />
          </span>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<style scoped lang="scss">
.container {
  overflow: hidden;
  position: relative;
  background-color: $color-brand-primary-0;
  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;

  &__detail--1 {
    transform: rotate(180deg);
    position: absolute;
    top: 0;
    right: 0;
  }

  &__detail--2 {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.login {
  display: grid;
  gap: $spacing-md;
}

.logo {
  max-width: 20rem;
  justify-self: center;
}

.form {
  display: grid;
  gap: $spacing-md;

  &__reminder {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--label {
      color: $color-neutral-neutral-2;
      display: flex;
      gap: 0.8rem;
    }
  }
}

.register {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
