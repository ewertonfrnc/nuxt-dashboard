<template>
  <NuxtLayout>
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

      <AuthLogin v-if="currentStep === 'login'" @change-step="changeAuthStep" />
      <AuthRecoverPassword
        v-if="currentStep === 'recover'"
        @change-step="changeAuthStep"
        @recover-email="setRecoverEmail"
      />
      <AuthRecoverCode
        v-if="currentStep === 'code'"
        :recover-email="recoverEmail"
        @change-step="changeAuthStep"
      />
      <AuthChangePassword
        v-if="currentStep === 'change'"
        @change-step="changeAuthStep"
      />
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  setup() {
    definePageMeta({ layout: "auth", colorMode: "light" });
    const authSteps = ["login", "recover", "code", "change"];
    return { authSteps };
  },
  data() {
    return {
      currentStep: "login",
      recoverEmail: "",
    };
  },
  methods: {
    changeAuthStep(step: string) {
      if (!this.authSteps.includes(step)) return;
      this.currentStep = step;
    },
    setRecoverEmail(email: string) {
      this.recoverEmail = email;
    },
  },
};
</script>

<style scoped lang="scss">
.light-mode .container {
  background-color: map-get($color-scheme-light, "$color-brand-primary-3");
}

.container {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;

  &__detail--1 {
    z-index: 0;
    transform: rotate(180deg);
    position: absolute;
    top: 0;
    right: 0;

    @include respond(tab-land) {
      max-width: 40rem;
    }

    @include respond(tab-port) {
      max-width: 35rem;
    }
  }

  &__detail--2 {
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;

    @include respond(tab-land) {
      max-width: 40rem;
    }

    @include respond(tab-port) {
      max-width: 35rem;
    }
  }
}
</style>
