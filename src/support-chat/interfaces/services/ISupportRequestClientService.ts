import { SupportRequest } from 'src/support-chat/schemas/support-request.schema';
import { CreateSupportRequestDto } from '../CreateSupportRequestDto';
import { MarkMessagesAsReadDto } from '../MarkMessagesAsReadDto';
import { Message } from 'src/support-chat/schemas/message.schema';
export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
}
