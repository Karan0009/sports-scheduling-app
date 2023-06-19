import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSportScheduleDto {
  @IsNotEmpty()
  @IsString()
  sportName: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}
