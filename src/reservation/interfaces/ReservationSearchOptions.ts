import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/types';

export class ReservationSearchOptions {
  @ApiProperty({ example: '', description: 'id пользователя' })
  userId: ID;
  @ApiProperty({ example: '', description: 'Дата начала брони' })
  dateStart: Date;
  @ApiProperty({ example: '', description: 'Дата окончания брони' })
  dateEnd: Date;
}
