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
    return this.supportRequestModel
      .find(
        { user: params.user, isActive: params.isActive },
        { createdAt: true, isActive: true }, //TODO как то добавить hasNewMessages
      )
      .skip(params.offset)
      .limit(params.limit);
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

    // this.chatGateway.handleSendMessage();

    return newMessage.save();
  }

  async getMessages(supportRequest: ID): Promise<Message[]> {
    await this.supportRequestModel.findById(
      {
        id: supportRequest,
      },
      {
        _id: false,
        messages: true,
      },
    );
    //TODO тоже как то грамотно вытащить из обращения все сообщения в развернутом виде.
    //TODO привести к нормальному виду ответа
    // return supportRequestData.messages;
    return [];
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    // this.chatGateway.messagesIsRead(supportRequest.id);
    throw new Error('Method not implemented.');
  }
}
