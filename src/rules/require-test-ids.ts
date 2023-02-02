import { createESLintRule } from '@angular-eslint/eslint-plugin-template';
import { getTemplateParserServices } from '@angular-eslint/utils';
import { TmplAstElement } from '@angular-eslint/bundled-angular-compiler';
import { JSONSchema } from '@typescript-eslint/utils';

interface Options {
  elements: string[];
  attribute: string;
}

export const MESSAGE_ID = 'requireAttributeOnElements';
export const RULE_NAME = 'require-attribute-on-elements';
export const SCHEMA: JSONSchema.JSONSchema4 = {
  type: 'object',
  properties: {
    elements: {
      type: "array",
      items: {
        type: "string"
      }
    },
    attribute: {
      type: "string"
    },
  }
};

export default createESLintRule<Options, typeof MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensures that element has specific directive or attribute',
      recommended: false,
    },
    schema: SCHEMA,
    messages: {
      [MESSAGE_ID]: 'Element {{element}} should have attribute {{attribute}}',
    },
  },
  defaultOptions: {
    elements: [
      'button', 'tr', 'input', 'select', 'textarea',
      'mat-select', 'mat-option',
    ],
    attribute: 'test-id',
  },
  create(context) {
    const options = context.options;
    const selector = makeSelector(options);
    const parserServices = getTemplateParserServices(context);

    return {
      [selector]: (element: TmplAstElement) => {
        if (isAttributePresentInElement(element, options.attribute)) return;

        context.report({
          loc: parserServices.convertNodeSourceSpanToLoc(element.sourceSpan),
          messageId: MESSAGE_ID,
          data: {
            element: element.name,
            attribute: options.attribute,
          },
        });
      }
    }
  },
});

function makeSelector(options: Options): string {
  return options.elements.map(element => `Element$1[name=${element}]`).join(', ');
}

function isAttributePresentInElement(element: TmplAstElement, attribute: string) {
  return element.inputs.some(input => input.name === attribute)
    || element.attributes.some(attr => attr.name === attribute);
}
