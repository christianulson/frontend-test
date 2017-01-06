import { IUser } from './iUser';
import { ICompany } from './iCompany';
import { IMessage } from './iMessage';

export interface IMessageTalk {
  id: number;
  user: IUser;
  company?: ICompany;
  message: IMessage;
}