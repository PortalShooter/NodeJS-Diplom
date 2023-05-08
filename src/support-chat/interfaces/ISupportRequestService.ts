import { GetChatListParams } from './GetChatListParams';
import { Message } from './Message';
import { SendMessageDto } from './SendMessageDto';
import { SupportRequest } from './SupportRequest';

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}
