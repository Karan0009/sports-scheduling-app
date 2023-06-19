import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import ApiResponse from 'src/models/api-response';
import { CreateSportScheduleDto } from 'src/models/dtos/create-sports-schedule-dto';
import { SportsScheduleService } from 'src/services/sports-schedule/sports-schedule.service';
import { HelperFunctionsService } from 'src/utils/helper-functions/helper-functions.service';

@Controller('/api/sports-schedule')
export class SportsScheduleController {
  constructor(
    private readonly sportsSchedule: SportsScheduleService,
    private readonly helper: HelperFunctionsService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createSportSchedule(
    @Body() data: CreateSportScheduleDto,
    @Res() res: Response,
  ) {
    try {
      if (this.helper.compareTimes(data.startTime, data.endTime) !== -1)
        return res
          .status(400)
          .json(
            new ApiResponse(
              null,
              false,
              400,
              'startTime must be smaller than endTime',
              'startTime must be smaller than endTime',
            ),
          );
      const newSport = await this.sportsSchedule.createSportsSchedule({
        name: data.sportName,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      if (!newSport) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              null,
              false,
              400,
              'Error in creating sports schedule',
              'Error in creating sports schedule',
            ),
          );
      }
      return res
        .status(201)
        .json(
          new ApiResponse(
            newSport,
            true,
            201,
            'Sports schedule created successfully',
            null,
          ),
        );
    } catch (err) {
      return res
        .status(500)
        .json(new ApiResponse(null, false, 500, 'Something went wrong', err));
    }
  }
}
