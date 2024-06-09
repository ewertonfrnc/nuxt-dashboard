<template>
  <UiModal>
    <div class="login fadein animation-duration-500">
      <img alt="Itera logo" class="login__logo" src="~/assets/img/LOGO.svg" />

      <div class="login__header">
        <h3 class="heading__tertiary">Área do RH</h3>
        <p class="body__primary">Insira suas credenciais de acesso:</p>
      </div>

      <VeeForm class="form" :validation-schema="formSchema" @submit="login">
        <div class="form__control">
          <BaseFormInputMask
            name="username"
            mask="999.999.999-99"
            label="Usuário"
            placeholder="Insira seu CPF"
          />
        </div>

        <div class="form__control">
          <BaseFormInputPassword
            label="Senha"
            name="password"
            placeholder="Insira sua senha"
          />
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
            type="submit"
            label="Entrar"
            class="btn__primary"
            :loading="loading"
          />
        </div>
      </VeeForm>

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
import { GenericObject } from "vee-validate";
import { mapActions, mapState } from "pinia";
import { UserCredentials } from "@/interfaces/auth/auth.interface";

export default {
  emits: ["changeStep"],
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      remindUser: false,

      formSchema: {
        username: "required|min:3|max:255|cpf",
        password: "required|min:6",
      },
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
    login(values: GenericObject) {
      const formData = { ...values } as UserCredentials;

      this.loading = true;

      setTimeout(() => {
        this.authenticateUser(formData)
          .then(() => {
            if (this.user && !this.remindUser) {
              sessionStorage.setItem("token", this.user?.token);
            }

            if (this.user && this.remindUser) {
              const token = useCookie("token");
              token.value = this.user?.token;
            }

            if (this.authenticated) this.$router.push("/");
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
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
    width: 200px;
    display: flex;
    justify-self: center;
  }
}

.register {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
