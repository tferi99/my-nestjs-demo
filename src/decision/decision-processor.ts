import { Decision, DecisionItem, Decisions, DecisionType } from './decision-types';

export class DecisionProcessor {
  static process(item: DecisionItem): boolean {
    if (item instanceof Decision) {
      return DecisionProcessor.evalDecision(item as Decision);
    } else if (item instanceof Decisions) {
      return DecisionProcessor.process(item);
    }
  }

  static evalDecision(decision: Decision): boolean {
    switch (decision.type) {
      case DecisionType.CurrentUser:
        break;
      case DecisionType.Role:
        break;
    }
    return true;
  }
}
