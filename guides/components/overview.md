# Using and Creating Components

## Using Components

All components created within the `./components` directory are used in the template of your Single File Component (SFC) with the prefix `<Base...>`. For instance, the `Button.vue` component should be used as `<BaseButton>` within your HTML. This rule applies to both existing components and those created during your development.

## Creating Components

Existing components are built from the unstyled components of PrimeVue and are styled using classes inserted into the `:pt={}` property of PrimeVue components. Refer to the PrimeVue components page to identify the properties that can be accessed for each component.

```html
<BaseButton :pt="{ root: 'btn' }" />
```

## Styling with BEM and Sass

### BEM Methodology:

When creating classes for your components, it's recommended to follow the BEM (Block Element Modifier) methodology for a consistent and maintainable styling approach.

### Sass Stylesheet:
For styling components, create an `.scss` file with the name of the component and import it in your `main.scss` file to apply styles during development.

Example file structure:

`./assets/scss/components/_button.scss`

```scss
.btn {
  // Your styles for the Button component

  &__icon {
    // Styles for the icon within the Button component

    &--primary {
      // Styles for the primary variant of the Button component
    }
  }
}
```

`./assets/scss/main.scss`

```scss
// ...other imports...
@import 'components/button';
```
