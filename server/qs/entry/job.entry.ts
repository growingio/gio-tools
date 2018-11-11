/**
 * Job model
 */
export class Job {
  // 服务器地址和
  server: string;
  // 项目ID
  ai: string;
  // 任务ID
  jobId: string;
  // 请求ID
  requestId: string;
  // 执行时间
  runningTime: number;

  constructor(server: string, ai: string, jobId: string, requestId: string, runningTime: number) {
    this.server = server;
    this.ai = ai;
    this.jobId = jobId;
    this.requestId = requestId;
    this.runningTime = runningTime;
  }
}
