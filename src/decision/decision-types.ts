import { CurrentUserProvider } from './current-user-decision';

export interface DecisionContext {
  args: any[];
  currentUserProvider: CurrentUserProvider;
}

export interface Decision {
  validate(): void;
  evaluate(ctx: DecisionContext): boolean;
}
