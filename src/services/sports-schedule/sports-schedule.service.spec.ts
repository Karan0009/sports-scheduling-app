import { Test, TestingModule } from '@nestjs/testing';
import { SportsScheduleService } from './sports-schedule.service';

describe('SportsScheduleService', () => {
  let service: SportsScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsScheduleService],
    }).compile();

    service = module.get<SportsScheduleService>(SportsScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
