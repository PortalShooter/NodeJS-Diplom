import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({ example: '', description: 'id пользователя' })
  userId: string;
  @ApiProperty({ example: '', description: 'id отеля' })
  hotelId?: string;
  @ApiProperty({ example: '', description: 'id комнаты' })
  roomId: string;
  @ApiProperty({ example: '', description: 'Дата начала брони' })
  dateStart: string;
  @ApiProperty({ example: '', description: 'Дата окончания брони' })
  dateEnd: string;
}
