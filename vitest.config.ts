import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    coverage: { provider: 'v8' },
    environment: 'jsdom',
  },
});

// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { defineConfig } from 'vitest/config';
// import Vue from '@vitejs/plugin-vue';

// export default defineConfig({
//   plugins: [
//     Vue(),
//     AutoImport({
//       imports: ['vue', 'vue-router'],
//       dirs: ['./composables'],
//       vueTemplate: true,
//     }),
//     Components({
//       dirs: ['./components/'],
//       dts: true,
//       directoryAsNamespace: true,
//     }),
//   ],
//   test: {
//     globals: true,
//     coverage: { provider: 'v8' },
//     environment: 'jsdom',
//   },
// });
