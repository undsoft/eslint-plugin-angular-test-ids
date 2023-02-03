import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/undsoft/eslint-plugin-angular-test-ids`,
);
