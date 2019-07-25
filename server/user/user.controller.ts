import { Controller, Req, Post, Get, Body, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { UserService } from 'user/user.service';

@Controller('/api/user')
export class UserController {

  private sessionKey: string;

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    this.sessionKey = this.config.get('config.session.key') || 'sessionId';
  }

  /**
   * 登录系统
   */
  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Req() req: Request,
  ): Promise<boolean> {
    // 1. 登录系统, 登录失败抛出异常
    const hasLogin = await this.userService.login(username, password);
    if (!hasLogin) {
      throw new UnauthorizedException();
    }
    // 2. 如果登录成功, 更新用户状态信息
    if (!req.cookies || !req.cookies[this.sessionKey]) {
      throw new UnauthorizedException();
    }
    const sessionId = req.cookies[this.sessionKey];
    await this.userService.upsertSession(sessionId, username);
    return Promise.resolve(hasLogin);
  }

  /**
   * 登录系统
   */
  @Get('/logout')
  async logout(@Req() req: Request): Promise<boolean> {
    if (!req.cookies || !req.cookies[this.sessionKey]) {
      return Promise.resolve(true);
    }
    const sessionId = req.cookies[this.sessionKey];
    // 查询
    const user = await this.userService.findBySessionId(sessionId);
    if (!user || !user.username) {
      return Promise.resolve(true);
    }
    // 删除
    await this.userService.deleteBySessionId(sessionId);
    return Promise.resolve(true);
  }

  /**
   * 获取当前登录的用户
   */
  @Get('/current')
  async current(@Req() req: Request): Promise<any> {
    const sessionId = req.cookies[this.sessionKey];
    return this.userService.findBySessionId(sessionId);
  }
}
