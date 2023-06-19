import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class HelperFunctionsService {
  compareTimes(time1: string, time2: string): number | null {
    try {
      const format = 'HH:mm:ss';
      const moment1 = moment(time1, format, true);
      const moment2 = moment(time2, format, true);
      if (moment1.isBefore(moment2)) return -1;
      else if (moment1.isAfter(moment2)) return 1;
      else return 0;
    } catch (err) {
      return null;
    }
  }
}
