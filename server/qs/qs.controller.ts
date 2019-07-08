import { Get, Controller, Param } from '@nestjs/common';
import { QSService } from './qs.service';
import { QSTester } from './qsTester.service';
import { JobResult } from './dto/jobResult.dto';
import { Auth } from './entity/auth.entity';

@Controller('/api/qs')
export class QSController {
  constructor(
    private readonly queryService: QSService,
    private readonly qsTester: QSTester,
  ) {}

  @Get('/stat/runJobs')
  getStatRunningJob(): Promise<JobResult> {
    return this.queryService.getStatRunningJob();
  }

  @Get('/export/status/:ai/:type/:date')
  getDataExportStatus(@Param('ai') ai: string,
                      @Param('type') type: string,
                      @Param('date') date: string): Promise<string[]> {
    return this.queryService.getExportStatus(ai, type, date);
  }

  @Get('/test/cases')
  getDB(): Promise<any> {
    return this.qsTester.getCases();
  }
}
