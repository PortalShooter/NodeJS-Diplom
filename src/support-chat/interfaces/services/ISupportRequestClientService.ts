import { CreateSupportRequestDto } from '../CreateSupportRequestDto';
import { MarkMessagesAsReadDto } from '../MarkMessagesAsReadDto';
import { Message } from '../Message';
import { SupportRequest } from '../SupportRequest';

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
}
