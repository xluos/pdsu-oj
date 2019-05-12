import React, { Component } from 'react';
import {
  Input,
  Switch,
  Button,
  Message,
} from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import api from '../../../../api/api';
import Api from '../../../../api';
import { withRouter } from 'react-router';
import produce from "immer"
import CodeBlock from '../CodeBlock';
import { getUserInfo } from '../../../../lib/Storage';
import _ from 'lodash';

@withRouter
@DataBinder({
  PinglunList: {
    url: '/discuss/list',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      pageNo: 1,
      pageSize: 20,
      pageEnd: 1,
      total: 0,
      items: []
    }
  }
}, {requestClient: api})
export default class PinglunList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      value: {
        pageNo: 1,
        pageSize: 20,
        where: {
          problemId: _.get(props, 'match.params.id', ''),
        },
        sort: 'createdAt_DESC'
      },
      content: '',
      userInfo: getUserInfo() || {}
    };
  }

  async componentDidMount() {

    await this.setStateAsync(produce(state => {
      state.value.where.problemId = _.get(this.props, 'match.params.id', '')
    }))
    // debugger
    this.props.updateBindingData('PinglunList', { data: this.state.value })
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  handlePaginationChange = async (pageNo) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = pageNo
    }))
    console.log(this.state.value, pageNo);
    this.props.updateBindingData('PinglunList', { data: this.state.value })
  };

  handlePageSizeChange = async (pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('PinglunList', { data: this.state.value })
  };

  handleFilterTagChange = (tag) => {
  };

  handleFilterTextChange = async (val) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = 1
      state.value.where = {
        text: val
      }
    }))
    this.props.updateBindingData('PinglunList', { data: this.state.value })
  };
  submit = async () => {
    if (!this.state.userInfo.userId) {
      Message.error("请登陆后提交")
      return
    }
    Message.loading('正在提交')
    await Api.discuss.setDiscusses({
      problemId: _.get(this.props, 'match.params.id', ''),
      content: this.state.content,
      userId: this.state.userInfo.userId,
      userName: this.state.userInfo.name,
    })
    Message.success('提交成功')
    this.setState(produce(state => {
      state.content = ''
    }))
    this.props.updateBindingData('PinglunList', { data: this.state.value })
  }
  render() {
    const { PinglunList } = this.props.bindingData;

    return (
      <div style={styles.container}>
        <h4 style={{fontSize: 18}}><FoundationSymbol type="directory"/> 评论</h4>
        <IceContainer>
          <Input.TextArea
            placeholder="请输入评论"
            onChange={(value) => {
              this.setState(produce(state => {
                state.content = value
              }))
            }}
            autoHeight={{minRows: 6, maxRows: 30}}
            style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
            aria-label="描述" />
          <Button onClick={this.submit}>提交</Button>
        </IceContainer>
        <IceContainer>
          {
            PinglunList.items.map(item => (
              <CodeBlock style={{minHeight: 100}} content={item.content} copy={false}
                name={item.userName} time={item.createdAt} key={item.id}/>
            ))
          }

          {/* <Pagination
            shape="arrow-only"
            pageSizeList={[10, 20, 35]}
            style={styles.paginationBottom}
            total={problemTable.total}
            pageSize={problemTable.pageSize}
            totalRender={total => `总数: ${total}`}
            current={this.state.value.pageNo}
            onChange={this.handlePaginationChange}
            onPageSizeChange={this.handlePageSizeChange}
            pageSizeSelector="filter"
            useFloatLayout
          /> */}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  paginationTop: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  container: {
    margin: '32px 0',
  },
  paginationBottom: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
