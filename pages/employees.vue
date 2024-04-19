<template>
  <BaseCard class="fadein animation-duration-500">
    <BaseTabMenu :items="items" />
    <NuxtPage />
  </BaseCard>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        {
          label: "Colaboradores ativos",
          icon: "pi pi-users",
          route: "/employees/active-employees",
        },
        {
          label: "Desativados",
          icon: "pi pi-minus-circle",
          route: "/employees/inactive-employees",
        },
      ],
    };
  },
  created() {
    this.$router.push(this.items[0].route);
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
