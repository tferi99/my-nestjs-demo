import { Decision, DecisionContext } from './decision-types';

export enum Op {
  AND = 'AND',
  OR = 'OR',
}

export class Decisions implements Decision {
  op: Op;
  items: Decision[];

  constructor(op: Op, items: Decision[]) {
    this.op = op;
    this.items = items;
  }

  evaluate(ctx: DecisionContext): boolean {
    this.items.forEach((item) => {
      const result: boolean = item.evaluate(ctx);
      if (this.op === Op.AND) {
        if (!result) {
          return false;
        }
      } else if (this.op === Op.OR) {
        if (result) {
          return true;
        }
      }
    });
    return true;
  }

  validate(): void {
    this.items.forEach((item) => item.validate());
  }
}
