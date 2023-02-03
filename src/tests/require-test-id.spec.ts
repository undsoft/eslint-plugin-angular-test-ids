import { RuleTester } from '@angular-eslint/utils';
import rule, {
  RULE_NAME,
} from '../rules/require-test-id';
import { invalid, valid } from './cases';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

// TODO: Figure out typing issue.
ruleTester.run(RULE_NAME, rule as any, {
  valid,
  invalid,
});
