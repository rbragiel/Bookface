import { Request } from 'express';
import { UserWithCreatedAt } from '../features/user/user.model';

export interface AppRequest extends Request {
  i18nLang: string;
  user: UserWithCreatedAt;
}
