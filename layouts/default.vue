<template>
  <div ref="container" class="container fadein animation-duration-500">
    <div
      v-if="isSidebarVisible && isNarrowScreen"
      class="mask fadein animation-duration-500"
      @click="isSidebarVisible = false"
    />
    <transition name="slide">
      <LayoutSidebar
        v-if="isSidebarVisible"
        :is-nav-visible="isSidebarVisible"
        :is-narrow-screen="isNarrowScreen"
        @close-nav="handleNarrowNavigation"
      />
    </transition>

    <main class="main">
      <LayoutHeader :toggle-sidebar="toggleSidebar" :route-path="path" />
      <BaseToast />
      <slot />

      <footer class="footer">
        <p class="caption__primary">
          <strong>Itera Ponto Eletrônico®️</strong> desenvolvido por
          <strong>Usemobile</strong>
        </p>
      </footer>
    </main>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";

export default {
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  data() {
    return {
      isNarrowScreen: false,
      isSidebarVisible: true,
      path: "",
    };
  },
  computed: {
    ...mapState(useHomeStore, ["colorPreference"]),
  },
  created() {
    const colorMode = localStorage.getItem("colorPreference");
    this.colorMode.preference = colorMode || this.colorPreference;
  },
  updated() {
    this.path = this.$route.path;
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleResize() {
      if (window.matchMedia("(max-width: 56.25em)").matches) {
        this.isNarrowScreen = true;
        this.isSidebarVisible = false;
      } else {
        this.isNarrowScreen = false;
        this.isSidebarVisible = true;
      }
    },
    handleNarrowNavigation() {
      if (this.isNarrowScreen) {
        this.isSidebarVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dark-mode .container {
  background: map-get($color-scheme-dark, "$color-surface-surface-5");
}

.container {
  position: relative;
  height: 100vh;
  transition: all 0.3s ease-in-out;
  background: map-get($color-scheme-light, "$color-surface-surface-5");

  display: flex;
  gap: 1rem;
}

.content {
  transition: all 0.3s ease-in-out;
}

.main {
  width: 100%;
  max-height: 100vh;
  overflow: auto;
  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;
}

.footer {
  background: map-get($color-scheme-light, "$color-neutral-neutral-7");
  border: 1px solid map-get($color-scheme-light, "$color-surface-surface-4");
  padding: 0.8rem;
  text-align: right;
  border-radius: 1rem;
  margin-top: auto;
}

.dark-mode .footer {
  background: map-get($color-scheme-dark, "$color-neutral-neutral-7");
  border: 1px solid map-get($color-scheme-dark, "$color-surface-surface-4");
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
