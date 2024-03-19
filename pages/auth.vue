<script lang="ts">
export default {};
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

    <!--    <AuthLogin />-->
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
  width: 35rem;
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

    & > div {
      display: flex;
      gap: 0.8rem;
    }

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
