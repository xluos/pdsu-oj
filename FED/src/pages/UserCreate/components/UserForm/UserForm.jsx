/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Button,
  Select,
  Switch,
  NumberPicker,
  Message,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import api from "../../../../api";
import { mixin } from '../../../../lib/Utils';

const { Row, Col } = Grid;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: mixin({
        id: '',
        name: '',
        userId: '',
        photo: '',
        submit: 0,
        solved: 0,
        accepted: 0,
        coin: 0,
        integral: 0,
        level: 0,
        email: '',
        desc: '',
        userGroup: null,
        status: 0,
        password: '',
        repassword: '',
      }, props.userInfo),
      isCreate: props.userInfo ? false : true,
      postLoading: false
    };
  }

  checkPasswd = (rule, values, callback, stateValues) => {
    debugger
    if (stateValues.id && !values) {
      callback();
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (stateValues.password && !values) {
      callback('请输入确认密码');
    }else if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll(async (errors, values) => {
      console.log('aaaa');
      if (errors) {
        return ;
      }
      this.setState({
        postLoading: true,
      })
      try {
        const data = await api.user.setUserInfo(values)
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
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{this.state.isCreate ? '创建用户' : '用户信息修改'}</h2>

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
                  ID：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="userId"
                    disabled={!this.state.isCreate}
                    required={true}
                    len={9}
                    message='必填9位数字ID'
                    >
                    <Input
                      trim
                      size="large"
                      placeholder="请输入9位数字用户ID"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="userId" />
                </Col>
              </Row>

              {/* TODO 二期再做 */}
              {/* <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  头像：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required message="必填">

                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row> */}

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required message="必填">
                    <Input
                      trim
                      size="large"
                      placeholder="请输入用户名"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  个人描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="desc" >
                    <Input.TextArea
                      placeholder="请输入100字以内的描述"
                      maxLength={100}
                      rows={4}
                      hasLimitHint
                      style={{ width: '100%' }}
                      aria-label="请输入100字以内的个人描述" />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    type="email"
                    name="email"
                    message="请输入正确的邮箱"
                  >
                    <Input
                      trim
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="xxxx@acmer.club"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户组：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="userGroup">
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: '管理员', value: 'administrator' },
                        { label: '投稿者', value: 'contributor' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  启用帐号：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="status"
                    valuePropName="checked"
                    setFieldValue={(selected) => selected === 0 }  // 转换为 boolean 传给 switch
                    getFieldValue={(checked) => checked ? 0 : 1 }  // 返回值转换为 number 给表单值
                    >
                    <Switch />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="password"
                    validator={(rule, values, callback) =>
                      this.checkPasswd(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )}
                  >
                    <Input
                      trim
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="repassword"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      trim
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="repassword" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  提交数：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="submit" >
                    <NumberPicker style={{ width: '100%' }} min={0} />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  通过数：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="solved" >
                    <NumberPicker style={{ width: '100%' }} min={0} />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  AC数：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="accepted" >
                    <NumberPicker style={{ width: '100%' }} min={0} />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  积分：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="integral" >
                    <NumberPicker style={{ width: '100%' }} min={0} />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  OJ币：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="coin" >
                    <NumberPicker style={{ width: '100%' }} min={0} />
                  </IceFormBinder>
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                loading={this.state.postLoading}
                onClick={this.validateAllFormField}
              >
                提 交
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
