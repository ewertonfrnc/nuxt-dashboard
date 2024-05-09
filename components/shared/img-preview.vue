<template>
  <figure class="figure">
    <img class="figure__img" :src="imgSrc" :alt="altText" />
  </figure>
</template>

<script lang="ts">
export default {
  props: {
    imgSrc: { type: String, required: true },
    altText: { type: String, default: "", required: true },
  },
};
</script>

<style lang="scss" scoped>
.figure {
  width: 130px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;

  &__img {
    max-width: 100%;
  }
}
</style>
