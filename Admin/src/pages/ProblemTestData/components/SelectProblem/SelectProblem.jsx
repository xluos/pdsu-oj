import React from "react";
import IceContainer from '@icedesign/container';
import { Search } from "@alifd/next";

export default function SelectProblem({ onChange }) {
  return (
    <IceContainer style={{
      height: '500px'
    }}>
      <h2 style={styles.title}>请选择一个题目</h2>
      <Search style={{margin: '0 auto', display: 'block'}} size="large" type="secondary" placeholder="请输入题目标题"/>
    </IceContainer>
  );
}

const styles = {
  title: {
    margin: '0 0 50px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
