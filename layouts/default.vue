<template>
  <div class="container">
    <nav class="nav">sidebar</nav>

    <div class="content">
      <main class="main">
        <header class="header">header</header>
        <BaseToast />
        <slot />
      </main>

      <footer class="footer">
        <p class="caption__primary">
          <strong>Itera Ponto Eletrônico®️</strong> desenvolvido por
          <strong>Usemobile</strong>
        </p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: $color-surface-surface-5;

  display: flex;
  gap: 2rem;
}

.content {
  position: relative;
  width: 100%;
  margin: 1rem 2rem;
}

.header {
  border: 1px solid $color-surface-surface-4;
  border-radius: 1rem;
  background-color: $color-neutral-neutral-7;
  padding: 0.8rem 1.6rem;
  margin-bottom: $spacing-lg;
}

.nav {
  background-color: $color-neutral-neutral-7;
  padding: 2.4rem 0;
  width: 23rem;
  border: 1px solid $color-surface-surface-4;
}

.main {
  width: 100%;
}

.footer {
  background: $color-neutral-neutral-7;
  border: 1px solid $color-surface-surface-4;
  padding: 0.8rem;
  text-align: right;

  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 1rem;
}
</style>
