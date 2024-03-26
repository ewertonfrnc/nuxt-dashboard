<template>
  <div class="container">
    <transition name="slide">
      <nav v-show="isSidebarVisible" class="nav">sidebar</nav>
    </transition>

    <div class="content">
      <main class="main">
        <header class="header">
          <div class="header__toggle" @click="toggleSidebar">
            <i class="pi pi-bars"></i>
          </div>

          <div class="header__breadcrumbs">header__breadcrumbs</div>

          <div class="header__avatar">
            <img
              class="header__avatar--img"
              src="https://randomuser.me/api/portraits/women/39.jpg"
              :alt="`Imagem de ${user?.firstName}`"
            />
          </div>
        </header>

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
import { mapState } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

export default {
  data() {
    return {
      isSidebarVisible: true,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
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
  gap: 2rem;
}

.content {
  position: relative;
  width: 100%;
  margin: 1rem 2rem;
  transition: all 0.3s ease-in-out;
}

.header {
  margin-bottom: $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &__toggle {
    cursor: pointer;
    border: 1px solid #e1dfef;
    border-radius: 1rem;
    background-color: $color-neutral-neutral-7;
    padding: 0.8rem;
    box-shadow: $box-shadow;
  }

  &__breadcrumbs {
    flex: 1;
    padding: 0.8rem 1.6rem;
    background-color: $color-neutral-neutral-7;
    box-shadow: $box-shadow;
    border-radius: 1rem;
    border: 1px solid #e1dfef;
  }

  &__avatar {
    width: 4rem;
    height: 4rem;

    &--img {
      max-width: 100%;
      border-radius: 10rem;
    }
  }
}

.nav {
  box-shadow: $box-shadow;

  background-color: $color-neutral-neutral-7;
  padding: 2.4rem 0;
  width: 23rem;
  border: 1px solid $color-surface-surface-4;
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
