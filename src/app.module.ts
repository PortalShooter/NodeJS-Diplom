import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/diplom', {
      // useCreateIndex: true,
      autoIndex: true,
    }),
    UserModule,
    HotelModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
