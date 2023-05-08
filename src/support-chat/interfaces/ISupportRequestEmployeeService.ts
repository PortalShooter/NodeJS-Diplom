import { MarkMessagesAsReadDto } from './MarkMessagesAsReadDto';
import { Message } from './Message';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
  closeRequest(supportRequest: string): Promise<void>;
}
