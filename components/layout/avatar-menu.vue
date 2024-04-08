<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

export default {
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logUserOut"]),
    logOut() {
      this.logUserOut();
      this.$router.push("/auth");
    },
    handleDarkMode(colorMode: boolean) {
      this.colorMode.preference = colorMode ? "dark" : "light";
      localStorage.setItem("colorPreference", this.colorMode.preference);
    },
  },
};
</script>

<template>
  <div class="menu">
    <div class="menu__info">
      <div class="menu__logo">LOGO</div>

      <div>
        <div class="menu__user">
          <img
            class="menu__user--img"
            :src="user?.image"
            :alt="`Imagem de ${user?.firstName}`"
          />

          <div class="menu__user--info">
            <span
              class="caption__primary"
              v-text="`${user?.firstName}${user?.lastName}`"
            />
            <span class="caption__primary" v-text="user?.email" />
          </div>
        </div>

        <div class="menu__company">
          <h5 class="heading__quinary" v-text="user?.companyName" />
          <span class="caption__primary" v-text="user?.cnpj" />
        </div>
      </div>
    </div>

    <div class="menu__options">
      <div class="menu__options--action">
        <i class="pi pi-moon" />
        <span class="button__secondary">Tema escuro</span>

        <div class="menu__options--switch">
          <BaseInputSwitch
            :checked="colorMode.value === 'dark'"
            @toggle-checkbox="handleDarkMode"
          />
        </div>
      </div>

      <div class="menu__options--action" @click="logOut">
        <i class="pi pi-sign-out" />
        <span class="button__secondary">Sair</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dark-mode .menu {
  background-color: map-get($color-scheme-dark, "$color-neutral-neutral-7");
  color: map-get($color-scheme-dark, "$color-neutral-neutral-0");
  box-shadow: 0 2px #191729cc;
}

.menu {
  border-radius: 1.6rem;
  box-shadow: $box-shadow;
  margin-left: 2.6rem;
  color: map-get($color-scheme-light, "$color-neutral-neutral-0");
  background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");

  &__logo {
    display: grid;
    place-content: center;
  }

  &__info {
    padding: 2.6rem;
    display: flex;
    gap: 2rem;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 1rem;

    &--img {
      max-width: 5.6rem;
      border-radius: 10rem;
    }

    &--info {
      display: flex;
      flex-direction: column;
      color: map-get($color-scheme-light, "$color-neutral-neutral-0");

      span:nth-child(2) {
        color: map-get($color-scheme-light, "$color-neutral-neutral-1");
      }
    }

    .dark-mode &--info {
      color: map-get($color-scheme-dark, "$color-neutral-neutral-0");

      span:nth-child(2) {
        color: map-get($color-scheme-dark, "$color-neutral-neutral-1");
      }
    }
  }

  &__company {
    span {
      color: map-get($color-scheme-light, "$color-neutral-neutral-1");
    }
  }

  .dark-mode &__company span {
    color: map-get($color-scheme-dark, "$color-neutral-neutral-1");
  }

  &__options {
    border-top: 1px solid
      map-get($color-scheme-light, "$color-neutral-neutral-5");

    .pi {
      color: map-get($color-scheme-light, "$color-brand-primary-0");
    }

    &--action {
      position: relative;
      padding: 2.4rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      cursor: pointer;
    }

    &--switch {
      margin-left: auto;
      display: grid;
      place-content: center;
    }
  }

  .dark-mode &__options {
    border-top: 1px solid
      map-get($color-scheme-dark, "$color-neutral-neutral-5");

    .pi {
      color: map-get($color-scheme-dark, "$color-brand-primary-0");
    }
  }
}
</style>
