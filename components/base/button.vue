<template>
  <Button
    :icon="`${icon}`"
    :label="label"
    :loading="loading"
    :pt="{
      root: 'btn',
    }"
    :type="type"
  >
    <template #icon>
      <i :class="['btn__icon', icon]" />
    </template>
  </Button>
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
