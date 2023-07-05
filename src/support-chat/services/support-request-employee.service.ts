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
import { ISupportRequestEmployeeService } from '../interfaces/services/ISupportRequestEmployeeService';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    return { success: true };
  }

  //TODO понять когда я должен это запускать
  getUnreadCount(supportRequest: string): Promise<Message[]> {
    return this.supportRequestModel
      .findById(supportRequest, {
        messages: true,
      })
      .populate('messages', 'readAt');
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });

    return;
  }
}
