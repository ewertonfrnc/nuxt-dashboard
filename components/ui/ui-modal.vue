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
  padding: 3.8rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.25);
}
</style>
