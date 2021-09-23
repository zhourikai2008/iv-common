import React, { PureComponent } from 'react';
import Step from './Step';
import styles from './index.less';

class Steps extends PureComponent {
  stepsChildren = () => {
    const { children } = this.props;
    let arr = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.typeName === 'step') {
        // debugger;
        arr.push(item);
      }
    });
    return arr;
  };
  onClock = index => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(index);
    }
  };
  render() {
    const { onChange, current } = this.props;

    return (
      <div className={styles.steps}>
        {this.stepsChildren().map((v, i) => (
          <Step
            enAbled={!!onChange}
            {...v.props}
            num={i}
            current={current}
            onClock={this.onClock}
            key={i}
          />
        ))}
      </div>
    );
  }
}
Steps.Step = Step;
export default Steps;
