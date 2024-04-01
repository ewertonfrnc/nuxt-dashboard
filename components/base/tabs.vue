<script lang="ts">
import { Tabs } from "@/interfaces/tab.interface";

export default {
  props: {
    tabsData: { type: Array<Tabs>, required: true },
  },

  computed: {
    tabs() {
      return this.tabsData.map((tab) => ({
        label: tab.label,
        icon: tab.icon,
        component: tab.component,
      }));
    },
  },
};
</script>

<template>
  <BaseCard>
    <TabView
      select-on-focus
      :pt="{
        navContent: 'nav-content',
        nav: 'tab-list',
        inkbar: 'tab-list__inkbar',
      }"
    >
      <TabPanel
        v-for="(tab, index) in tabs"
        :key="index"
        :pt="{ header: 'tab-panel' }"
      >
        <template #header>
          <div class="tab-list__item">
            <i :class="['pi', tab.icon]" />
            <span class="subtitle__primary">{{ tab.label }}</span>
          </div>
        </template>

        <template #default>
          <div class="tab-list__content">
            <component :is="{ ...tab.component }" />
          </div>
        </template>
      </TabPanel>
    </TabView>
  </BaseCard>
</template>
