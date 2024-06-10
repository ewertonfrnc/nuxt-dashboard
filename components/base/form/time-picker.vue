<template>
  <label class="input">
    <span class="caption__primary" v-text="label" />

    <Calendar
      v-model="value"
      time-only
      :readonly="readonly"
      :disabled="disabled"
      :pt="{
        input: {
          class: `input__field body__primary ${errorMessage && 'error'}`,
          readonly,
        },
        timePicker: 'time-picker',
      }"
      @update:model-value="handleTimeChange"
    />

    <!-- <ErrorMessage :name="name" class="caption__secondary input__error" /> -->
  </label>
</template>

<script lang="ts">
export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
  },
  emits: ["time-change"],
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
  data() {
    return {
      time: null,
    };
  },
  methods: {
    handleTimeChange(date: Date) {
      this.$emit("time-change", date);
    },
  },
};
</script>
