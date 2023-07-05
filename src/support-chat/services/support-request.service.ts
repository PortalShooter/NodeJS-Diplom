import { Injectable } from '@nestjs/common';
import { CreateSupportRequestDto } from '../interfaces/CreateSupportRequestDto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { MarkMessagesAsReadDto } from '../interfaces/MarkMessagesAsReadDto';

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  //   findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  //   sendMessage(data: SendMessageDto): Promise<Message>;
  //   getMessages(supportRequest: string): Promise<Message[]>;
  //   subscribe(
  //     handler: (supportRequest: SupportRequest, message: Message) => void,
  //   ): () => void;
}
