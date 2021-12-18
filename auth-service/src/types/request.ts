import { Request } from 'express';
import { IUserWithCreatedAt } from '../features/user/user.model';

export interface AppRequest extends Request {
  i18nLang: string;
  user: IUserWithCreatedAt;
}
