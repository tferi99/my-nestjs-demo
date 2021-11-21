export enum Op {
  AND = 'AND',
  OR = 'OR',
}

export enum DecisionType {
  CurrentUser = 'CURRENT_USER',
  Role = 'ROLE',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DecisionItem {}

export class Decision implements DecisionItem {
  type: DecisionType;
  data: any;

  constructor(type: DecisionType, data?: any) {
    this.type = type;
    this.data = data;
  }
}

export class CurrentUserDecision extends Decision {
  constructor(userIdRetriever: UserIdFromMarkedParam) {
    super(DecisionType.CurrentUser, userIdRetriever);
  }
}

export class Decisions implements DecisionItem {
  items: DecisionItem[];
  op: Op;

  constructor(op: Op, items: DecisionItem[]) {
    this.op = op;
    this.items = items;
  }
}

export type UserIdRetrieveFunction = (data: any) => number; // User.id is string

export interface UserIdFromMarkedParam {
  markId: string;
  func?: UserIdRetrieveFunction;
}
