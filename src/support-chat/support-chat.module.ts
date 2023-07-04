import { Module } from '@nestjs/common';
import { SupportChatService } from './support-chat.service';
import { SupportChatController } from './support-chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { ApiSupportChat } from './api/api-support-chat';
import { AuthModule } from 'src/user/auth/auth.module';
// import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
    AuthModule,
  ],
  providers: [SupportChatService],
  controllers: [SupportChatController, ApiSupportChat],
})
export class SupportChatModule {}
