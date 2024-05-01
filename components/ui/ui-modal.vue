<script lang="ts">
export default {};
</script>

<template>
  <div class="modal">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.light-mode .modal {
  background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");
}

.modal {
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  width: 439px;
  padding: 48px;
  border-radius: 16px;

  @include respond(phone) {
    width: 375px;
    padding: 38px;
  }
}
</style>
