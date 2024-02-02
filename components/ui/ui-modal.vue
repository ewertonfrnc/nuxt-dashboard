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
  background-color: $sd-color-neutral-neutral-7;
  padding: 4.8rem;
  border-radius: 1.6rem;
}
</style>
