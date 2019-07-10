import { Injectable } from '@nestjs/common';
import { ConfigService, InjectConfig } from 'nestjs-config';
import * as path from 'path';
import * as Datastore from 'nedb-promise';
import axios from '../axios.gio';
import * as JSON5 from 'json5';

@Injectable()
export class QSTester {
  private caseDB: any;
  private caseDetailDB: any;

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
  ) {
    const dbConfig = config.get('config.qs.db');
    this.caseDB = new Datastore({
      filename: path.resolve(dbConfig.path, 'qs_test_cases.db'),
      autoload: true,
    });
    this.caseDetailDB = new Datastore({
      filename: path.resolve(dbConfig.path, 'qs_test_case_details.db'),
      autoload: true,
    });
  }

  async testSample(qsAddress: string, qsBody: string): Promise<any> {
    return axios.post(`http://${qsAddress}`, JSON5.parse(qsBody))
      .then(res => res.data);
  }

  async getCases(): Promise<any> {
    const cases = await this.caseDB.find({});
    return Promise.resolve(cases);
  }
}
