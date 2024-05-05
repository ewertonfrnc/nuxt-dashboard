import { ref, onMounted, onBeforeUnmount } from "vue";

const mediaQueries = {
  phone: "37.5em",
  modal: "45em",
  "tab-port": "56.25em",
  "tab-land": "75em",
  "big-desktop": "112.5em",
};

export function useWindow(
  size: "phone" | "tab-port" | "tab-land" | "big-desktop" | "modal",
) {
  const matchScreenSize = ref(false);

  function handleResize() {
    if (window.matchMedia(`(max-width: ${mediaQueries[size]})`).matches) {
      matchScreenSize.value = true;
    } else {
      matchScreenSize.value = false;
    }
  }

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { matchScreenSize };
}
