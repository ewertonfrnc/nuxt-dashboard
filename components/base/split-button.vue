<template>
  <div class="split">
    <BaseButton
      label="Reprovar"
      :disabled="approveAll"
      :class="[
        'btn__primary--outlined',
        'split__button-left',
        selectedBtn === 'left' && 'active',
        disableLeftBtn && 'inactive',
      ]"
      @click.stop="leftButtonHandler(request)"
    />
    <BaseButton
      label="Aprovar"
      :class="[
        'btn__primary--outlined',
        'split__button-right',
        (approveAll || selectedBtn === 'right') && 'active',
        disableRightBtn && 'inactive',
      ]"
      @click.stop="rightButtonHandler(request)"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Request } from "~/interfaces/time-sheet/time-sheet.interface";

export default {
  props: {
    requests: { type: Array as PropType<Request[]>, required: true },
    request: { type: Object as PropType<Request>, required: true },
    approveAll: { type: Boolean, default: false, required: true },
  },
  emits: ["button-handler"],
  data() {
    return {
      selectedBtn: "",
      disableLeftBtn: false,
      disableRightBtn: false,
    };
  },
  watch: {
    approveAll(newValue) {
      if (newValue) {
        for (const request of this.requests) {
          this.rightButtonHandler(request);
        }
      }
    },
  },
  methods: {
    leftButtonHandler(request: Request) {
      this.selectedBtn = "left";
      this.disableRightBtn = true;

      request.approved = false;
      this.$emit("button-handler", request);
    },
    rightButtonHandler(request: Request) {
      this.selectedBtn = "right";
      this.disableLeftBtn = true;

      request.approved = true;
      this.$emit("button-handler", request);
    },
  },
};
</script>

<style scoped lang="scss">
.split {
  display: flex;
  align-items: center;

  &__button-left {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right-width: 1px;

    &:hover,
    &:focus {
      border-right-width: 1px;
    }
  }

  &__button-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left-width: 0;

    &:hover,
    &:focus {
      border-left-width: 0;
    }
  }

  .inactive {
    background-color: transparent;
    color: map-get($color-scheme-light, "$color-neutral-neutral-3");
    border-color: map-get($color-scheme-light, "$color-neutral-neutral-3");
  }

  .active {
    background-color: map-get($color-scheme-light, "$color-brand-primary-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }
}

.dark-mode .split {
  .inactive {
    background-color: transparent;
    color: map-get($color-scheme-light, "$color-neutral-neutral-3");
    border-color: map-get($color-scheme-light, "$color-neutral-neutral-3");
  }

  .active {
    background-color: map-get($color-scheme-light, "$color-brand-primary-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  }
}
</style>
