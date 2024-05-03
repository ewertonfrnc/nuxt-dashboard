<script lang="ts">
export type MessageType = "success" | "info" | "warn" | "error";

export default {
  props: {
    severity: {
      type: String as PropType<MessageType>,
      default: "info",
      required: true,
    },
    text: { type: String, default: "", required: true },
  },
};
</script>

<template>
  <InlineMessage
    :pt="{
      root: `inline-message inline-message__${severity}`,
      icon: 'inline-message__icon caption__primary',
      text: 'inline-message__text caption__primary',
    }"
    :severity="severity"
  >
    {{ text }}
  </InlineMessage>
</template>

<style scoped lang="scss"></style>
