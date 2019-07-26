import { Status } from '../../common/constants/status.enum';

export class Case {

  name: string;
  owner: string;
  qsHost1: string;
  qsHost2: string;
  qsBody: string;
  type: string;
  status: Status;
  description: string;
  createAt: Date;
  updateAt: Date;

}
