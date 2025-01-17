<template>
  <Tag :value="value" severity="secondary">
    <template #default>
      <span :class="['tag', 'caption__primary', getSeverityClass(severity)]">{{
        value
      }}</span>
    </template>
  </Tag>
</template>

<script lang="ts">
import { PropType } from "vue";

export type TagType =
  | "Primary"
  | "Secondary"
  | "Success"
  | "Info"
  | "Warning"
  | "Danger"
  | "Contrast";

export default {
  props: {
    value: { type: String, default: "", required: true },
    severity: {
      type: String as PropType<TagType>,
      default: "",
      required: true,
    },
  },
  methods: {
    getSeverityClass(severity: string): string {
      const severityToClassMap: Record<string, string> = {
        Primary: "tag__primary",
        Secondary: "tag__secondary",
        Success: "tag__success",
        Danger: "tag__danger",
        Warning: "tag__warning",
      };

      return severityToClassMap[severity];
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  padding: 0.4rem 0.8rem;
  border-radius: $border-radius;

  &__primary {
    background-color: map-get($color-scheme-light, "$color-brand-primary-2");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }

  &__secondary {
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-4");
  }

  &__success {
    background-color: map-get($color-scheme-light, "$color-feedback-success-2");
  }

  &__danger {
    background-color: map-get($color-scheme-light, "$color-feedback-danger-2");
  }

  &__warning {
    background-color: map-get($color-scheme-light, "$color-feedback-warning-2");
  }
}

.dark-mode .tag {
  &__primary {
    background-color: map-get($color-scheme-dark, "$color-brand-primary-2");
    color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
  }

  &__secondary {
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-4");
    color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
  }

  &__success {
    background-color: map-get($color-scheme-dark, "$color-feedback-success-2");
  }

  &__danger {
    background-color: map-get($color-scheme-dark, "$color-feedback-danger-2");
  }

  &__warning {
    background-color: map-get($color-scheme-dark, "$color-feedback-warning-2");
  }
}
</style>
