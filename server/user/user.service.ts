import { Injectable } from '@nestjs/common';
import { ConfigService, InjectConfig } from 'nestjs-config';
import * as path from 'path';
import * as Datastore from 'nedb-promise';
import * as LdapClient from 'promised-ldap';

@Injectable()
export class UserService {
  private sessionDB: any;
  private sysClient: any;

  constructor(
    @InjectConfig()
    private readonly config: ConfigService,
  ) {
    this.sessionDB = Datastore({
      filename: path.resolve(config.get('config.localDB.path'), 'user_login_session.db'),
      autoload: true,
    });
    // 初始化登录客户端
    const loginProps = config.get('config.login');
    if (loginProps && loginProps.type === 'ldap' && loginProps.ldap.enable) {
      const ldapProps = loginProps.ldap;
      this.sysClient = new LdapClient({
        url: ldapProps.url,
      });
      this.sysClient.bind(ldapProps.systemUsername, ldapProps.systemPassword);
    }
  }

  /**
   * 根据 sessionId 获取当前登录用户
   */
  async findBySessionId(sessionId: string): Promise<any> {
    return this.sessionDB.findOne({_id: sessionId});
  }

  /**
   * 删除当前登录用户
   */
  async deleteBySessionId(sessionId: string): Promise<any> {
    return this.sessionDB.update({_id: sessionId}, { $unset: { username: true } });
  }

  /**
   * 更新当前登录用户的状态
   */
  async upsertSession(sessionId: string, username: string): Promise<any> {
    // sessionId 不存在, 新增一个
    if (!sessionId) {
      return this.sessionDB.insert({});
    }
    // 用户名存在, 更新用户名
    if (username) {
      await this.sessionDB.update({_id: sessionId}, { username });
    }
    // 返回存在的文档
    return this.sessionDB.findOne({_id: sessionId});
  }

  /**
   * 登录系统
   */
  async login(username: string, password: string): Promise<boolean> {
    if (!this.sysClient) {
      return Promise.resolve(false);
    }
    const ldapProps = this.config.get('config.login.ldap');
    /*
    this.sysClient.search(ldapProps.search.userBase, {
      filter: ldapProps.search.filter.replace('{0}', `${username}`),
      attributes: ldapProps.search.attributes,
      scope: 'sub',
    })
    */
    const client = new LdapClient({
      url: ldapProps.url,
    });
    return client.bind(username, password)
      .then(r => {
        return client.search(ldapProps.search.userBase, {
          scope: 'sub',
          filter: ldapProps.search.filter.replace('{0}', `${username}`),
        })
        .then(o => o.entries[0].object)
        .then(u => (client.unbind(), u))
        .then(_ => true);
      })
      .catch(err => {
        if (err.name === 'InvalidCredentialsError') {
          return false;
        } else {
          throw err;
        }
      });
  }
}
