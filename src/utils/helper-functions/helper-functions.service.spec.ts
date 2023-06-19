import { Test, TestingModule } from '@nestjs/testing';
import { HelperFunctionsService } from './helper-functions.service';

describe('HelperFunctionsService', () => {
  let service: HelperFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperFunctionsService],
    }).compile();

    service = module.get<HelperFunctionsService>(HelperFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
