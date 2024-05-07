<template>
  <UiModal>
    <div class="login fadein animation-duration-500">
      <img alt="Itera logo" class="login__logo" src="~/assets/img/LOGO.svg" />

      <div class="login__header">
        <h3 class="heading__tertiary">Área do RH...</h3>
        <p class="body__primary">Insira suas credenciais de acesso:</p>
      </div>

      <form class="form">
        <div class="form__control">
          <label class="caption__primary">
            Usuário
            <BaseInputMask
              :wrong-crendentials-message="wrongCpfMessage"
              mask="999.999.999-99"
              name="username"
              placeholder="Insira seu CPF"
              @handle-change="cpfValidate"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="caption__primary">
            Senha
            <BaseInputPassword
              :wrong-crendentials-message="wrongCredentialsMessage"
              name="password"
              placeholder="Insira sua senha"
            />
          </label>
        </div>

        <div class="form__reminder">
          <div>
            <BaseCheckbox
              :checked="remindUser"
              input-id="remindUser"
              @change="remindUser = !remindUser"
            />
            <label class="form__reminder--label" for="remindUser">
              Lembre-me
            </label>
          </div>

          <span>
            <BaseButton
              class="btn__primary--text"
              label="Esqueci a senha"
              @click.prevent="goToRecoverPassword"
            />
          </span>
        </div>

        <div class="form__submit">
          <BaseButton
            :loading="isLoading"
            :disabled="wrongCpfMessage.length || isLoading"
            class="btn__primary"
            label="Entrar"
            @click.prevent="login"
          />
        </div>
      </form>

      <div class="register">
        <span>Não tem cadastro?</span>
        <span>
          <BaseButton class="btn__primary--text" label="Cadastre-se" />
        </span>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { mapActions, mapState } from "pinia";
import { UserCredentials } from "@/interfaces/auth/auth.interface";

export default {
  emits: ["changeStep"],
  setup() {
    const router = useRouter();

    const { handleSubmit, resetForm } = useForm({
      initialValues: { username: "", password: "" },
      validationSchema: loginSchema,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { router, onSubmit, resetForm };
  },
  data() {
    return {
      isLoading: false,
      formData: {} as UserCredentials,
      remindUser: false,
      wrongCredentialsMessage: "",
      wrongCpfMessage: "",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user", "authenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["authenticateUser"]),
    goToRecoverPassword() {
      this.$emit("changeStep", "recover");
    },
    cpfValidate(value: string) {
      this.wrongCpfMessage = value;
    },
    async login() {
      this.isLoading = true;

      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        await this.authenticateUser(this.formData);

        if (this.user && !this.remindUser) {
          sessionStorage.setItem("token", this.user?.token);
        }

        if (this.user && this.remindUser) {
          const token = useCookie("token");
          token.value = this.user?.token;
        }

        if (this.authenticated) await this.router.push("/");
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
      align-items: center;
      gap: 0.8rem;
    }

    &--label {
      cursor: pointer;
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
