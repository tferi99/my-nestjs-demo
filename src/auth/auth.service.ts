import { Injectable } from '@nestjs/common';
import { User } from '../model/user';

const CURRENT_USER: User = {
  id: 1,
  name: 'Segg Elek',
  email: 'se@test.org',
}

@Injectable()
export class AuthService {
  getCurrentUser(): User {
    return CURRENT_USER;
  }
}
