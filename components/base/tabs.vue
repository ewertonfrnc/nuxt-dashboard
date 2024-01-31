<script lang="ts">
import { Tabs } from "@/interfaces/tab.interface";

export default {
  props: {
    tabsData: { type: Array<Tabs>, required: true },
  },
  computed: {
    tabs() {
      return this.tabsData.map((tab) => ({
        title: tab.title,
        icon: tab.icon,
        component: tab.component,
      }));
    },
  },
};
</script>

<template>
  <TabView :pt="{ navContent: 'nav-content', nav: 'tab-list' }">
    <TabPanel
      v-for="(tab, index) in tabs"
      :key="index"
      :pt="{ header: 'tab-panel' }"
    >
      <template #header>
        <div class="flex align-items-center gap-2">
          <i :class="tab.icon"></i>
          <span>{{ tab.title }}</span>
        </div>
      </template>

      <component :is="{ ...tab.component }" />
    </TabPanel>
  </TabView>
</template>
