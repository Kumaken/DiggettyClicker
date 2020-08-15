import React from './jsx-dom-shim';
import './text-style.css';

export const Title = (text: string) =>
  (
    <h1 class="title is-1 has-text-white silk-screen-A">{text}</h1>
  ) as HTMLElement;

export const SubTitle = (text: string) =>
  (
    <h3 class="subtitle is-3 has-text-white silk-screen-A">{text}</h3>
  ) as HTMLElement;

export const StatsText = (text: string | number) =>
  (<span class="tag is-danger is-medium ">{text}</span>) as HTMLElement;
