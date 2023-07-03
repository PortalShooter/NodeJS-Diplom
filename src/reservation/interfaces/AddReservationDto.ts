import { ApiProperty } from '@nestjs/swagger';

export class AddReservationDto {
  @ApiProperty({ example: '', description: 'id комнаты' })
  hotelRoom: string;
  @ApiProperty({
    example: '',
    description: 'Дата начала брони',
    required: false,
  })
  dateStart: string;
  @ApiProperty({
    example: '',
    description: 'Дата окончания брони',
    required: false,
  })
  dateEnd: string;
}
