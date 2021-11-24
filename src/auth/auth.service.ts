import { Injectable } from '@nestjs/common';
import { User } from '../model/user';
import { CurrentUserProvider } from '../decision/current-user-decision';

const CURRENT_USER: User = {
  id: 1,
  name: 'Segg Elek',
  email: 'se@test.org',
}

@Injectable()
export class AuthService implements CurrentUserProvider {
  getCurrentUser(): User {
    return CURRENT_USER;
  }
}
