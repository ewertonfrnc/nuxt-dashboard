<template>
  <BaseCard>
    <div class="container">
      <div class="container__header">
        <div class="container__navigation">
          <button
            type="button"
            class="btn__primary--text"
            @click="$router.back()"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <h2 class="heading__secondary">{{ $route.params.id }}</h2>
        </div>

        <div>
          <BaseButton
            class="btn__danger"
            icon="pi pi-times"
            label="Cancelar fechamento"
          />
        </div>
      </div>

      <div class="container__filter">
        <label class="caption__primary container__filter--label">
          <span class="caption__primary">Data de exibição</span>
          <div class="filter__calendar">
            <BaseDatePicker
              inline-icon
              :selection-mode="'range'"
              @date-handler="() => {}"
            />
          </div>
        </label>

        <div class="container__filter--status">
          <span class="caption__primary">Status</span>
          <p class="body__primary">Enviado</p>
        </div>
      </div>

      <div class="container__table"></div>
    </div>
  </BaseCard>
</template>

<style lang="scss">
.container {
  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--label {
      width: 343px;
    }
  }
}
</style>
