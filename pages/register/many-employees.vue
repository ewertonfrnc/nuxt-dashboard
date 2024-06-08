<template>
  <RegisterBatchTable
    v-if="currentPage === 'table'"
    @change-page="changeRegisterPage"
  />
  <RegisterSuccessPage v-else :success-info="successInfo" />
</template>

<script lang="ts">
const registerPages = ["table", "success"];

type PageOptions = {
  page: string;
  params: { registedEmployees: number; needReview: number };
};

export default {
  data() {
    return {
      currentPage: "table",
      successInfo: {},
    };
  },
  methods: {
    changeRegisterPage(page: PageOptions) {
      if (!registerPages.includes(page.page)) return;
      this.currentPage = page.page;
      this.successInfo = page.params;
    },
  },
};
</script>

<style lang="scss" scoped></style>
