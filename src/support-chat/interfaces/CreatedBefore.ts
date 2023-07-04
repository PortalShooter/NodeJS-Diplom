import { ApiProperty } from '@nestjs/swagger';

export class CreateBefore {
  @ApiProperty({
    example: '2023-07-03T13:32:27.676+00:00',
    description: 'Какая то дата',
  })
  createdBefore: string;
}
