export function useToggle(initialValue: boolean = false) {
  const isVisible = ref(initialValue);

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };

  return {
    isVisible,
    toggleVisibility,
  };
}
