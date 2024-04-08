<template>
  <header class="header">
    <button class="header__toggle" @click="toggleSidebar">
      <i class="pi pi-bars"></i>
    </button>

    <div class="header__breadcrumbs">
      <Breadcrumb
        :home="home"
        :model="items"
        :pt="{
          root: 'breadcumb',
          menu: 'breadcumb__menu',
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
        class="header__avatar--img"
        src="https://randomuser.me/api/portraits/women/39.jpg"
        :alt="`Imagem de ${user?.firstName}`"
      />
    </button>

    <OverlayPanel ref="op">
      <div class="menu">
        <div class="menu__info">
          <div class="menu__logo">LOGO</div>

          <div>
            <div class="menu__user">
              <img
                class="menu__user--img"
                src="https://randomuser.me/api/portraits/women/39.jpg"
                :alt="`Imagem de ${user?.firstName}`"
              />

              <div class="menu__user--info">
                <span class="caption__primary">Felipe Xavier</span>
                <span class="caption__primary"
                  >felipe.xavier@usemobile.com.br</span
                >
              </div>
            </div>

            <div class="menu__company">
              <h5 class="heading__quinary">Usemobile Soluções em Tecnologia</h5>
              <span class="caption__primary">01.270.742/0001-08</span>
            </div>
          </div>
        </div>

        <div class="menu__options">
          <div class="menu__options--action">
            <i class="pi pi-moon" />
            <span class="button__secondary">Tema escuro</span>

            <div class="menu__options--switch">
              <BaseInputSwitch />
            </div>
          </div>

          <div class="menu__options--action">
            <i class="pi pi-sign-out" />
            <span class="button__secondary">Sair</span>
          </div>
        </div>
      </div>
    </OverlayPanel>
  </header>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { PropType } from "vue";
import { useAuthStore } from "~/stores/auth.store";
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
      checked: true,
      home: { icon: "pi pi-home", route: "/" },
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    items() {
      const routeAndLabel = findRouteAndLabel(routes, this.routePath);
      return [routeAndLabel];
    },
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: $color-neutral-neutral-7;
  border-radius: 1.6rem;
  box-shadow: $box-shadow;
  margin-left: 2.6rem;

  &__logo {
    display: grid;
    place-content: center;
  }

  &__info {
    padding: 2.6rem;
    display: flex;
    gap: 2rem;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 1rem;

    &--img {
      max-width: 5.6rem;
      border-radius: 10rem;
    }

    &--info {
      display: flex;
      flex-direction: column;

      span:nth-child(2) {
        color: $color-neutral-neutral-1;
      }
    }
  }

  &__options {
    border-top: 1px solid $color-neutral-neutral-5;

    &--action {
      position: relative;
      padding: 2.4rem;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    &--switch {
      margin-left: auto;
    }
  }
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
