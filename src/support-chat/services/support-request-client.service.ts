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
import { ISupportRequestClientService } from '../interfaces/services/ISupportRequestClientService';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    private readonly chatGateway: ChatGateway,
  ) {}

  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    return new this.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
    }).save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const supportRequest = await this.supportRequestModel
      .findById(params.supportRequest, {
        _id: false,
        messages: true,
      })
      .populate({ path: 'messages' }); //Пока не удалось получить развернутый массив сообщений

    // const messagesID = supportRequest.messages;

    // const newArr = await messagesID.map(
    //   async (messageId) => await this.messageModel.findById(messageId),
    // );

    // Отправка события, что сообщения прочитаны
    this.chatGateway.messagesIsRead(supportRequest.id);

    return supportRequest;
  }

  //TODO понять когда я должен это запускать
  getUnreadCount(supportRequest: string): Promise<Message[]> {
    return this.supportRequestModel
      .findById(supportRequest, {
        messages: true,
      })
      .populate('messages', 'readAt');
  }
}
