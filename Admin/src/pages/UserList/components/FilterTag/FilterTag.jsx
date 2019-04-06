import React, { Component } from 'react';
import styles from './index.module.scss';

const MOCK_DATA = [
  {
    selected: '全部',
    label: '用户组',
    value: ['全部'],
  },
  {
    selected: '全部',
    label: '用户等级',
    value: ['全部', '青铜', '白银', '黄金', '铂金', '钻石', '最强王者'],
  },
  {
    selected: '全部',
    label: '权限组',
    value: ['全部'],
  },
];

export default class FilterTag extends Component {
  state = {
    data: MOCK_DATA,
  };

  handleClick = (value, index) => {
    const { data } = this.state;
    data[index].selected = value;
    this.setState(
      {
        data,
      },
      () => {
        this.props.onChange();
      }
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.filterContent}>
        {data.map((item, index) => {
          const lastItem = index === data.length - 1;
          const lastItemStyle = lastItem ? { marginBottom: 10 } : null;
          return (
            <div className={styles.filterItem} style={lastItemStyle} key={index}>
              <div className={styles.filterLabel}>{item.label}:</div>
              <div className={styles.filterList}>
                {item.value.map((text, idx) => {
                  const activeStyle =
                    item.selected === text ? styles.activeText : styles.filterText;
                  return (
                    <span
                      onClick={() => this.handleClick(text, index)}
                      className={activeStyle}
                      key={idx}
                    >
                      {text}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
