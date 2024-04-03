<script lang="ts">
import { routes } from "~/utils/routes.utils";

export default {
  props: {
    isNavVisible: { type: Boolean, default: true, required: true },
    isNarrowScreen: { type: Boolean, default: false, required: true },
  },
  emits: ["close-nav"],
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  data() {
    return {
      items: routes,
    };
  },
  methods: {
    handleNavigation() {
      this.$emit("close-nav", !this.isNavVisible);
    },
  },
};
</script>

<template>
  <nav :class="['nav', isNarrowScreen && 'nav__collapsed']">
    <Menu :model="items">
      <template #start>
        <div class="nav__header">
          <img
            v-if="colorMode.preference === 'light'"
            src="~/assets/img/logo-black.png"
            alt="Itera logo"
            class="nav__logo"
          />
          <img
            v-else
            src="~/assets/img/logo-white.png"
            alt="Itera logo"
            class="nav__logo"
          />

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
          class="nav__item body__secondary"
          active-class="nav__item--active"
          @click="handleNavigation"
        >
          <i :class="['pi', item.icon]"></i>
          <span> {{ item.label }} </span>
        </NuxtLink>

        <Accordion v-if="!item.route && item.items" :active-index="0">
          <AccordionTab>
            <template #header>
              <div class="nav__item nav__item--expander">
                <i :class="['pi', item.icon]"></i>
                <span class="body__secondary"> {{ item.label }} </span>

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
                :tabindex="0"
                @click="handleNavigation"
              >
                <i :class="['pi', subItem.icon]"></i>
                <span class="body__secondary"> {{ subItem.label }} </span>
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
