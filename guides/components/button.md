## Description

The Button component is a customizable button that accepts properties to set the label, icon, and loading state. It is implemented in Vue.js, using TypeScript to ensure type safety for the properties.

## Usage

```html
<BaseButton class="btn__primary" label="Concluir" @onclick="yourFunction" />
```

## Properties

The Button component accepts the following properties:

- **label** (String, optional): Sets the button label.
- **icon** (String, optional): Sets the button icon.
- **loading** (Boolean, optional): Sets whether the button is in a loading state.

## Button Classes

Use one of the following already made classes:

#### Primary

- Default: btn\_\_primary
- Outlined: btn\_\_primary--outlined
- Disabled: btn\_\_primary (with **disabled** attribute)
- Text: btn\_\_primary--text

#### Secondary

- Default: btn\_\_secondary
- Outlined: btn\_\_secondary--outlined
- Disabled: btn\_\_secondary--text (with **disabled** attribute)
- Text: btn\_\_secondary--text

#### Success

- Default: btn\_\_success
- Outlined: btn\_\_success--outlined
- Disabled: btn\_\_success--outlined (with **disabled** attribute)
- Text: btn\_\_success--text

#### Danger

- Default: btn\_\_danger
- Outlined: btn\_\_danger--outlined
- Disabled: btn\_\_danger--outlined (with **disabled** attribute)
- Text: btn\_\_danger--text

#### Warning

- Default: btn\_\_warning
- Outlined: btn\_\_warning--outlined
- Disabled: btn\_\_warning--outlined (with **disabled** attribute)
- Text: btn\_\_warning--text

#### Info

- Default: btn\_\_info
- Outlined: btn\_\_info--outlined
- Disabled: btn\_\_info--outlined (with **disabled** attribute)
- Text: btn\_\_info--text
