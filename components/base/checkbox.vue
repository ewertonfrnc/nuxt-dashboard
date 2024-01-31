<script lang="ts">
export default {
  data() {
    return {
      checked: false,
    };
  },
};
</script>

<template>
  <Checkbox
    v-model="checked"
    :binary="true"
    :pt="{
      root: 'root',
      input: 'checkbox',
      icon: 'checkbox__icon',
    }"
  />
</template>
