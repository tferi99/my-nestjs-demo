import { Decision, DecisionItem, Decisions } from './decision-types';

export class DecisionProcessor {
  static process(item: DecisionItem): boolean {
    if (item instanceof Decision) {
      return DecisionProcessor.evalDecision(item as Decision);
    } else if (item instanceof Decisions) {
/*      const desc = (item as Decisions).items;
      return DecisionProcessor.process();*/
    }
  }

  static evalDecision(Decision): boolean {
    return true;
  }
}
