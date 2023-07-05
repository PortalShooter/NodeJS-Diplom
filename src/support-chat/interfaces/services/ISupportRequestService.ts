import { SupportRequest } from 'src/support-chat/schemas/support-request.schema';
import { GetChatListParams } from '../GetChatListParams';
import { SendMessageDto } from '../SendMessageDto';
import { Message } from 'src/support-chat/schemas/message.schema';
import { ID } from 'src/types';

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}
