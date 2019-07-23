import { Case } from './case.model';

/**
 * 用例操作接口
 */
export interface CaseService {
  createCase(o: Case): Promise<Case>;
  listCases(param: any): Promise<Case[]>;
}
