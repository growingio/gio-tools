import { Job } from './job.dto';

/**
 * JobResult model
 */
export class JobResult {
  // jobs
  jobs: Job[] = [];
  // error servers
  errorServers: string[] = [];

  constructor(jobs: Job[], errorServers: string[]) {
    this.jobs = jobs;
    this.errorServers = errorServers;
  }
}
