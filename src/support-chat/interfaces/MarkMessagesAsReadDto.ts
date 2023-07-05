import { ID } from 'src/types';

export interface MarkMessagesAsReadDto {
  user: ID;
  supportRequest: string;
  createdBefore: Date;
}
