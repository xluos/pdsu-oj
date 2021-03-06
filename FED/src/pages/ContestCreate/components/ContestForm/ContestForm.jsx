/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Button,
  Select,
  Message,
  DatePicker,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder';
import api from "../../../../api";
import requestClient from '../../../../api/api'
import { mixin } from '../../../../lib/Utils';
import { getUserInfo } from '../../../../lib/Storage';
import { withRouter } from "react-router-dom";
import { debounce } from 'lodash'

import moment from 'moment';
moment.locale('zh-cn');

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

@withRouter
@DataBinder({
  problemSearch: {
    url: '/problem/search',
    method: 'post',
    data: {
      key: ''
    },
    defaultBindingData: {
      list: []
    }
  }
}, {requestClient})
export default class ContestFrom extends Component {
  static displayName = 'ContestFrom';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.userInfo = getUserInfo()
    const nowTime = moment()
    this.defaultValue = {
      id: '',
      name: '测试竞赛标题',
      type: 0,
      contestTime: [nowTime,nowTime],
      hint: '',
      userGroup: [
      ],
      contestProblem: [],
      createUserName: this.userInfo.name,
      createUserId: this.userInfo.userId,
    }
    this.state = {
      value: mixin({ ...this.defaultValue}, props.contestInfo),
      isCreate: props.problemInfo ? false : true,
      postLoading: false,
      userGroupDate: [
        {label: "test", value: 1},
        {label: "test", value: 1},
        {label: "test", value: 1},
        {label: "test", value: 1},]
    };
  }

  handleReset = () => {
    this.setState({
      value: this.defaultValue
    });
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  onSearch = debounce((val) => {
    this.props.updateBindingData('problemSearch', {data: {key: val}})
  }, 500)
  validateAllFormField = () => {
    this.refs.form.validateAll(async (errors, values) => {
      if (errors) {
        return ;
      }
      this.setState({
        postLoading: true,
      })
      if(this.state.isCreate) {
        values.createUserId = this.userInfo.id
      }
      let data
      try {
        data = await api.contest.setContest(values)
        if (data.code) {
          throw Error(data.message)
        }
        Message.success(data.message)
      } catch (error) {
        console.error(error)
        Message.error('请求错误，更多信息查看控制台')
      } finally {
        this.setState({
          postLoading: false,
        })
      }
      console.log(data)
      if (!data.code) {
        this.props.history.push('/admin/contest')
      }
    });
  };

  render() {
    const { userGroupDate } = this.state;
    const { problemSearch } = this.props.bindingData;
    const contestProblemDate = problemSearch.list.map(it => ({
      label: it.title,
      value: {
        id: it.id,
        title: it.title
      }
    }))
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{this.state.isCreate ? '创建比赛' : '比赛信息修改'}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  UUID：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="id">
                    <Input
                      disabled
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="id" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  标题：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required message="必填">
                    <Input
                      trim
                      size="large"
                      placeholder="请输入题目标题"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  比赛时间：
                </Col>
                <Col s="6" l="10">
                  <IceFormBinder name="contestTime" required message="请选择">
                    <RangePicker showTime={{  format: 'HH:mm' }} format="YYYY-MM-DD"/>
                  </IceFormBinder>
                  <IceFormError name="contestTime" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  所属用户组：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="userGroup"
                    >
                    <Select
                      aria-label="题目标签"
                      mode="tag"
                      dataSource={userGroupDate}
                      style={{width: '100%', fontSize: 14}} />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  所属题目：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="contestProblem"
                    >
                    <Select
                      aria-label="题目标签"
                      mode="tag"
                      onSearch={this.onSearch}
                      dataSource={contestProblemDate}
                      filterLocal={false}
                      style={{width: '100%', fontSize: 14}} />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  通知/提示：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="hint">
                    <Input.TextArea
                      placeholder="请输入100字以内的提示"
                      rows={4}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3" xxs="6" s="3" l="3">
              <Button
                size="large"
                type="primary"
                loading={this.state.postLoading}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
            <Col xxs="6" s="3" l="3">
              <Button
                size="large"
                type="primary"
                onClick={this.handleReset}
              >
                重 置
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
