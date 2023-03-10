import requireTestIds, {
  RULE_NAME as requireTestIdsRuleName,
} from './rules/require-test-id';
import { materialElements, nativeElements } from './utils/elements';

export = {
  nativeElements,
  materialElements,
  rules: {
    [requireTestIdsRuleName]: requireTestIds,
  },
}
