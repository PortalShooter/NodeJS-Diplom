import { Injectable } from '@nestjs/common';
import { CreateSupportRequestDto } from './interfaces/CreateSupportRequestDto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/support-request.schema';
import { Model } from 'mongoose';
import { SearchSupportRequestststs } from './interfaces/SearchSupportRequests';
import { Message, MessageDocument } from './schemas/message.schema';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { MarkMessagesAsReadDto } from './interfaces/MarkMessagesAsReadDto';

@Injectable()
export class SupportChatService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    return new this.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
    }).save();
  }

  findAllSupportRequestByUser(
    id: string,
    params: SearchSupportRequestststs,
  ): Promise<SupportRequest[]> {
    return this.supportRequestModel
      .find(
        { user: id, isActive: params.isActive },
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
    this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: newMessage.id },
    });
    return newMessage.save();
  }

  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    return { success: true };
  }
  //   getUnreadCount(supportRequest: string): Promise<Message[]>;
}
