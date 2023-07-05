import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/types';

export class ReservationDto {
  @ApiProperty({ example: '', description: 'id пользователя' })
  userId: ID;
  @ApiProperty({ example: '', description: 'id отеля' })
  hotelId?: ID;
  @ApiProperty({ example: '', description: 'id комнаты' })
  roomId: ID;
  @ApiProperty({ example: '', description: 'Дата начала брони' })
  dateStart: string;
  @ApiProperty({ example: '', description: 'Дата окончания брони' })
  dateEnd: string;
}
