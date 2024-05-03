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
  methods: {
    handleTabChange(event: TabMenuChangeEvent) {
      this.currentTab = event.index;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 2.3rem;
}
</style>
