<template>
  <Button class="btn" :label="label" :icon="`${icon}`" :loading="loading" />
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      default: "",
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
