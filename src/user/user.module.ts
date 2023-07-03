import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { ApiUser } from './api/api-user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [ApiUser],
})
export class UserModule {}
