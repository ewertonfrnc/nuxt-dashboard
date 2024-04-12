<template>
  <UiModal>
    <div class="login fadein animation-duration-500">
      <img src="~/assets/img/LOGO.png" alt="Itera logo" class="login__logo" />

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
          <div>
            <BaseCheckbox
              input-id="remindUser"
              @change="remindUser = !remindUser"
            />
            <label class="form__reminder--label" for="remindUser">
              Lembre-me
            </label>
          </div>

          <span>
            <BaseButton
              label="Esqueci a senha"
              class="btn__primary--text"
              @click.prevent="goToRecoverPassword"
            />
          </span>
        </div>

        <div class="form__submit">
          <BaseButton
            label="Entrar"
            class="btn__primary"
            :loading="isLoading"
            @click.prevent="login"
          />
        </div>
      </form>

      <div class="register">
        <span>Não tem cadastro?</span>
        <span>
          <BaseButton label="Cadastre-se" class="btn__primary--text" />
        </span>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";

export default {
  emits: ["changeStep"],
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
    goToRecoverPassword() {
      this.$emit("changeStep", "recover");
    },
    async login() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.isLoading = true;
        const {
          data: { user },
        } = await this.$axios.post("/api/login", this.formData);

        if (user && !this.remindUser) {
          sessionStorage.setItem("token", user?.token);
        }

        if (user && this.remindUser) {
          const token = useCookie("token");
          token.value = user?.token;
        }

        if (this.authenticated) {
          await this.router.push("/");
        }
      } catch (error) {
        this.wrongCredentialsMessage = error.response.data.message;

        this.resetForm({
          values: {
            username: "",
            password: "",
          },
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 35rem;
  display: grid;
  gap: $spacing-md;

  &__logo {
    max-width: 20rem;
    justify-self: center;
  }
}

.form {
  display: grid;
  gap: $spacing-md;

  &__reminder {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      display: flex;
      gap: 0.8rem;
    }

    &--label {
      color: map-get($color-scheme-light, "$color-neutral-neutral-2");
      display: flex;
      gap: 0.8rem;
    }
  }

  &__submit {
    display: flex;
    justify-content: center;

    & > button {
      max-width: 20rem;
    }
  }
}

.register {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
