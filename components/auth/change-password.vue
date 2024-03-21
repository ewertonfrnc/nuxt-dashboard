<script lang="ts">
export default {
  props: {
    recoverEmail: { type: String, default: "", required: true },
  },
  emits: ["changeStep"],
  methods: {
    goToLogin() {
      this.$emit("changeStep", "recover");
    },
    hashEmail(email) {
      const regex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

      if (regex.test(email)) {
        const [_, user, domain, dot] = email.match(regex);

        return `${user.slice(0, 3)}*${"*".repeat(
          user.length - 3,
        )}@${domain}.${dot}`;
      } else {
        return "Email inválido";
      }
    },
  },
};
</script>

<template>
  <UiModal>
    <div class="change-password">
      <div class="change-password__header">
        <h1 class="heading__tertiary">Código de recuperação</h1>
        <p class="body__primary">
          Insira o código que enviamos para seu e-mail
          <span class="highlight"> {{ hashEmail(recoverEmail) }}. </span>
        </p>
      </div>

      <div class="change-password__body">
        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Código de recuperação
              <BaseInputText
                name="username"
                placeholder="Insira o código de recuperação"
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
        <BaseButton label="Próximo" class="btn__primary" />
      </div>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.change-password {
  width: 35rem;

  &__header {
    margin-bottom: 1.6rem;
    display: grid;
    gap: 0.8rem;
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
