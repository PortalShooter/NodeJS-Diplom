import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async validate(email: string, password: string): Promise<any> {
    console.log('Валидация');
  }
}
