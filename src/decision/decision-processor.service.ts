import { Decision, DecisionContext } from './decision-types';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DecisionProcessorSevice {
  constructor(private authService: AuthService) {}

  process(d: Decision, args: any[]): boolean {
    const ctx: DecisionContext = {
      currentUserProvider: this.authService,
      args,
    };
    return d.evaluate(ctx);
  }
}
