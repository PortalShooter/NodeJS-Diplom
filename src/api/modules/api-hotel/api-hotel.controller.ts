import { Controller } from '@nestjs/common';
import { ApiHotelService } from './api-hotel.service';

@Controller('api/commom/hotel-rooms')
export class ApiHotelController {
  constructor(private readonly apiHotelService: ApiHotelService) {}
}
