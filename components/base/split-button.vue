<template>
  <div class="split">
    <BaseButton
      label="Reprovar"
      :disabled="disableLeftBtn"
      class="btn__primary--outlined split__button-left"
      @click.stop="leftButtonHandler"
    />
    <BaseButton
      label="Aprovar"
      :disabled="disableRightBtn"
      class="btn__primary--outlined split__button-right"
      @click.stop="rightButtonHandler"
    />
  </div>
</template>

<script lang="ts">
export default {
  emits: ["button-handler"],
  data() {
    return {
      selectedBtn: "",
      disableLeftBtn: false,
      disableRightBtn: false,
    };
  },
  methods: {
    leftButtonHandler() {
      this.selectedBtn = "left";
      this.$emit("button-handler", this.selectedBtn);
    },
    rightButtonHandler() {
      this.selectedBtn = "right";
      this.$emit("button-handler", this.selectedBtn);
    },
  },
};
</script>

<style scoped lang="scss">
.split {
  display: flex;
  align-items: center;

  .active {
    background-color: map-get($color-scheme-light, "$color-brand-primary-4");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }

  &__button-left {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &__button-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left-width: 0;

    &:hover {
      border-left-width: 0;
    }
  }
}
</style>
