<template>
  <nav
    :class="[
      'nav',
      isNarrowScreen && 'nav__collapsed',
      mouseover && 'nav__open',
      isNavVisible && 'nav__expanded',
      isMobileScreen && 'nav__mobile',
      isMobileScreen && isNavVisible && 'nav__mobile--visible',
    ]"
    @mouseleave="handleMouseLeave"
    @mouseover="handleMouseOver"
  >
    <button
      v-if="!isNarrowScreen"
      :class="[
        'btn__primary',
        'sidebar__btn',
        !isNavVisible && 'sidebar__btn--collapsed',
      ]"
      @click="toggleSidebar"
    >
      <i class="pi pi-angle-double-right" />
    </button>
    <Menu :model="items">
      <template #start>
        <div class="nav__header">
          <div :class="['logo', (mouseover || isNavVisible) && 'logo-move']">
            <img
              alt="Itera logo"
              class="nav__logo--narrow fadein animation-duration-500"
              src="~/assets/img/logo-narrow.png"
            />
          </div>

          <div :class="['logo', (mouseover || isNavVisible) && 'logo-move']">
            <img
              v-if="colorMode.preference === 'light'"
              alt="Itera logo"
              class="nav__logo fadein animation-duration-500"
              src="~/assets/img/logo-black.png"
            />
            <img
              v-else
              alt="Itera logo"
              class="nav__logo fadein animation-duration-500"
              src="~/assets/img/logo-white.png"
            />
          </div>

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
          active-class="nav__item--active"
          class="nav__item body__secondary"
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
                :tabindex="0"
                :to="subItem.route"
                active-class="nav__item--active"
                class="nav__item nav__item--subitem"
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

<script lang="ts">
import { routes } from "~/utils/routes.utils";

export default {
  props: {
    isNavVisible: { type: Boolean, default: true, required: true },
    isMobileScreen: { type: Boolean, default: true, required: true },
    isNarrowScreen: { type: Boolean, default: false, required: true },
    toggleSidebar: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
  emits: ["close-nav", "mouse-over"],
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  data() {
    return {
      items: routes,
      mouseover: false,
    };
  },
  methods: {
    handleNavigation() {
      this.$emit("close-nav", !this.isNavVisible);
    },
    handleMouseOver() {
      this.mouseover = true;
      this.$emit("mouse-over", this.mouseover);
    },
    handleMouseLeave() {
      this.mouseover = false;
      this.$emit("mouse-over", this.mouseover);
    },
  },
};
</script>
