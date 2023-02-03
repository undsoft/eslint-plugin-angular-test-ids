# angular-template-test-ids

Requires certain elements to have a test id attribute in template.

Through author of this plugin is not a fan of test ids and thinks user visible labels should be preferred, test ids may be required by your QA team.

Valid code:
```html
<button data-test="my-test-id"></button>
<button [data-test]="myTestId"></button>
```

## Usage

Requires `eslint` and `eslint-plugin-angular` to be installed.

```bash
npm install --save-dev eslint-plugin-angular-test-ids
```
In your `.eslintrc` file add plugin and rule.

Assuming you've previously set up `@angular-eslint/template`:

```json
{
  "files": ["*.html"],
  "extends": ["plugin:@angular-eslint/template/recommended"],
  "plugins": ["angular-test-ids"],
  "rules": {
    "angular-test-ids/require-test-id": ["error"],
    
    ... other template rules ...
  }
}
```

If you don't use `@angular-eslint/template`:

```json
{
  "files": ["*.html"],
  "parser": "@angular-eslint/template-parser",
  "plugins": ["angular-test-ids"],
  "rules": {
    "angular-test-ids/require-test-id": ["error"],
  }
}
```

## Options
| Option           | Description                                                                                                                                                                                                                                                                  |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| attribute        | Attribute to look for. Defaults to `data-test`.                                                                                                                                                                                                                              |
| overrideElements | Replace default list of elements that require test ids.   <br/>Default elements are: <br/>Native: `<button>, <tr>, <input>, <select>, <textarea>, <option>` <br/>Material: `<mat-radio-group>, <mat-radio-button>, <mat-checkbox>, <mat-chip-list>, <mat-chip>, <mat-select>, <mat-option>` |
| addElements      | Adds additional elements to the list of elements requiring test ids without replacing defaults.                                                                                                                                                                              |
