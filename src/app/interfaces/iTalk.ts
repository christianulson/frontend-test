import { IMessageTalk } from './iMessageTalk';

export interface ITalk {
  statusRequest: boolean;
  talkMessages: IMessageTalk[];
  type?:string;
}