import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker as ReactSketchPicker } from 'react-color'

class SketchPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: '000000',
  };

  componentDidMount() {
    const { value, onChange } = this.props;

    const initValue = value || '000000';
    if (onChange) onChange(initValue);
    this.setState({
      color: initValue
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        color: nextProps.value
      });
    }
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  };

  handleClose = () => {
    this.setState({
      displayColorPicker: false
    })
  };

  handleChange = (color) => {
    const { onChange } = this.props;

    const value = color.hex.replace(/#/, '');
    if (onChange) onChange(value);
    this.setState({
      color: value
    })
  };

  render() {
    const {
      displayColorPicker,
      color
    } = this.state;
    const styles = reactCSS({
      'default': {
        main: {
          height: '39px',
          lineHeight: 'normal',
        },
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `#${color}`,
        },
        swatch: {
          margin: '7px 0px',
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div value={color} style={ styles.main }>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>

        { !!displayColorPicker && (
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>

            <ReactSketchPicker
              disableAlpha
              color={`#${color}`}
              onChange={ this.handleChange }
            />
          </div>
        )}
      </div>
    )
  }
}

export default SketchPicker
