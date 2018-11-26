import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, List } from 'antd';
import moment from 'moment';
import WrappedExportV2Form from './exportV2Form';
import Styles from './index.scss';

const { Header, Content } = Layout;

@connect(({ exportLinks }) => ({
  links: exportLinks.links,
}))
class ExportV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  fetchLinks(ai, type, date) {
    const { dispatch } = this.props;
    dispatch({
      type: 'exportLinks/fetchLinks',
      payload: {
        ai,
        type,
        date,
      },
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.formObj.getForm().validateFields((err, values) => {
      if (!err) {
        // 获取值
        const { ai, type, date } = values;
        const now = date.startOf('day').clone();
        this.fetchLinks(ai.trim(), type, now.format('YYYYMMDD'));
      }
    });
  }

  getFormatLinks() {
    const { links = [] } = this.props;
    return links.map((link) => {
      // 获取时间戳
      const idx = link.indexOf('/part-');
      const time = link.substring(idx - 12, idx);
      return {
        time, // utc 秒时间
        display: moment.utc(`${time}`, 'YYYYMMDDHHmmss').utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
        link,
      };
    });
  }

  render() {
    const { dispatch } = this.props;
    const links = this.getFormatLinks();

    return (
      <div className={Styles.exportV2}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; 原始数据导出V2接口</a>
        </Header>
        <Content className="content">
          <WrappedExportV2Form
            ref={ref => this.formObj = ref}
            handleClick={this.handleClick}
          />
          <List
            className="links"
            size="small"
            header={<div>点击链接下载</div>}
            bordered
            dataSource={links}
            renderItem={item => (
              <List.Item>
                <a rel="noopener noreferrer" href={item.link} target="_blank">{item.display}</a>
              </List.Item>
            )}
          />
        </Content>
      </div>
    );
  }
}

export default connect()(ExportV2);
