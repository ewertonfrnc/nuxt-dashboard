<template>
  <RadioButton
    :pt="{
      root: ({ state }) => {
        return `radio ${state.focused && 'radio--checked'}`;
      },
    }"
  />
</template>

<script lang="ts">
export default {};
</script>
