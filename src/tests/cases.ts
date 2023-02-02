import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { MESSAGE_ID } from '../rules/require-test-ids';

const messageId = MESSAGE_ID;

export const valid = [
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
    options: [
      { 
        elements: ['button', 'section'],
        attribute: 'data-test',
      },
      { 
        elements: ['img'],
        attribute: 'alt',
      },
    ],
  },
];

export const invalid = [
  convertAnnotatedSourceToFailureCase({
    messageId,
    description:
      'should fail if attribute is not specified on element',
    annotatedSource: `
        <section id="test"></section>
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
    options: [
      {
        elements: ['button', 'section'],
        attribute: 'data-test',
      },
    ],
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
    options: [
      {
        elements: ['button'],
        attribute: 'data-test',
      },
    ],
    data: {
      element: 'button',
      attribute: 'data-test',
    }
  }),
];
