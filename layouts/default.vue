<template>
  <div class="container fadein animation-duration-500">
    <transition name="slide">
      <LayoutSidebar v-if="isSidebarVisible" />
    </transition>

    <div class="content">
      <main class="main">
        <LayoutHeader :toggle-sidebar="toggleSidebar" :route-path="path" />

        <BaseToast />
        <slot />
      </main>

      <footer class="footer">
        <p class="caption__primary">
          <strong>Itera Ponto Eletrônico®️</strong> desenvolvido por
          <strong>Usemobile</strong>
        </p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isSidebarVisible: true,
      path: "",
    };
  },
  updated() {
    this.path = this.$route.path;
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: $color-surface-surface-5;
  transition: all 0.3s ease-in-out;

  display: flex;
  gap: 1rem;
}

.content {
  position: relative;
  width: 100%;
  margin: 1rem 2rem;
  transition: all 0.3s ease-in-out;
}

.main {
  width: 100%;
}

.footer {
  background: $color-neutral-neutral-7;
  border: 1px solid $color-surface-surface-4;
  padding: 0.8rem;
  text-align: right;

  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 1rem;
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
