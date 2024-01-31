<script lang="ts">
export default {
  methods: {
    getIconClass(severity: string): string {
      const severityToIconMap: Record<string, string> = {
        success: "pi pi-check",
        error: "pi pi-times-circle",
        warn: "pi pi-exclamation-triangle",
      };

      return severityToIconMap[severity];
    },
    getSeverityClass(severity: string): string {
      const severityToIconMap: Record<string, string> = {
        success: "toast__success",
        error: "toast__danger",
        warn: "toast__warn",
      };

      return severityToIconMap[severity];
    },
  },
};
</script>

<template>
  <Toast
    :pt="{
      content: 'toast__content',
      closeButton: 'toast__button fadeindown animation-duration-500',
    }"
  >
    <template #message="slotProps">
      <div
        :class="[
          'toast',
          'fadeindown',
          'animation-duration-500',
          getSeverityClass(slotProps.message.severity),
        ]"
      >
        <div class="toast__icon">
          <i :class="getIconClass(slotProps.message.severity)" />
        </div>

        <div class="toast__info">
          <div class="toast__summary">{{ slotProps.message.summary }}</div>
          <div class="toast__detail">{{ slotProps.message.detail }}</div>
        </div>
      </div>
    </template>
  </Toast>
</template>
