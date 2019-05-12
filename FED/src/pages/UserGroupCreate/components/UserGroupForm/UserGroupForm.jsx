/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Button,
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

export default class UserGroupForm extends Component {
  static displayName = 'UserGroupForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const userInfo = {"id":"cjtv3yyib008u0770crboby39","userId":"151360205","password":"7547f148abe0716431cc2e528889243f","level":5,"name":"徐大大","email":"email@xluos.com","privilegeGroup":[],"UserDiscuss":[],"UserDiscussChilder":[],"userGroup":[],"createUserGroup":[{"id":"cju472n2l003b0970i798g0q6","__typename":"UserGroup","__id":"cju472n2l003b0970i798g0q6"}],"privilegeUserGroup":[],"problems":[],"submit":1000,"solved":0,"accepted":0,"__typename":"User","__id":"cjtv3yyib008u0770crboby39"}
    this.state = {
      value: mixin({
        id: '',
        desc: '',
        name: '',
        createUserUUID: userInfo.id,
        createUserId: userInfo.userId,
        createUserName: userInfo.name,
      }, props.userInfo),
      isCreate: props.userInfo ? false : true,
      postLoading: false
    };
  }

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
      try {
        const data = await api.user.createUserGroup(values)
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
              <h2 style={styles.formTitle}>{this.state.isCreate ? '创建用户组' : '用户组信息修改'}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户组UUID：
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
                  创建者UUID：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="createUserUUID">
                    <Input
                      disabled
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  创建者ID：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="createUserId"
                    >
                    <Input
                      disabled
                      trim
                      size="large"
                      placeholder="请输入9位数字用户ID"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  创建者：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="createUserName" required message="必填">
                    <Input
                      disabled
                      trim
                      size="large"
                      placeholder="请输入用户名"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  组名：
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
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户组描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="desc">
                    <Input.TextArea
                      placeholder="请输入100字以内的描述"
                      maxLength={100}
                      rows={4}
                      hasLimitHint
                      style={{ width: '100%' }}
                      aria-label="请输入100字以内的描述" />
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
