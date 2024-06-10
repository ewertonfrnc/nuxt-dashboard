<script lang="ts">
export default {};
</script>

<template>
  <div class="card fadein animation-duration-500">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background: map-get($color-scheme-light, "$color-neutral-neutral-7");
  border: map-get($color-scheme-light, $border-light);
  box-shadow: $box-shadow-light;
  padding: 2.4rem;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
}

.dark-mode .card {
  background: map-get($color-scheme-dark, "$color-neutral-neutral-7");
  border: map-get($color-scheme-dark, $border-dark);
  box-shadow: $box-shadow-dark;
}
</style>
