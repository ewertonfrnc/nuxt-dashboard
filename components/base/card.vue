<script lang="ts">
export default {};
</script>

<template>
  <div class="card p-5 border-round-2xl">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background: $sd-color-neutral-neutral-7;
  border: $border;
  box-shadow: $box-shadow;
  overflow-x: auto;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
