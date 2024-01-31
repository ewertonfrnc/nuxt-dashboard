<template>
  <header class="flex">
    <BaseButton outlined icon="pi pi-bars" class="icon-wrapper" />

    <div class="breadcumbs">
      <Breadcrumb class="text-lg" :home="home" :model="items" />
    </div>

    <div>
      <Avatar icon="pi pi-user" class="mr-2" size="large" shape="circle" />
    </div>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      home: { icon: "pi pi-home", to: "/" },
      items: [{ label: "Fechamento de ponto" }],
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  gap: 2rem;
  margin-bottom: 2rem;
}

.icon-wrapper {
  background-color: white;
  border: none;
}

.breadcumbs {
  width: 100%;
}

:deep(.p-menuitem-icon) {
  font-size: 1.4rem;
}

:deep(.p-breadcrumb) {
  padding: 0.8rem 1.6rem;
}
</style>
