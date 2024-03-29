import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { GetChatListParams } from '../interfaces/GetChatListParams';
import { ISupportRequestService } from '../interfaces/services/ISupportRequestService';
import { SendMessageDto } from '../interfaces/SendMessageDto';
import { ID } from 'src/types';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    private readonly chatGateway: ChatGateway,
  ) {}

  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    if (params.user) {
      return this.supportRequestModel
        .find(
          { user: params.user, isActive: params.isActive },
          { createdAt: true, isActive: true }, //TODO как то добавить hasNewMessages
        )
        .skip(params.offset)
        .limit(params.limit);
    } else {
      return this.supportRequestModel
        .find(
          { isActive: params.isActive },
          { createdAt: true, isActive: true, user: true }, //TODO как то добавить hasNewMessages
        )
        .skip(params.offset)
        .limit(params.limit);
    }
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const newMessage = await new this.messageModel({
      author: data.author,
      sentAt: new Date(),
      text: data.text,
    });
    await this.supportRequestModel.findByIdAndUpdate(
      data.supportRequest,
      {
        $push: { messages: newMessage.id },
      },
      {
        new: true,
      },
    );
    // Уведомляем всех, кто подписан на чат.
    this.chatGateway.handleSendMessage(data.supportRequest, newMessage);
    return newMessage.save();
  }

  async getMessages(supportRequest: ID): Promise<Message[]> {
    const res = await this.supportRequestModel.findById(supportRequest);
    const messageListID = res.messages;

    return this.messageModel.find({
      _id: {
        $in: messageListID,
      },
    });
  }

  async readMessage(message: ID) {
    await this.messageModel.findByIdAndUpdate(message, { readAt: new Date() });
  }

  // Так и не полнял как это запускать
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    // this.chatGateway.messagesIsRead(supportRequest.id);
    throw new Error('Method not implemented.');
  }
}
