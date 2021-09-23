
iv-common Components
==========

- [SketchPicker](#SketchPicker)
- [Space](#Space)
- [Steps](#Steps)
- [VideoPlayer](#VideoPlayer)

## SketchPicker

```js
import { components } from 'iv-common';
const { SketchPicker } = components;

ReactDOM.render(
  <div>
    <SketchPicker
      value="000000" // default black
      onChange={val => console.log(value)}
    />
  </div>,
  mountNode,
);
```

## Space

```js
import { components } from 'iv-common';
const { Space } = components;

ReactDOM.render(
  <div>
    <Space
      size="small"             // default small; small, middle, larges and numbers.
      direction="horizontal"   // default horizontal; horizontal and vertical.
      align="center"           // default center; css align-items.
      wrap={false}             // default false; css flex-wrap.
    />
  </div>,
  mountNode,
);
```

## Steps

```js
import { components } from 'iv-common';
const { Steps } = components;

class App extends React.Component {
  state = {
    current: 0,
  };

  render() {
    return (
      <div>
        <Steps
          current={this.state.current}
          onChange={value => this.setState({ current: value })}
        >
          <div>test1</div>

          <div>test2</div>
        </Steps>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <App/>
  </div>,
  mountNode,
);
```

## VideoPlayer

```js
import { components } from 'iv-common';
const { VideoPlayer } = components;

ReactDOM.render(
  <div>
    <VideoPlayer
      src="./test.mp4"   // required
      autoplay           // unrequired; default true
      controls           // unrequired; default true
      preload="auto"     // unrequired; default auto; auto, metadata, none
    />
  </div>,
  mountNode,
);
```