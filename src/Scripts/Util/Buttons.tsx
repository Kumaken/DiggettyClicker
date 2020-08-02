import { React } from '../app';
import { ReactElement } from 'react';

const button = (text: string) => {
  return (<button class="button is-large">{text}</button>) as ReactElement;
};

const primaryButton = (text: string) => {
  return (
    <button class="button is-primary is-large">{text}</button>
  ) as ReactElement;
};

const successButton = (text: string) => {
  return <button class="button is-success is-large">{text}</button>;
};

const infoButton = (text: string) => {
  return <button class="button is-info is-large">{text}</button>;
};

const warningButton = (text: string) => {
  return <button class="button is-warning is-large">{text}</button>;
};

const dangerButton = (text: string) => {
  return <button class="button is-danger is-large">{text}</button>;
};

const testButton = () => {
  return (<p>aaaa</p>) as any;
};

export default button;

export {
  primaryButton,
  successButton,
  infoButton,
  warningButton,
  dangerButton,
  testButton
};
