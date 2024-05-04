<template>
  <div v-if="!isMobileScreen" class="split">
    <BaseButton
      :class="[
        'btn__primary--outlined',
        'split__button-left',
        selectedBtn === 'left' && 'active',
        (request.approved || disableLeftBtn) && 'inactive',
      ]"
      label="Reprovar"
      @click.stop="leftButtonHandler(request)"
    />
    <BaseButton
      :class="[
        'btn__primary--outlined',
        'split__button-right',
        disableRightBtn && 'inactive',
        (request.approved || selectedBtn === 'right') && 'active',
      ]"
      label="Aprovar"
      @click.stop="rightButtonHandler(request)"
    />
  </div>
  <div v-else class="split">
    <BaseButton
      :class="[
        'btn btn__primary--outlined',
        'split__button-left',
        selectedBtn === 'left' && 'active',
        (request.approved || disableLeftBtn) && 'inactive',
      ]"
      icon="pi pi-times"
      @click.stop="leftButtonHandler(request)"
    />
    <BaseButton
      :class="[
        'btn btn__primary--outlined',
        'split__button-right',
        disableRightBtn && 'inactive',
        (request.approved || selectedBtn === 'right') && 'active',
      ]"
      icon="pi pi-check"
      @click.stop="rightButtonHandler(request)"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { WorkLog } from "~/interfaces/employee/employee.interface";

export default {
  props: {
    requests: { type: Set, required: true },
    request: { type: Object as PropType<WorkLog>, required: true },
    approveAll: { type: Boolean, default: false, required: true },
  },
  emits: ["button-handler"],
  data() {
    return {
      isMobileScreen: false,
      selectedBtn: "",
      disableLeftBtn: false,
      disableRightBtn: false,
    };
  },
  watch: {
    approveAll(newValue) {
      if (newValue) {
        this.selectedBtn = "right";
        this.disableLeftBtn = true;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    leftButtonHandler(request: WorkLog) {
      this.selectedBtn = "left";
      this.disableRightBtn = true;

      request.approved = false;
      this.$emit("button-handler", request);
    },
    rightButtonHandler(request: WorkLog) {
      this.selectedBtn = "right";
      this.disableLeftBtn = true;

      request.approved = true;
      this.$emit("button-handler", request);
    },
    handleResize() {
      if (window.matchMedia("(max-width: 37.5em)").matches) {
        this.isMobileScreen = true;
      } else {
        this.isMobileScreen = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.split {
  display: flex;
  align-items: center;

  @include respond(phone) {
    button {
      padding: 0.6rem 1.2rem;
      text-align: center;
    }
  }

  &__button-left {
    min-width: max-content;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right-width: 1px;

    &:hover,
    &:focus {
      border-right-width: 1px;
    }
  }

  &__button-right {
    min-width: max-content;
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

    &:disabled {
      @extend .btn__primary--outlined;
    }
  }
}

.dark-mode .split {
  .inactive {
    background-color: transparent;
    border-color: map-get($color-scheme-light, "$color-neutral-neutral-3");
  }

  .active {
    background-color: map-get($color-scheme-light, "$color-brand-primary-0");
    color: map-get($color-scheme-light, "$color-neutral-neutral-7");

    &:disabled {
      @extend .btn__primary--outlined;
    }
  }
}
</style>
