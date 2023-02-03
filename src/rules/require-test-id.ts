import { getTemplateParserServices } from '@angular-eslint/utils';
import { TmplAstElement } from '@angular-eslint/bundled-angular-compiler';
import { JSONSchema } from '@typescript-eslint/utils';
import { createRule } from '../utils/create-rule';

export type Options = readonly [
  {
    readonly overrideElements?: readonly string[];
    readonly addElements?: readonly string[];
    readonly attribute: string;
  }
];

export const MESSAGE_ID = 'requireTestId';
export const RULE_NAME = 'require-test-id';
export const SCHEMA: JSONSchema.JSONSchema4 = [
  {
    type: 'object',
    properties: {
      overrideElements: {
        type: "array",
        items: {
          type: "string"
        }
      },
      addElements: {
        type: "array",
        items: {
          type: "string"
        }
      },
      attribute: {
        type: "string"
      },
    },
    additionalProperties: false,
  },
];

const defaultOptions: Options = [
  {
    overrideElements: [
      'button', 'tr', 'input', 'select', 'textarea',
      'mat-select', 'mat-option',
    ],
    attribute: 'data-test',
  },
];

export default createRule<Options, typeof MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensures that elements have test ids',
      recommended: false,
    },
    schema: SCHEMA,
    messages: {
      [MESSAGE_ID]: 'Element {{element}} should have attribute {{attribute}}',
    },
  },
  defaultOptions,
  create(context) {
    const options = [
      {
        ...defaultOptions[0],
        ...context.options[0],
      }
    ];

    const elements = options[0].addElements?.length
      ? [...options[0].overrideElements || [], ...options[0].addElements]
      : options[0].overrideElements;

    const selector = makeSelector(elements || []);
    const parserServices = getTemplateParserServices(context as any);

    return {
      [selector]: (element: TmplAstElement) => {
        if (isAttributePresentInElement(element, options[0].attribute)) return;

        context.report({
          loc: parserServices.convertNodeSourceSpanToLoc(element.sourceSpan),
          messageId: MESSAGE_ID,
          data: {
            element: element.name,
            attribute: options[0].attribute,
          },
        });
      }
    }
  },
});

function makeSelector(elements: readonly string[]): string {
  return elements.map(element => `Element$1[name=${element}]`).join(', ');
}

function isAttributePresentInElement(element: TmplAstElement, attribute: string) {
  return element.inputs.some(input => input.name === attribute)
    || element.attributes.some(attr => attr.name === attribute);
}
