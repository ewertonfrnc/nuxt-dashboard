<template>
  <div class="login fadein animation-duration-500">
    <h1 class="heading__primary">Indicadores</h1>
    <div class="summary">
      <NuxtLink to="/time-sheet" class="indicator">
        <i class="pi pi-pencil" />
        <div class="indicator__info">
          <h6 class="heading__senary">Ajustes pendentes</h6>
          <UiActivityIndicator v-if="loading" size="small" />

          <p v-else class="heading__primary fadein animation-duration-500">
            {{ indicators.pendingAdjustments }}
          </p>
        </div>
      </NuxtLink>

      <NuxtLink to="/employees" class="indicator">
        <i class="pi pi-users" />
        <div class="indicator__info">
          <h6 class="heading__senary">Colaboradores</h6>
          <UiActivityIndicator v-if="loading" size="small" />

          <p v-else class="heading__primary fadein animation-duration-500">
            {{ indicators.collaborators }}
          </p>
        </div>
      </NuxtLink>

      <NuxtLink to="/time-tracking" class="indicator">
        <i class="pi pi-file" />
        <div class="indicator__info">
          <h6 class="heading__senary">Fechamentos disponíveis</h6>
          <UiActivityIndicator v-if="loading" size="small" />

          <p v-else class="heading__primary fadein animation-duration-500">
            {{ indicators.availableClosings }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <h3 class="heading__tertiary">Outros</h3>
    <div class="summary">
      <NuxtLink to="/" class="indicator">
        <i class="pi pi-sort-alt" />
        <div class="indicator__info">
          <h6 class="heading__senary">Turnover mensal</h6>
          <UiActivityIndicator v-if="loading" size="small" />

          <p v-else class="fadein animation-duration-500">
            <span class="heading__primary">{{
              indicators.monthlyTurnover
            }}</span>
            <span class="body__secondary">%</span>
          </p>
        </div>
      </NuxtLink>

      <NuxtLink to="/" class="indicator">
        <i class="pi pi-sort-alt" />
        <div class="indicator__info">
          <h6 class="heading__senary">Turnover anual</h6>
          <UiActivityIndicator v-if="loading" size="small" />

          <p v-else class="fadein animation-duration-500">
            <span class="heading__primary">{{
              indicators.annualTurnover
            }}</span>
            <span class="body__secondary">%</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(useHomeStore, ["indicators"]),
  },
  async created() {
    await this.getHomeInfo();
  },
  methods: {
    ...mapActions(useHomeStore, ["getIndicators"]),
    async getHomeInfo() {
      this.loading = true;
      try {
        await this.getIndicators();
      } catch (e) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.loader {
  margin-top: 2.75rem;
}

.indicator {
  padding: 1.6rem 1.6rem 1.6rem 0;
  border-radius: 0.8rem;
  transition: transform 0.2s linear;
  border: $border-light;
  box-shadow: $box-shadow-light;
  color: map-get($color-scheme-light, "$color-neutral-neutral-0");
  background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");

  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  cursor: pointer;

  &__info p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  i {
    font-size: 4.4rem;
    justify-self: center;
    color: map-get($color-scheme-light, "$color-neutral-neutral-1");
  }

  &:hover {
    transform: translateY(-0.3rem);
  }
}

.dark-mode .indicator {
  border: $border-dark;
  box-shadow: $box-shadow-dark;
  color: map-get($color-scheme-dark, "$color-neutral-neutral-0");
  background-color: map-get($color-scheme-dark, "$color-neutral-neutral-7");

  i {
    color: map-get($color-scheme-dark, "$color-neutral-neutral-1");
  }
}
</style>
