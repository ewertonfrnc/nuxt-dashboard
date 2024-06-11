<template>
  <BaseCard class="success">
    <div class="header">
      <div class="header__navigation">
        <button
          type="button"
          class="btn__primary--text"
          @click="$router.back()"
        >
          <i class="pi pi-arrow-left"></i>
        </button>

        <h2 class="heading__secondary">Cadastrar vários colaboradores</h2>
      </div>
    </div>

    <p class="body__primary success__register">
      {{ successInfo.registedEmployees }} colaboradores cadastrados com sucesso!
    </p>

    <div class="success__cta">
      <span class="body__primary success__warn"
        >{{ successInfo.needReview }} colaboradores não cadastrados.</span
      >

      <div>
        <BaseButton
          icon="pi pi-download"
          label="Baixar arquivo com pendências"
          class="btn__primary"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
export default {
  props: {
    successInfo: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
.success {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__register {
    color: map-get($color-scheme-light, "$color-feedback-success-0");
  }

  &__warn {
    color: map-get($color-scheme-light, "$color-feedback-warning-0");
  }

  &__cta {
    width: 625px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 11px;
    padding: 16px;
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-6");
  }
}

.dark-mode .success {
  &__register {
    color: map-get($color-scheme-dark, "$color-feedback-success-0");
  }

  &__warn {
    color: map-get($color-scheme-dark, "$color-feedback-warning-0");
  }

  &__cta {
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-6");
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__navigation {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      cursor: pointer;
      transition: all 0.3s;
    }
  }

  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    button {
      width: max-content;
    }
  }
}
</style>
