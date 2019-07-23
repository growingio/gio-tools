import { CaseService } from './case.interface';
import { Case } from './case.model';
import * as path from 'path';
import * as Datastore from 'nedb-promise';

/**
 * NeDB 的实现
 */
export class NedbCaseService implements CaseService {
  private caseDB: any;
  private caseDetailDB: any;

  constructor(dbConfig: any) {
    this.caseDB = Datastore({
      filename: path.resolve(dbConfig.path, 'qs_test_cases.db'),
      autoload: true,
    });
    this.caseDetailDB = Datastore({
      filename: path.resolve(dbConfig.path, 'qs_test_case_details.db'),
      autoload: true,
    });
  }

  async createCase(o: Case): Promise<Case> {
    return this.caseDB.insert(o);
  }

  listCases(param: any): Promise<Case[]> {
    return this.caseDB.find(param);
  }
}
