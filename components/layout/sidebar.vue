<script lang="ts">
import { routes } from "~/utils/routes.utils";

export default {
  data() {
    return {
      items: routes,
    };
  },
};
</script>

<template>
  <nav class="nav">
    <Menu :model="items">
      <template #start>
        <div class="nav__header">
          <img src="~/assets/img/LOGO.png" alt="Itera logo" class="nav__logo" />

          <span class="caption__secondary"
            >Usemobile Soluções em Tecnologia</span
          >
          <span class="caption__primary">01.270.742/0001-08</span>
        </div>
      </template>

      <template #submenuheader="{ item }">
        <div class="nav__item nav__menuheader">
          <h6 class="heading__senary">{{ item.label }}</h6>
        </div>
      </template>

      <template #item="{ item }">
        <NuxtLink
          v-if="item.route && !item.items"
          :to="item.route"
          class="nav__item"
          active-class="nav__item--active"
        >
          <i :class="['pi', item.icon]"></i>
          <span class="body__primary"> {{ item.label }} </span>
        </NuxtLink>

        <Accordion v-if="!item.route && item.items" :active-index="0">
          <AccordionTab>
            <template #header>
              <div class="nav__item nav__item--expander">
                <i :class="['pi', item.icon]"></i>
                <span class="body__primary"> {{ item.label }} </span>

                <span class="nav__item--icon">
                  <i class="pi pi-angle-down" />
                </span>
              </div>
            </template>

            <template #headericon />

            <template #default>
              <NuxtLink
                v-for="(subItem, index) in item.items"
                :key="index"
                :to="subItem.route"
                class="nav__item nav__item--subitem"
                active-class="nav__item--active"
              >
                <i :class="['pi', subItem.icon]"></i>
                <span class="body__primary"> {{ subItem.label }} </span>
              </NuxtLink>
            </template>
          </AccordionTab>
        </Accordion>
      </template>
    </Menu>

    <div class="nav__footer">
      <span class="body__secondary">v1.0</span>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  box-shadow: $box-shadow;

  background-color: $color-neutral-neutral-7;
  padding: 2.4rem 0;
  width: 26rem;
  border: 1px solid $color-surface-surface-4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__header {
    padding: 0 1.6rem;
    margin-bottom: 1rem;

    span {
      display: inline-block;
    }
  }

  &__item {
    padding: 0.8rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: $color-neutral-neutral-0;
    transition: all 0.2s ease;

    h6 {
      color: $color-brand-primary-4;
    }

    &--active,
    &:not(.nav__menuheader):hover {
      background-color: $color-brand-primary-1;
      color: $color-brand-primary-0;
      cursor: pointer;
    }

    &--icon {
      margin-left: auto;
    }

    &--subitem {
      padding: 0.8rem 1.6rem 0.8rem 3rem;
    }

    span {
      font-weight: 500;
    }
  }

  &__footer {
    padding: 0.8rem 1.6rem;
  }

  &__logo {
    max-width: 100%;
  }
}
</style>
