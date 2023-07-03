import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationService } from '../reservation.service';
import { Request } from 'express';
import { AddReservationDto } from '../interfaces/AddReservationDto';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/user/auth/auth.service';

@ApiTags('Бронирование')
@Controller('api')
export class ApiReservation {
  constructor(
    private readonly reservationService: ReservationService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Бронирование номера клиентом' })
  @Post('client/reservations')
  async addReservation(@Req() req: Request, @Body() dto: AddReservationDto) {
    const { access_token } = req.cookies;
    if (access_token) {
      const user = await this.authService.getUserByToken(access_token);
      if (!user) {
        throw new HttpException(
          'Указанного пользователя не существует или он отключён',
          400,
        );
      }
      return this.reservationService.addReservation({
        dateEnd: dto.dateEnd,
        dateStart: dto.dateStart,
        userId: user.id,
        roomId: dto.hotelRoom,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Список броней текущего пользователя' })
  @Get('client/reservations')
  async getAllReservationByUser(@Req() req: Request) {
    const token = req.cookies.access_token;
    const user = await this.authService.getUserByToken(token);
    return this.reservationService.getReservations(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Отмена бронирования клиентом' })
  @Delete('client/reservations/:id')
  async deleteReservationByUser(@Req() req: Request, @Param('id') id: string) {
    const token = req.cookies.access_token;
    const reservation = this.reservationService.getReservationsById(id);
    if (!reservation) {
      throw new HttpException('Брони с указанным ID не существует', 400);
    }
    //TODO проверить если ли id брони у данного клиента, если нет, то возвращаем 403

    const user = await this.authService.getUserByToken(token);
    console.log(user);
    return this.reservationService.getReservations(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Список броней текущего пользователя' })
  @Get('manager/reservations/:userId')
  async getUserReservationManagement(@Param('userId') userId: string) {
    return this.reservationService.getReservations(userId);
  }
}
