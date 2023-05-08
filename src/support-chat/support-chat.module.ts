import { Module } from '@nestjs/common';
import { SupportChatService } from './support-chat.service';
import { SupportChatController } from './support-chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [SupportChatService],
  controllers: [SupportChatController],
})
export class SupportChatModule {}
