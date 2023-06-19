import { Test, TestingModule } from '@nestjs/testing';
import { SportsScheduleController } from './sports-schedule.controller';

describe('SportsScheduleController', () => {
  let controller: SportsScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsScheduleController],
    }).compile();

    controller = module.get<SportsScheduleController>(SportsScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
