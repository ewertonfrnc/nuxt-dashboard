<template>
  <BaseCard class="fadein animation-duration-500">
    <BaseTabMenu :items="items" />
    <NuxtPage />
  </BaseCard>
</template>

<script lang="ts">
import ActiveEmployees from "~/components/employees/active-employees.vue";
import InactiveEmployees from "~/components/employees/inactive-employees.vue";

export default {
  data() {
    return {
      items: [
        {
          label: "Colaboradores ativos",
          icon: "pi pi-users",
          component: ActiveEmployees,
        },
        {
          label: "Desativados",
          icon: "pi pi-minus-circle",
          component: InactiveEmployees,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
