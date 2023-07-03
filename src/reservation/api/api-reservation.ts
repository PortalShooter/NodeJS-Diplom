import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationService } from '../reservation.service';
import { ReservationDto } from '../interfaces/ReservationDto';

@ApiTags('Reservation')
@Controller('api')
export class ApiReservation {
  constructor(private readonly reservationService: ReservationService) {}

  //TODO role добавить проверку и ответы 401, 403 и 400
  // надо добавить проверку на id текущего пользователя
  @ApiOperation({ summary: 'Бронирование номера клиентом' })
  @Post('client/reservations')
  addHotel(@Body() body: ReservationDto) {
    return this.reservationService.addReservation(body);
  }
}
