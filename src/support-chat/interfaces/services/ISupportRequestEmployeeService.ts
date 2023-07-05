import { Message } from 'src/support-chat/schemas/message.schema';
import { MarkMessagesAsReadDto } from '../MarkMessagesAsReadDto';
export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
  closeRequest(supportRequest: string): Promise<void>;
}
