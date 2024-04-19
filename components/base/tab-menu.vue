<template>
  <TabMenu
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
</template>

<script lang="ts">
import { TabMenuChangeEvent } from "primevue/tabmenu";
import { TabMenu } from "~/interfaces/tab.interface";

export default {
  props: {
    items: { type: Array<TabMenu>, required: true },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    handleTabChange(event: TabMenuChangeEvent) {
      this.currentTab = event.index;
    },
  },
};
</script>
