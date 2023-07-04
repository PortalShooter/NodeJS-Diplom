import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
import { HotelRoomService, HotelService } from 'src/hotel/hotel.service';

@ApiTags('Бронирование')
@Controller('api')
export class ApiReservation {
  constructor(
    private readonly reservationService: ReservationService,
    private authService: AuthService,
    private hotelRoomService: HotelRoomService,
    private hotelService: HotelService,
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
      const reservation = await this.reservationService.addReservation({
        dateEnd: dto.dateEnd,
        dateStart: dto.dateStart,
        userId: user.id,
        roomId: dto.hotelRoom,
      });

      const hotelRoom = await this.hotelRoomService.getDetailInfoRoom(
        reservation.roomId.toString(),
      );

      return {
        startDate: reservation.dateStart,
        endDate: reservation.dateEnd,
        hotelRoom: {
          description: hotelRoom.description,
          images: hotelRoom.images,
        },
        hotel: hotelRoom.hotel,
      };
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
    const user = await this.authService.getUserByToken(token);
    const reservation = await this.reservationService.getReservationsById(id);
    if (!reservation) {
      throw new HttpException('Брони с указанным ID не существует', 400);
    } else if (reservation.userId !== user.id) {
      throw new HttpException(
        'ID текущего пользователя не совпадает с ID пользователя в брони',
        403,
      );
    }
    return this.reservationService.removeReservation(reservation.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Список броней конкретного пользователя' })
  @Get('manager/reservations/:userId')
  async getUserReservationManagement(@Param('userId') userId: string) {
    return this.reservationService.getReservations(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Отмена бронирования менеджером' })
  @Delete('manager/reservations/:id')
  async deleteReservationByManagement(@Param('id') id: string) {
    const reservation = await this.reservationService.getReservationsById(id);
    if (!reservation) {
      throw new HttpException('Брони с указанным ID не существует', 400);
    }
    return this.reservationService.removeReservation(reservation.id);
  }
}
