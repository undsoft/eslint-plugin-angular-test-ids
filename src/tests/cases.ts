import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { MESSAGE_ID } from '../rules/require-test-id';

const messageId = MESSAGE_ID;

export const valid = [
  {
    code: `
        <button [attr.data-test]="buttonId">Button 1</button>
        <button data-test="test-button-2">Button 2</button>
        <img src="https://angular.io/angular.svg" alt="Angular Logo">
        <img src="https://angular.io/angular.svg" [alt]="'Angular Logo' | translate">
        <img src="https://angular.io/angular.svg" [attr.alt]="'Angular Logo' | translate">
    `,
  },
  {
    code: `
      <section data-test="test-section-buttons">
        <button [attr.data-test]="buttonId">Button 1</button>
        <button data-test="test-button-2">Button 2</button>
      </section>
      <section data-test="test-section-img">
        <img src="https://angular.io/angular.svg" alt="Angular Logo">
        <img src="https://angular.io/angular.svg" [alt]="'Angular Logo' | translate">
        <img src="https://angular.io/angular.svg" [attr.alt]="'Angular Logo' | translate">
      </section>
      <div></div>
    `,
    options: [{
      addElements: ['section'],
    }]
  },
  {
    code: `
      <section data-test-id="test-section-buttons"></section>
      <div></div>
    `,
    options: [{
      addElements: ['section'],
      attribute: 'data-test-id',
    }]
  },
];

export const invalid = [
  convertAnnotatedSourceToFailureCase({
    messageId,
    description:
      'should fail if attribute is not specified on element when addElements is used',
    annotatedSource: `
        <section id="test"></section>
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
    options: [{
      addElements: ['section'],
    }],
    data: {
      element: 'section',
      attribute: 'data-test',
    }
  }),
  convertAnnotatedSourceToFailureCase({
    messageId,
    description:
      'should fail if attribute is not specified on element with no attributes',
    annotatedSource: `
      <button></button>
      ~~~~~~~~~~~~~~~~~
    `,
    data: {
      element: 'button',
      attribute: 'data-test',
    }
  }),
  convertAnnotatedSourceToFailureCase({
    messageId,
    description:
      'should fail if attribute is not specified when using custom attribute',
    annotatedSource: `
      <button data-test="my-test"></button>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
    options: [{
      attribute: 'data-test-id',
    }],
    data: {
      element: 'button',
      attribute: 'data-test-id',
    }
  }),
  convertAnnotatedSourceToFailureCase({
    messageId,
    description:
      'should fail if attribute is not specified when using overrideElements',
    annotatedSource: `
      <button data-test="my-test"></button>
      <div></div>
      ~~~~~~~~~~~
    `,
    options: [{
      overrideElements: ['div'],
    }],
    data: {
      element: 'div',
      attribute: 'data-test',
    }
  }),
];
