<template>
  <TabMenu
    :model="items"
    :active-index="currentTab"
    :pt="{
      root: 'tab-list',
      inkbar: 'tab-list__inkbar',
    }"
    @tab-change="handleTabChange"
  >
    <template #item="{ item }">
      <div class="tab-list__item">
        <i :class="item.icon"></i>
        <p class="subtitle__primary">{{ item.label }}</p>
      </div>
    </template>
  </TabMenu>

  <section>
    <component :is="{ ...items[currentTab].component }" />
  </section>
</template>

<script lang="ts">
import { TabMenuChangeEvent } from "primevue/tabmenu";
import { Tabs } from "~/interfaces/tab.interface";

export default {
  props: {
    items: { type: Array<Tabs>, required: true },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  mounted() {
    this.currentTab = Number(sessionStorage.getItem("current-tab"));
  },
  beforeUnmount() {
    sessionStorage.removeItem("current-tab");
  },
  methods: {
    handleTabChange(event: TabMenuChangeEvent) {
      this.currentTab = event.index;
      sessionStorage.setItem("current-tab", String(this.currentTab));
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 2.3rem;
}
</style>
