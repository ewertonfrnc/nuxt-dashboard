# Base Project - Nuxt 3

Base project to be used by [Usemobile]'s frontend developers using Nuxt 3.

## Tech

This project requires the following technologies to work properly:

- [Nuxt] - The Intuitive Web Framework;
- [PrimeVue] - A rich set of open source UI components for Vue.

## Guides

You'll find instructions to use components, create pages, setup route middlewares, pinia store, among other things on `./guides`.

## Installation

To run, this project requires [Node.js] v16+ to run.
Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Testing:

Tests can be on either on `./components/__tests__` or `./tests` folders. However, the `./tests` folder is the recommended folder to insert your testing files.

Using vue [test-utils] for unit testing. Please, follow these [test-guidelines] on your tests. 😉

[node.js]: http://nodejs.org
[Usemobile]: https://usemobile.com.br/
[Nuxt]: https://nuxt.com/
[PrimeVue]: https://primevue.org/
[test-utils]: https://test-utils.vuejs.org
[test-guidelines]: https://test-utils.vuejs.org/guide/essentials/easy-to-test.html
