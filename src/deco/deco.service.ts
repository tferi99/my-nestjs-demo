import { Injectable } from '@nestjs/common';
import { DecisionProcessor } from '../decision/decision-processor';

@Injectable()
export class DecoService {
  testDecision(): void {
    DecisionProcessor.process(undefined);
  }
}
