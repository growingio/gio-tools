import { Injectable } from '@nestjs/common';
import { ConfigService, InjectConfig } from 'nestjs-config';
import axios from '../common/utils/axios.gio';
import { renderDiff } from '../common/utils/diffUtils';
import * as JSON5 from 'json5';
import * as _ from 'underscore';
import { Diff } from './dto/diff.dto';
import { CaseService } from './case/case.interface';
import { NedbCaseService } from './case/nedbCase.service';
import { Case } from './case/case.model';
import { Status } from '../common/constants/status.enum';

@Injectable()
export class QSTesterService {
  private caseService: CaseService;

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
  ) {
    this.caseService = new NedbCaseService(config.get('config.localDB'));
  }

  private async testSample0(qsAddress: string, qsBody: string): Promise<any> {
    return axios.post(`http://${qsAddress}`, JSON5.parse(qsBody))
      .then(res => res.data);
  }

  async testSample(qsHost1: string, qsHost2: string, qsPath: string, qsBody: string): Promise<Diff> {
    let res1: any = Promise.resolve({});
    if (!!qsHost1) {
      res1 = this.testSample0(`${qsHost1}${qsPath}`, qsBody);
    }
    let res2: any = Promise.resolve({});
    if (!!qsHost2) {
      res2 = this.testSample0(`${qsHost2}${qsPath}`, qsBody);
    }

    const res1Data = (await res1).data;
    const res2Data = (await res2).data;
    // 如果都不存在
    if (!res1Data && !res2Data) {
      return Promise.resolve(new Diff('', '', true, renderDiff('', '', { fileName: '-' })));
    }

    // 如果 res1Data 不存在
    if (!res1Data) {
      const resStr = JSON5.stringify(res2Data, null, 2);
      return Promise.resolve(new Diff(
        '',
        resStr,
        false,
        renderDiff(resStr + '\n', resStr, { fileName: '-' }),
      ));
    }
    // 如果 res2Data 不存在
    if (!res2Data) {
      const resStr = JSON5.stringify(res1Data, null, 2);
      return Promise.resolve(new Diff(
        resStr,
        '',
        false,
        renderDiff(resStr + '\n', resStr, { fileName: '-' }),
      ));
    }
    // 如果都存在
    const res1Str = JSON5.stringify(res1Data, null, 2);
    const res2Str = JSON5.stringify(res2Data, null, 2);
    return Promise.resolve(new Diff(
      res1Str,
      res2Str,
      _.isEqual(res1Str, res2Str),
      renderDiff(res1Str + '\n', res2Str, { fileName: '-' }),
    ));
  }

  async createCase(o: Case): Promise<Case> {
    return this.caseService.createCase(o);
  }

  async listAllCases(): Promise<Case[]> {
    return this.caseService
      .listCases({ status: Status.NORMAL })
      .then(cases => _.sortBy(cases, 'createAt').reverse());
  }
}
