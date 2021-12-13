import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Decision } from './decisions';

@Injectable()
export class DecisionProcessorSevice {
  constructor(private authService: AuthService) {}

  process(d: Decision, args: any[]): boolean {
/*    const ctx: DecisionContext = {
      currentUserProvider: this.authService,
      args,
    };
    return d.evaluate(ctx);*/
return true;
  }
}
