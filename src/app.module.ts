import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportChatModule } from './support-chat/support-chat.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ChatModule } from './support-chat/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/diplom', {
      autoIndex: true,
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
    HotelModule,
    ReservationModule,
    SupportChatModule,
    FileModule,
    ChatModule,
  ],
})
export class AppModule {}
