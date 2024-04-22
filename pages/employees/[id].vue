<template>
  <BaseCard>
    <div class="container">
      <div class="header">
        <div class="header__navigation">
          <button type="button" class="btn__primary--text" @click="goBack">
            <i class="pi pi-arrow-left"></i>
          </button>
          <h2 class="heading__secondary">Perfil</h2>
        </div>

        <BaseButton class="btn__primary" label="Opções" />
      </div>

      <div class="info">
        <img
          class="info__img"
          src="https://randomuser.me/api/portraits/women/39.jpg"
          alt="user"
        />

        <div class="info__name">
          <h4 class="heading__quaternary">Ana Maria Martins Rocha</h4>
          <h5 class="heading__quinary">Nutricionista</h5>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  button {
    width: 12.4rem;
  }

  &__navigation {
    display: flex;
    align-items: center;
    margin-right: auto;

    button {
      width: 4.4rem;
      height: 4.4rem;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-family: inherit;
      cursor: pointer;
      margin-right: 1rem;
    }
  }
}

.info {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin: 23px 10px 0;

  &__img {
    width: 64px;
    height: 64px;
    border-radius: 72px;
  }

  &__name h5 {
    color: map-get($color-scheme-light, "$color-neutral-neutral-2");
  }
}
</style>
