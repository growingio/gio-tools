import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { UserService } from 'user/user.service';
import * as url from 'url';
import * as _ from 'underscore';

@Injectable()
export class LoginMiddleware implements NestMiddleware {

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) { }

  async use(req: Request, res: Response, next: () => void) {
    const auth = await this.hasAuth(req, res);
    if (!auth) {
      throw new UnauthorizedException();
    }
    next();
  }

  private async hasAuth(req: Request, res: Response): Promise<boolean> {
    const sessionKey = this.config.get('config.session.key') || 'sessionId';
    const expire = this.config.get('config.session.expire') || 2592000;

    const isWhite = this.isWhiteList(req);
    // 1. 如果没有cookie, 写入cookie
    if (!req.cookies || !req.cookies[sessionKey]) {
      this.initCookie(res, sessionKey, expire);
      return isWhite || false;
    }
    // 2. 如果cookie失效, 重新补充
    const sessionId = req.cookies[sessionKey];
    const user = await this.userService.findBySessionId(sessionId);
    if (!user) {
      this.initCookie(res, sessionKey, expire);
      return isWhite || false;
    }
    // 3. 如果访问路径是白名单
    if (isWhite) {
      return true;
    }
    // 4. 如果有 sessionId, 查看是否已经登录, 未登录返回false
    if (!user.username) {
      return false;
    }
    // 已经登录
    return true;
  }

  private async initCookie(res: Response, sessionKey: string, expire: number) {
    const session = await this.userService.upsertSession('', '');
    res.cookie(sessionKey, session._id, { maxAge: expire, httpOnly: false });
  }

  private isWhiteList(req: Request): boolean {
    const whiteList = this.config.get('config.request.whiteList') || [];
    const path = url.parse(req.originalUrl);
    if (_.contains(whiteList, path.pathname)) {
      return true;
    }
    return false;
  }
}
