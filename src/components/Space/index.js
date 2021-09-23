import React, { PureComponent } from 'react';

/**
 * size支持small，middle，larges三种类型以及number
 * direction:支持horizontal和vertical
 */
export default class Space extends PureComponent {
  getSize = size => {
    let gap = '10px';
    if (typeof size === 'string') {
      switch (size) {
        case 'small':
          gap = '10px';
          break;

        case 'middle':
          gap = '20px';
          break;

        case 'large':
          gap = '30px';
          break;

        default:
          gap = size;
          break;
      }
    } else if (typeof size === 'number') {
      gap = `${size}px`;
    }

    return gap;
  };

  getDirection = direction => {
    let d;

    switch (direction) {
      case 'horizontal':
        d = 'row';
        break;

      case 'vertical':
        d = 'column';
        break;

      default:
        d = 'row';
        break;
    }

    return d;
  };

  render() {
    const { align = 'center', wrap = false, direction = 'horizontal', size = 'small' } = this.props;
    const gap = this.getSize(size);
    const style = {
      display: 'inline-flex',
      alignItems: align,
      justifyContent: 'space-between',
      flexDirection: this.getDirection(direction),
      MozColumnGap: gap /* Firefox */,
      WebkitColumnGap: gap /* Safari and Chrome */,
      columnGap: gap,
      rowGap: gap,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    };

    return <div style={style}>{this.props.children}</div>;
  }
}
