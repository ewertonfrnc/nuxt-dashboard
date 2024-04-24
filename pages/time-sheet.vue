<script lang="ts">
import PendingAdjustments from "~/components/time-sheet/pending-adjustments.vue";
import ClockOverview from "~/components/time-sheet/clock-overview.vue";

export default {
  setup() {
    useSeoMeta({ title: "Pontos" });
  },
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
      ],
    };
  },
};
</script>

<template>
  <BaseTabs :tabs-data="tabs" class="fadein animation-duration-500" />
</template>

<style lang="scss" scoped></style>
