import { Injectable } from '@nestjs/common';
import { Decision, Decisions, Op } from '../decision/decision-types';
import { DecisionProcessor } from '../decision/decision-processor';

@Injectable()
export class DecoService {
  testDecision(): void {
    const root = new Decisions([
      new Decision(),
      new Decisions([], Op.OR)
    ], Op.AND);

    DecisionProcessor.process(root);
  }
}
