import { Get, Post, Controller, Param, Header, Query, Body } from '@nestjs/common';
import { QSService } from './qs.service';
import { QSTesterService } from './qsTester.service';
import { JobResult } from './dto/jobResult.dto';
import * as path from 'path';
import { Diff } from './dto/diff.dto';
import { Case } from './case/case.model';

@Controller('/api/qs')
export class QSController {
  constructor(
    private readonly queryService: QSService,
    private readonly qsTesterService: QSTesterService,
  ) {}

  @Get('/stat/runJobs')
  getStatRunningJob(): Promise<JobResult> {
    return this.queryService.getStatRunningJob();
  }

  @Get('/export/status/:ai/:type/:date')
  getDataExportStatus(
    @Param('ai') ai: string,
    @Param('type') type: string,
    @Param('date') date: string,
  ): Promise<string[]> {
    return this.queryService.getExportStatus(ai, type, date);
  }

  @Post('/test/sample')
  async testSample(
    @Body('qsHost1') qsHost1: string,
    @Body('qsHost2') qsHost2: string,
    @Body('qsPath') qsPath: string,
    @Body('qsBody') qsBody: string,
  ): Promise<Diff> {
    return this.qsTesterService.testSample(qsHost1, qsHost2, qsPath, qsBody);
  }

  @Post('/test/case')
  async createCase(@Body() o: Case): Promise<void> {
    console.log(o);
  }

  @Get('/test/cases')
  getDB(): Promise<any> {
    return this.qsTesterService.getCases();
  }
}
