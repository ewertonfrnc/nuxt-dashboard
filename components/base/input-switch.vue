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
  <label class="switch">
    <input type="checkbox" />
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
  background-color: $color-neutral-neutral-4;
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

input:checked + .slider {
  background-color: $color-brand-primary-0;
}

input:focus + .slider {
  box-shadow: 0 0 1rem $color-brand-primary-0;
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
