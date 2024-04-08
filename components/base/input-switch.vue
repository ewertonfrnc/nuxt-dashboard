<script lang="ts">
export default {
  props: {
    checked: { type: Boolean, default: true, required: true },
  },
  emits: ["toggleCheckbox"],
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    handleCheckbox() {
      this.isChecked = !this.checked;
      this.$emit("toggleCheckbox", this.isChecked);
    },
  },
};
</script>

<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" @click="handleCheckbox" />
    <span class="slider round" />
  </label>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 4.2rem;
  height: 2.4rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: map-get($color-scheme-light, "$color-neutral-neutral-4");
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 1.8rem;
    width: 1.8rem;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
}

.dark-mode .slider {
  &:before {
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-0");
  }
}

input:checked + .slider {
  background-color: map-get($color-scheme-light, "$color-brand-primary-0");
}

.dark-mode input:checked + .slider {
  background-color: map-get($color-scheme-light, "$color-brand-primary-0");
}

input:checked + .slider:before {
  transform: translateX(1.8rem);
}
.round {
  border-radius: 3.4rem;

  &:before {
    border-radius: 50%;
  }
}
</style>
