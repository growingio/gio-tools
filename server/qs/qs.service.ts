import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Job } from './entry/job.entry';

@Injectable()
export class QSService {
  private server: Array<any>;

  constructor(private readonly config: ConfigService) {
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
}
