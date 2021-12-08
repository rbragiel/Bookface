import { Request } from 'express';
import { IUser } from '../user/user.model';

export interface AppRequest extends Request {
  i18nLang: string;
  user: IUser;
}
