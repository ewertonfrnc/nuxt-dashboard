<template>
  <div ref="container" class="container fadein animation-duration-500">
    <div
      v-if="sidebarExpanded && isNarrowScreen"
      class="mask fadein animation-duration-500"
      @click="sidebarExpanded = false"
    />
    <transition name="slide">
      <div class="sidebar">
        <LayoutSidebar
          :is-nav-visible="sidebarExpanded"
          :is-narrow-screen="isNarrowScreen"
          @close-nav="handleNarrowNavigation"
          @mouse-over="handleMouseover"
        />
      </div>
    </transition>

    <section :class="['section', sidebarExpanded && 'section__adapted']">
      <LayoutHeader :toggle-sidebar="toggleSidebar" :route-path="path" />
      <BaseToast />
      <slot />

      <footer class="footer">
        <p class="caption__primary">
          <strong>Itera Ponto Eletrônico®️</strong> desenvolvido por
          <strong>Usemobile</strong>
        </p>
      </footer>
    </section>
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
      mouseover: false,
      isNarrowScreen: false,
      sidebarExpanded: false,
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
    handleMouseover(isMouseover: boolean) {
      this.mouseover = isMouseover;
    },
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded;
    },
    handleResize() {
      if (window.matchMedia("(max-width: 56.25em)").matches) {
        this.isNarrowScreen = true;
        this.sidebarExpanded = false;
      } else {
        this.isNarrowScreen = false;
        this.sidebarExpanded = true;
      }
    },
    handleNarrowNavigation() {
      if (this.isNarrowScreen) {
        this.sidebarExpanded = false;
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
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  background: map-get($color-scheme-light, "$color-surface-surface-5");
}
.content {
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.section {
  height: 100vh;
  margin-left: 5.25rem;
  transition: margin-left 0.3s cubic-bezier(0, 0, 0.2, 1);
  overflow-x: hidden;
  padding: 2rem;

  display: flex;
  flex-direction: column;

  &__adapted {
    margin-left: 25rem;
  }
}

.sidebar {
  position: relative;
}
.close-btn {
  display: grid;
  place-content: center;
  width: 1.4rem;
  height: 1.4rem;
  padding: 1.6rem;
  border-radius: 1.6rem;
  cursor: pointer;
  background-color: map-get($color-scheme-light, "$color-brand-primary-0");
  color: map-get($color-scheme-light, "$color-neutral-neutral-7");
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  z-index: 9999;
  position: fixed;
  top: 10%;
  left: 3%;

  &-expanded {
    left: 18.6%;
  }
}

.dark-mode .close-btn {
  background-color: map-get($color-scheme-dark, "$color-brand-primary-0");
  color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
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
