import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../schemas/message.schema';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  // Прослушиваем все сообщения
  // @SubscribeMessage('sendMessage')
  async handleSendMessage(chatId, message: Message): Promise<void> {
    // Получаем нужный чат и отправляем в него событие
    this.server.emit(`chat-${chatId}`, message);
  }

  @SubscribeMessage('subscribeToChat')
  handleSubscribeToChat(client: any, data) {
    const { userId, chatId } = data;

    // TODO добавить сюда чтение всех сообщений именно этим пользователем.
    // то есть помечать все сообщения прочитанными если id сообщения не совпадает с пользователем.
    // хотя по ТЗ это делается отдельным запросом.

    console.log(6666, chatId);
    return `chat-${chatId}`;
  }

  messagesIsRead(supportRequestId: string) {
    this.server.emit('messageIdRead', supportRequestId);
  }
}
