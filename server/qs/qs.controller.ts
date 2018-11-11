import { Get, Controller } from '@nestjs/common';
import { QSService } from './qs.service';
import { Job } from './entry/job.entry';

@Controller('/api/qs')
export class QSController {
  constructor(private readonly queryService: QSService) {}

  @Get('/stat/runJobs')
  getStatRunningJob(): Promise<Job[]> {
    return this.queryService.getStatRunningJob();
  }
}
