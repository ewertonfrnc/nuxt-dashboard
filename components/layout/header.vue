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
          <NuxtLink :to="item.route">
            <i v-if="item.icon" :class="['pi', item.icon]" />
            <span v-if="item.label && item.label !== 'Indicadores'">{{
              item.label
            }}</span>
          </NuxtLink>
        </template>
      </Breadcrumb>
    </div>

    <div class="header__avatar">
      <img
        class="header__avatar--img"
        src="https://randomuser.me/api/portraits/women/39.jpg"
        :alt="`Imagem de ${user?.firstName}`"
      />
    </div>
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
</style>
