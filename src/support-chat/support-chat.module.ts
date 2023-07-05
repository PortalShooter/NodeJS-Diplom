import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { ApiSupportChat } from './api/api-support-chat';
import { AuthModule } from 'src/user/auth/auth.module';
import { SupportRequestClientService } from './services/support-request-client.service';
import { SupportRequestEmployeeService } from './services/support-request-employee.service';
import { SupportRequestService } from './services/support-request.service';
// import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
    AuthModule,
  ],
  providers: [
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportRequestService,
  ],
  controllers: [ApiSupportChat],
})
export class SupportChatModule {}
