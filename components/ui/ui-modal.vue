<script lang="ts">
export default {};
</script>

<template>
  <div class="modal">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modal {
  z-index: 9999;
  background-color: $color-neutral-neutral-7;
  padding: 4.8rem;
  border-radius: 1.6rem;
}
</style>
