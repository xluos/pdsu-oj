/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Button,
  Select,
  Switch,
  Message,
  Rating,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import api from "../../../../api";
import { mixin } from '../../../../lib/Utils';
import { getUserInfo } from '../../../../lib/Storage';
import { withRouter } from "react-router-dom";

const { Row, Col } = Grid;

@withRouter
export default class ProblemForm extends Component {
  static displayName = 'ProblemForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.userInfo = getUserInfo()
    this.defaultValue = {
      id: '',
      title: '测试题目',
      status: 0,
      tags: [],
      describe: '描述',
      inDescribe: '描述',
      outDescribe: '描述',
      inExample: '描述',
      outExample: '描述',
      integral: 0,
      limitTime: 1000,
      limitMemory: 32768,
      hint: '',
      source: this.userInfo.name,
      sourceId: this.userInfo.userId,
      example: '',
    }
    this.state = {
      value: mixin({ ...this.defaultValue}, props.problemInfo),
      isCreate: props.problemInfo ? false : true,
      postLoading: false,
      tagDataSource: [ // TODO 二期改为远程获取
        {label:'模拟', value:'模拟'},
        {label:'DP', value:'DP'},
        {label:'图论', value:'图论'},
        {label:'最短路', value:'最短路'},
        {label:'树', value:'树'},
      ]
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
      try {
        const data = await api.problem.setProblem(values)
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
        // if (!this.state.isCreate) {
          this.props.history.push('/admin/problem')
        // }
      }
    });
  };

  render() {
    const { tagDataSource } = this.state;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{this.state.isCreate ? '创建题目' : '题目信息修改'}</h2>

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
                  <IceFormBinder name="title" required message="必填">
                    <Input
                      trim
                      size="large"
                      placeholder="请输入题目标题"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="title" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  时间限制：
                </Col>
                <Col s="6" l="4">
                  <IceFormBinder name="limitTime" required message="必填">
                    <Input
                      trim
                      size="large"
                      placeholder="请输入题目标题"
                      addonTextAfter="MS"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="limitTime" />
                </Col>
                <Col xxs="2" s="2" l="2" style={styles.formLabel}>
                  空间限制：
                </Col>
                <Col s="6" l="4">
                  <IceFormBinder name="limitMemory" required message="必填">
                    <Input
                      trim
                      size="large"
                      placeholder="请输入题目标题"
                      addonTextAfter="K"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="limitMemory" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  启用题目：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="status"
                    valuePropName="checked"
                    setFieldValue={(selected) => selected === 1 }  // 转换为 boolean 传给 switch
                    getFieldValue={(checked) => checked ? 1 : 0 }  // 返回值转换为 number 给表单值
                    >
                    <Switch />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  题目标签：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="tags"
                    >
                    <Select
                      aria-label="题目标签"
                      mode="tag"
                      dataSource={tagDataSource}
                      style={{width: '100%', fontSize: 14}} />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  题目难度：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="integral"
                    >
                    <Rating defaultValue={1} size="large" />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  题目描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="describe" required message="不能为空" >
                    <Input.TextArea
                      placeholder="请输入100字以内的描述"
                      autoHeight={{minRows: 6, maxRows: 30}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                  <IceFormError name="describe" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  输入描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="inDescribe" required message="不能为空">
                    <Input.TextArea
                      placeholder="输入描述"
                      autoHeight={{minRows: 6, maxRows: 30}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                  <IceFormError name="inDescribe" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  输出描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="outDescribe" required message="不能为空">
                    <Input.TextArea
                      placeholder="输出描述"
                      autoHeight={{minRows: 6, maxRows: 30}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                  <IceFormError name="outDescribe" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  输入样例：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="inExample" required message="不能为空">
                    <Input.TextArea
                      placeholder="输入样例"
                      autoHeight={{minRows: 6, maxRows: 30}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                  <IceFormError name="inExample" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  输出样例：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="outExample" required message="不能为空">
                    <Input.TextArea
                      placeholder="输出样例"
                      autoHeight={{minRows: 6, maxRows: 30}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="描述" />
                  </IceFormBinder>
                  <IceFormError name="outExample" />
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  提示：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="hint">
                    <Input.TextArea
                      placeholder="提示信息"
                      autoHeight={{minRows: 3, maxRows: 6}}
                      style={{ width: '100%', lineHeight: 1.5, padding: 'padding: 4px 0' }}
                      aria-label="提示信息" />
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
