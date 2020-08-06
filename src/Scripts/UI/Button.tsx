import React from './jsx-dom-shim';

const Button = (
  <button class="button is-primary is-large">
    <span class="icon">
      <i class="mdi mdi-gamepad"></i>
    </span>
    <span>Play</span>
  </button>
) as HTMLElement;

export default Button;
