import { ApiProperty } from '@nestjs/swagger';

export class ReservationSearchOptions {
  @ApiProperty({ example: '', description: 'id пользователя' })
  userId: string;
  @ApiProperty({ example: '', description: 'Дата начала брони' })
  dateStart: Date;
  @ApiProperty({ example: '', description: 'Дата окончания брони' })
  dateEnd: Date;
}
