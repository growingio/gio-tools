import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { Job } from './dto/job.dto';
import { Auth } from './entity/auth.entity';

@Injectable()
export class QSService {
  private server: Array<any>;

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>,
  ) {
    this.server = config.get('config.qs.server');
  }

  async getStatRunningJob(): Promise<Job[]> {
    return await Promise.all(
      this.server.map(s =>
        axios.get(`http://${s.address}/stat/runningJob`)
          .then(res => res.data.value || [])
          .then(it => ({server: s.name, values: it })),
      ))
      .then(data => {
        const jobs: Array<Job> = [];
        data.forEach(it => {
          it.values.forEach(value => {
            jobs.push(new Job(it.server, value.ai, value.jobId, value.requestId, value.runningTime));
          });
        });
        return jobs;
      });
  }

  async getExportStatus(): Promise<string[]> {
    const auths = await this.repository.find({ provider: 'a016ee4c2a76b6bb' });
    if (auths.length === 0) {
      return Promise.resolve([]);
    }
    // 降序, 取ID最大的那个
    const auth = auths.sort((a, b) => b.id - a.id)[0];
    // 获取下载链接
    return await axios.get(
      'https://www.growingio.com/v2/insights/day/page/a016ee4c2a76b6bb/2018112500.json',
      { headers: { 'X-Client-Id': auth.key, 'Authorization': auth.token } },
    ).then(res => res.data || {})
     .then(data => data.downloadLinks || []);
  }
}
