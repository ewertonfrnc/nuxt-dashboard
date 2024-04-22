<template>
  <span class="body__primary">
    <i
      v-tooltip="{
        value: tooltipText,
        pt: { root: 'tooltip' },
      }"
      :class="['pi', icon]"
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
  },
  emits: ["action-handler"],
  methods: {
    actionHandler(userInfo: any) {
      const {
        slotData: { data },
      } = userInfo;
      this.$emit("action-handler", data);
    },
  },
};
</script>
