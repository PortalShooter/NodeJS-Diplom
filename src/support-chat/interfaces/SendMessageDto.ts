import { ID } from 'src/types';

export interface SendMessageDto {
  author: ID;
  supportRequest: string;
  text: string;
}
