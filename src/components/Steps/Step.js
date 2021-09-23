import React, { Component } from 'react';
import styles from './index.less';

class Step extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { title, num, current, onClock, enAbled } = this.props;
    return (
      <div className={styles.step}>
        <div
          className={`${styles.left} ${current === num ? styles.leftActived : ''} ${
            num === 0 && current === num ? styles.firstActived : num === 0 ? styles.first : ''
          }`}
        />
        <div
          className={`${styles.content} ${current === num ? styles.actived : ''}`}
          onClick={() => onClock(num)}
          style={{ cursor: enAbled ? 'pointer' : '' }}
        >
          <span className={`${styles.num} ${current === num ? styles.numActived : ''}`}>
            {num + 1}
          </span>
          <span className={`${styles.title} ${current === num ? styles.titleActived : ''}`}>
            {title}
          </span>
        </div>
        <div className={`${styles.right} ${current === num ? styles.rightActived : ''}`} />
      </div>
    );
  }
}
Step.typeName = 'step';
export default Step;
