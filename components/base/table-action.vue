<template>
  <span class="body__primary">
    <i
      v-tooltip="{
        value: !disabled ? tooltipText : '',
        pt: { root: 'tooltip' },
      }"
      :class="['pi', icon, disabled && 'disabled']"
      @click="actionHandler(data)"
    />
  </span>
</template>

<script lang="ts">
export default {
  props: {
    tooltipText: { type: String, default: "", required: true },
    icon: { type: String, default: "", required: true },
    data: { type: Object, default: () => {}, required: true },
    disabled: { type: Boolean, default: false, required: false },
  },
  emits: ["action-handler"],
  methods: {
    actionHandler(userInfo: any) {
      if (this.disabled) return;

      const {
        slotData: { data },
      } = userInfo;
      this.$emit("action-handler", data);
    },
  },
};
</script>
