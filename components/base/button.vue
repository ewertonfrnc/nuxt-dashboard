<template>
  <Button
    :label="label"
    :icon="`${icon}`"
    :loading="loading"
    :type="type"
    :pt="{
      root: 'btn',
    }"
  >
    <template #default>
      <i v-if="loading" class="pi pi-spinner btn__icon btn__icon--loading" />

      <i v-if="icon" :class="[icon, 'btn__icon']" />
      <span v-if="label" class="button__primary">{{ label }}</span>
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
