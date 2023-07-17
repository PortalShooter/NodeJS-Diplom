import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';
import { MarkMessagesAsReadDto } from '../interfaces/MarkMessagesAsReadDto';
import { ISupportRequestEmployeeService } from '../interfaces/services/ISupportRequestEmployeeService';
import { SupportRequestService } from './support-request.service';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    private supportRequestService: SupportRequestService,
    private readonly chatGateway: ChatGateway,
  ) {}

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
      (message) => message.author === supportRequestData.user,
    );
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });

    return;
  }
}
