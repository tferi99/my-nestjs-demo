import { Injectable } from '@nestjs/common';
import { User } from './user';
import { CurrentUserProvider } from '../decision/current-user-decision';
import * as _ from 'lodash';

const USERS: User[] = [
  {
    id: 10,
    name: 'admin',
    email: 'admin@test.org',
    admin: true,
  },
  {
    id: 10,
    name: 'Segg Elek',
    email: 'se@test.org',
    admin: false,
  },
  {
    id: 12,
    name: 'John Smith',
    email: 'js@test.org',
    admin: false,
  },
];

const CURRENT_USER: User = {
  id: 1,
  name: 'Segg Elek',
  email: 'se@test.org',
  admin: false,
}

@Injectable()
export class AuthService implements CurrentUserProvider {
  getCurrentUser(): User {
    return CURRENT_USER;
  }

  getUser(id: number): User {
    return _.find(USERS, { id });
  }
}
