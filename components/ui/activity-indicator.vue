<script lang="ts">
export type Sizes = "small" | "medium" | "large";

export default {
  props: {
    size: {
      type: String as PropType<Sizes>,
      default: "small",
      required: false,
    },
  },
};
</script>

<template>
  <div :class="['loader', size]" />
</template>

<style scoped lang="scss">
.loader {
  border-color: map-get($color-scheme-light, "$color-brand-primary-0");
  border-style: solid;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.small {
  width: 2rem;
  height: 2rem;
  border-width: 2px;
}

.medium {
  width: 4rem;
  height: 4rem;
  border-width: 5px;
}

.large {
  width: 13rem;
  height: 13rem;
  border-width: 5px;
}

.dark-mode .loader {
  border-color: 5px solid map-get($color-scheme-dark, "$color-brand-primary-0");
  border-bottom-color: transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
