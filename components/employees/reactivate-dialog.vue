<template>
  <div>
    <p class="body__secondary">
      Tem certeza que deseja reativar o colaborador
      <span class="subtitle__primary highlight"> {{ user }} </span>?
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    user: { type: String, default: "", required: true },
  },
};
</script>
