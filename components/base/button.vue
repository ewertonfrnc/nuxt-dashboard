<template>
  <Button
    :label="label"
    :icon="`${icon}`"
    :loading="loading"
    :type="type"
    :pt="{
      root: 'btn',
    }"
  />
</template>

<script lang="ts">
import { PropType } from "vue";

export type ButtonType = "button" | "reset" | "submit";
export default {
  props: {
    label: {
      type: String,
      default: "",
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
    type: {
      type: String as PropType<ButtonType>,
      default: "button",
      required: false,
    },
  },
};
</script>
