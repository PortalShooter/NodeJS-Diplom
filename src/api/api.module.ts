import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ApiHotelModule } from './modules/api-hotel/api-hotel.module';

@Module({
  imports: [ApiHotelModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
