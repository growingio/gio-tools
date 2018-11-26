import { Get, Controller, Param } from '@nestjs/common';
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

  @Get('/export/status/:ai/:type/:date')
  getDataExportStatus(@Param('ai') ai: string,
                      @Param('type') type: string,
                      @Param('date') date: string): Promise<string[]> {
    return this.queryService.getExportStatus(ai, type, date);
  }
}
