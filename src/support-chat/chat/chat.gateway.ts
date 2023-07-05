import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequest } from '../schemas/support-request.schema';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(role: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: SupportRequest,
  ): Promise<void> {
    // при отправке сообщения надо уведомлять остальных подписчиков
    // await this.appService.createMessage(payload);
    // this.server.emit('recMessage', payload);
  }

  messagesIsRead(supportRequestId: string) {
    this.server.emit('messageIdRead', supportRequestId);
  }
}
