export enum Op {
  AND,
  OR,
}

export enum DecisionType {
  CurrentUser,
  Role,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DecisionItem {}

export class Decision implements DecisionItem {
  type: DecisionType;
  data: any;
}

export class Decisions implements DecisionItem {
  items: DecisionItem[];
  op: Op;

  constructor(items: DecisionItem[], op: Op) {
    this.items = items;
    this.op = op;
  }
}
