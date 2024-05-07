<template>
  <div
    :class="[
      'badge',
      type === 'success'
        ? 'badge__success'
        : type === 'warn'
        ? 'badge__warning'
        : 'badge__danger',
    ]"
  >
    <span class="body__primary">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

type BadgeType = "success" | "warn" | "error";
export default {
  props: {
    label: { type: String, default: "", required: true },
    type: { type: String as PropType<BadgeType>, default: "", required: true },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  padding: 0 10px;
  border-radius: 58px;
  display: grid;
  place-content: center;

  &__success {
    background-color: map-get($color-scheme-light, "$color-feedback-success-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }

  &__warning {
    background-color: map-get($color-scheme-light, "$color-feedback-warning-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }

  &__error {
    background-color: map-get($color-scheme-light, "$color-feedback-danger-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }
}
</style>
