<template>
  <TabMenu
    :active-index="currentTab"
    :model="items"
    :pt="{
      root: 'tab-list',
      inkbar: 'tab-list__inkbar',
    }"
    @tab-change="handleTabChange"
  >
    <template #item="{ item }">
      <NuxtLink :to="item.route" class="tab-list__item">
        <i :class="item.icon"></i>
        <p class="subtitle__primary">{{ item.label }}</p>
      </NuxtLink>
    </template>
  </TabMenu>

  <component :is="{ ...items[currentTab].component }" />
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
  created() {
    this.currentTab = Number(sessionStorage.getItem("current-tab"));
  },
  methods: {
    handleTabChange(event: TabMenuChangeEvent) {
      this.currentTab = event.index;
      sessionStorage.setItem("current-tab", String(this.currentTab));
    },
  },
};
</script>
