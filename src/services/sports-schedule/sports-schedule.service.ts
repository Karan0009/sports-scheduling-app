import { Injectable } from '@nestjs/common';
import { Prisma, SportSchedule } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class SportsScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSportsSchedule(
    data: Prisma.SportScheduleCreateInput,
  ): Promise<SportSchedule | null> {
    try {
      const rowsInConflictWithGivenStartTime =
        await this.prisma.sportSchedule.count({
          where: {
            startTime: {
              lte: data.startTime,
            },
            endTime: {
              gt: data.startTime,
            },
            date: data.date,
          },
        });
      if (rowsInConflictWithGivenStartTime != 0) {
        return null;
      }
      const startTime = data.startTime;
      const rowsInConflictWithGivenEndTime =
        await this.prisma.sportSchedule.findFirst({
          where: {
            startTime: {
              lte: data.endTime,
            },
            endTime: {
              gt: data.endTime,
            },
            date: data.date,
          },
        });
      let endTime;
      if (rowsInConflictWithGivenEndTime) {
        const rowsWithEndTimeLessThanConflictingEndTime =
          await this.prisma.sportSchedule.findFirst({
            where: {
              startTime: {
                gt: startTime,
              },
              endTime: {
                lte: rowsInConflictWithGivenEndTime.endTime,
              },
              date: data.date,
            },
            orderBy: { startTime: Prisma.SortOrder.asc },
          });
        if (rowsWithEndTimeLessThanConflictingEndTime)
          endTime = rowsWithEndTimeLessThanConflictingEndTime.startTime;
        else endTime = rowsInConflictWithGivenEndTime.startTime;
      } else {
        const rowsWithEndTimeLessThanGivenEndTime =
          await this.prisma.sportSchedule.findFirst({
            where: {
              startTime: {
                gt: startTime,
              },
              endTime: {
                lte: data.endTime,
              },
              date: data.date,
            },
            orderBy: { startTime: Prisma.SortOrder.asc },
          });
        if (rowsWithEndTimeLessThanGivenEndTime)
          endTime = rowsWithEndTimeLessThanGivenEndTime.startTime;
        else endTime = data.endTime;
      }

      return await this.prisma.sportSchedule.create({
        data: {
          date: data.date,
          endTime: endTime,
          startTime: startTime,
          name: data.name,
        },
      });
    } catch (err) {
      return null;
    }
  }
}
