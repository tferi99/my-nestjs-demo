export enum Op {
  AND,
  OR,
}

export enum DecisionType {
  CurrentUser,
  Role,
}

export interface DecisionRoot {}

export interface Decision extends DecisionRoot {
  type: DecisionType;
  data: any;
}

export interface Decisions extends DecisionRoot {
  op: Op;
  decisions: Decision[];
}
