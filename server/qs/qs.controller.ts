import { Get, Controller } from '@nestjs/common';
import { QSService } from './qs.service';
import { Job } from './dto/job.dto';
import { Auth } from './entity/auth.entity';

@Controller('/api/qs')
export class QSController {
  constructor(private readonly queryService: QSService) {}

  @Get('/stat/runJobs')
  getStatRunningJob(): Promise<Job[]> {
    return this.queryService.getStatRunningJob();
  }

  @Get('/export/status')
  getDataExportStatus(): Promise<string[]> {
    return this.queryService.getExportStatus();
  }
}
