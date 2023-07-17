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
import { SupportRequestService } from './support-request.service';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    private supportRequestService: SupportRequestService,
    private readonly chatGateway: ChatGateway,
  ) {}

  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    return new this.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
    }).save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const messageList = await this.getUnreadCount(params.supportRequest);
    messageList.map((message) =>
      this.supportRequestService.readMessage(message.id),
    );
    // Отправка события, что сообщения прочитаны
    this.chatGateway.messagesIsRead(params.supportRequest);

    return messageList;
  }

  async getUnreadCount(supportRequest: string): Promise<Message[]> {
    const messageList = await this.supportRequestService.getMessages(
      supportRequest,
    );
    const supportRequestData = await this.supportRequestModel.findById(
      supportRequest,
    );

    return messageList.filter(
      (message) => message.author !== supportRequestData.user,
    );
  }
}
