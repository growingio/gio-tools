import { Get, Post, Controller, Param, Header, Query } from '@nestjs/common';
import { QSService } from './qs.service';
import { QSTester } from './qsTester.service';
import { JobResult } from './dto/jobResult.dto';
import * as path from 'path';
import { renderDiff } from '../common/utils/diffUtils';

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
  getDataExportStatus(
    @Param('ai') ai: string,
    @Param('type') type: string,
    @Param('date') date: string,
  ): Promise<string[]> {
    return this.queryService.getExportStatus(ai, type, date);
  }

  @Post('/test/sample')
  async testSample(
    @Query('qsHost1') qsHost1: string,
    @Query('qsHost2') qsHost2: string,
    @Query('qsPath') qsPath: string,
    @Query('qsBody') qsBody: string,
  ): Promise<any> {

    let res1 = Promise.resolve('');
    if (!!qsHost1) {
      res1 = this.qsTester.testSample(`${qsHost1}${qsPath}`, qsBody);
    }
    let res2 = Promise.resolve('');
    if (!!qsHost2) {
      res2 = this.qsTester.testSample(`${qsHost2}${qsPath}`, qsBody);
    }

    await res1;
    await res2;

    return Promise.resolve({
      res1,
      res2,
      diff: renderDiff(res1, res2, { fileName: '-' }),
    });
  }

  @Get('/test/cases')
  getDB(): Promise<any> {
    return this.qsTester.getCases();
  }
}
