<script lang="ts">
export default {
  setup() {
    const authSteps = ["login", "recover", "change"];
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

    <AuthLogin v-if="currentStep === 'login'" @change-step="changeAuthStep" />
    <AuthRecoverPassword
      v-if="currentStep === 'recover'"
      @change-step="changeAuthStep"
      @recover-email="setRecoverEmail"
    />
    <!--    <AuthChangePassword-->
    <!--      v-if="currentStep === 'change'"-->
    <!--      :recover-email="recoverEmail"-->
    <!--      @change-step="changeAuthStep"-->
    <!--    />-->
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
</style>
