<template>
  <header class="header">
    <button v-if="showNavButton" class="header__toggle" @click="toggleSidebar">
      <i class="pi pi-bars"></i>
    </button>

    <div class="header__breadcrumbs">
      <Breadcrumb
        :home="home"
        :model="items"
        :pt="{
          root: 'breadcumb',
          menu: 'breadcumb__menu',
          menuitem: 'breadcumb__item',
        }"
      >
        <template #item="{ item }">
          <NuxtLink :to="item.route" class="fadein animation-duration-500">
            <i v-if="item.icon" :class="['pi', item.icon]" />
            <span v-if="item.label && item.label !== 'Indicadores'">{{
              item.label
            }}</span>
          </NuxtLink>
        </template>
      </Breadcrumb>
    </div>

    <button class="header__avatar" @click="toggle">
      <img
        :src="user?.image"
        alt="Imagem do usuário"
        class="header__avatar--img"
      />
    </button>

    <OverlayPanel ref="op" class="fadein animation-duration-150">
      <LayoutAvatarMenu />
    </OverlayPanel>
  </header>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { PropType } from "vue";
import { findRouteAndLabel, routes } from "~/utils/routes.utils";

export default {
  props: {
    toggleSidebar: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
    routePath: { type: String, required: true },
  },
  data() {
    return {
      showNavButton: false,
      home: { icon: "pi pi-home", route: "/" },
    };
  },
  mounted() {
    this.handleNavButton();
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    items() {
      const routeAndLabel = findRouteAndLabel(routes, this.routePath);
      return [routeAndLabel];
    },
  },
  methods: {
    handleNavButton() {
      this.showNavButton = window.matchMedia("(max-width: 37.5em)").matches;
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &__toggle {
    cursor: pointer;
    border-radius: 1rem;
    padding: 0.8rem;
    box-shadow: $box-shadow-light;
    border: 1px solid map-get($color-scheme-light, "$color-surface-surface-4");
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");
    color: map-get($color-scheme-light, "$color-neutral-neutral-1");
  }

  .dark-mode &__toggle {
    box-shadow: 0 0.2rem 1rem #191729;
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
    border: 1px solid map-get($color-scheme-dark, "$color-surface-surface-4");
    color: map-get($color-scheme-dark, "$color-neutral-neutral-1");
  }

  &__breadcrumbs {
    flex: 1;
    padding: 0.8rem 1.6rem;
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");
    box-shadow: $box-shadow-light;
    border-radius: 1rem;
    border: 1px solid #e1dfef;
  }

  .dark-mode &__breadcrumbs {
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
    box-shadow: 0 0.2rem 1rem #191729;
    border: 1px solid #282534;
  }

  &__avatar {
    width: 4rem;
    height: 4rem;
    border: none;
    background: transparent;
    border-radius: 10rem;
    cursor: pointer;

    &--img {
      max-width: 100%;
      border-radius: 10rem;
    }
  }
}
</style>
