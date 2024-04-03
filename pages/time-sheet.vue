<script lang="ts">
import PendingAdjustments from "~/components/time-sheet/pending-adjustments.vue";
import ClockOverview from "~/components/time-sheet/clock-overview.vue";

export default {
  data() {
    return {
      tabs: [
        {
          label: "Ajustes pendentes",
          icon: "pi-pencil",
          component: PendingAdjustments,
        },
        {
          label: "Todos os pontos",
          icon: "pi-users",
          component: ClockOverview,
        },
        {
          label: "Busca avançada",
          icon: "pi-search",
          component: PendingAdjustments,
        },
      ],
    };
  },
};
</script>

<template>
  <BaseTabs class="fadein animation-duration-500" :tabs-data="tabs" />
</template>

<style scoped lang="scss"></style>
