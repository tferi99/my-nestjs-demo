import { Decision, DecisionRoot } from './decision-types';

export class DecisionProcessor {
  static process(root: DecisionRoot): boolean {
    if (root instanceof Decision) {

    }
    return true;
  }
}
