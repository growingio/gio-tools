import { Get, Post, Controller, Param, Header, Query, Body } from '@nestjs/common';
import { QSService } from './qs.service';
import { QSTesterService } from './qsTester.service';
import { JobResult } from './dto/jobResult.dto';
import * as path from 'path';
import { Diff } from './dto/diff.dto';
import { Case } from './case/case.model';
import { Status } from '../common/constants/status.enum';

@Controller('/api/qs')
export class QSController {
  constructor(
    private readonly queryService: QSService,
    private readonly qsTesterService: QSTesterService,
  ) {}

  /**
   * 获取正在qs正在执行的任务
   */
  @Get('/stat/runJobs')
  getStatRunningJob(): Promise<JobResult> {
    return this.queryService.getStatRunningJob();
  }

  /**
   * 获取导出文件的下载列表
   */
  @Get('/export/status/:ai/:type/:date')
  getDataExportStatus(
    @Param('ai') ai: string,
    @Param('type') type: string,
    @Param('date') date: string,
  ): Promise<string[]> {
    return this.queryService.getExportStatus(ai, type, date);
  }

  /**
   * 单纯对比两个qs返回的结果
   */
  @Post('/test/sample')
  async testSample(
    @Body('qsHost1') qsHost1: string,
    @Body('qsHost2') qsHost2: string,
    @Body('qsPath') qsPath: string,
    @Body('qsBody') qsBody: string,
  ): Promise<Diff> {
    return this.qsTesterService.testSample(qsHost1, qsHost2, qsPath, qsBody);
  }

  /**
   * 创建一个测试
   */
  @Post('/test/case')
  async createCase(@Body() o: Case): Promise<Case> {
    o.createAt = new Date();
    o.updateAt = new Date();
    o.status = Status.NORMAL;
    return this.qsTesterService.createCase(o);
  }

  @Get('/test/cases/all')
  getDB(): Promise<any> {
    return this.qsTesterService.listAllCases();
  }
}
