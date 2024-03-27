<template>
  <header class="header">
    <button class="header__toggle" @click="toggleSidebar">
      <i class="pi pi-bars"></i>
    </button>

    <div class="header__breadcrumbs">header__breadcrumbs</div>

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

export default {
  props: {
    toggleSidebar: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
  data() {
    return {
      home: { icon: "pi pi-home", to: "/" },
      items: [{ label: "Fechamento de ponto" }],
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
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

//header {
//  gap: 2rem;
//  margin-bottom: 2rem;
//}
//
//.icon-wrapper {
//  background-color: white;
//  border: none;
//}
//
//.breadcumbs {
//  width: 100%;
//}
//
//:deep(.p-menuitem-icon) {
//  font-size: 1.4rem;
//}
//
//:deep(.p-breadcrumb) {
//  padding: 0.8rem 1.6rem;
//}
</style>
