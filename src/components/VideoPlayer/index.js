import React from 'react';
import 'videojs-contrib-hls';
import '@videojs/http-streaming';
import videojs from 'video.js';
import videozhCN from 'video.js/dist/lang/zh-CN.json';
import 'video.js/dist/video-js.css';
import FLVJS from 'flv.js';

const videoJsOptions = {
  autoplay: true, // 自动播放
  language: 'zh-CN',
  controls: true, // 控制条
  preload: 'auto', // 自动加载
  errorDisplay: true, // 错误展示
  // width: 500,  //宽
  // height: 300,  //高
  fluid: true, // 跟随外层容器变化大小，跟随的是外层宽度
  // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
  // textTrackDisplay: false,  // 不渲染字幕相关DOM
  userActions: {
    hotkeys: true, // 是否支持热键
  },
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    const {src} = props;

    let suffix;
    if (src) {
      suffix = src
        .split('?')[0]
        .split('.')
        .pop();
    }

    this.state = {
      suffix,
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const {suffix} = this.state;

    switch (suffix) {
      case 'flv':
        if (FLVJS.isSupported()) {
          const flvPlayer = FLVJS.createPlayer({
            type: 'flv',
            url: src,
          });
          flvPlayer.attachMediaElement(this.flvNode);
          flvPlayer.load();
          flvPlayer.play();

          this.flvPlayer = flvPlayer;
        }
        break;

      case 'mkv':
      case 'avi':
        break;

      default:
        const option = Object.assign({}, videoJsOptions, {sources: [{src,}]}, this.props);
        this.player = videojs(this.videoNode, option);
        videojs.addLanguage('zh-CN', videozhCN);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {src} = this.props;

    const {src: nextSrc} = nextProps;

    if (src === nextSrc) {
      return;
    }

    let suffix;
    if (nextSrc) {
      suffix = nextSrc
        .split('?')[0]
        .split('.')
        .pop();
    }

    this.setState({
      suffix,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {src} = this.props;
    const {suffix} = this.state;
    const {src: prevSrc} = prevProps;

    if (src === prevSrc) {
      return;
    }

    if (this.player) {
      this.player.reset();
    }
    if (this.flvPlayer) {
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
    }

    switch (suffix) {
      case 'flv':
        if (FLVJS.isSupported()) {
          const flvPlayer = FLVJS.createPlayer({
            type: 'flv',
            url: src,
          });
          flvPlayer.attachMediaElement(this.flvNode);
          flvPlayer.load();
          flvPlayer.play();

          this.flvPlayer = flvPlayer;
        }
        break;

      case 'mkv':
      case 'avi':
        break;

      default:
        if (this.player) {
          this.player.src(src);
          this.player.load(src);
          this.player.play();

          break;
        }

        const option = Object.assign({}, videoJsOptions, {sources: [{src,}]}, this.props);
        this.player = videojs(this.videoNode, option);
        videojs.addLanguage('zh-CN', videozhCN);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.flvPlayer) {
      this.flvPlayer.destroy();
    }
  }

  render() {
    const {children, src} = this.props;
    const {suffix} = this.state;

    const option = Object.assign({}, videoJsOptions, this.props);
    const playerRender = () => {
      switch (suffix) {
        case 'flv':
          return (
            <video
              ref={node => (this.flvNode = node)}
              controls={option.controls}
              autoPlay={option.autoplay}
              style={{width: '100%'}}
            />
          );

        case 'mkv':
          return (
            <video
              controls={option.controls}
              autoPlay={option.autoplay}
              width="100%"
              height="420"
            >
              <source src={src} type="video/webm"/>
              Your browser does not support the video tag.
            </video>
          );

        case 'avi':
          return (
            <div>
              <object
                id="MediaPlayer"
                classID="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95"
                width="100%"
                height="430"
                standby="Loading Windows Media Player components…"
                type="application/x-oleobject"
                codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112"
              >
                <param name="FileName" value={src}/>
                <param name="AutoStart" value={option.autoplay}/>
                <param name="ShowControls" value={option.controls}/>
                <param name="BufferingTime" value="2"/>
                <param name="ShowStatusBar" value="false"/>
                <param name="AutoSize" value="true"/>
                <param name="InvokeURLs" value="false"/>
                <param name="AnimationatStart" value="1"/>
                <param name="TransparentatStart" value="1"/>
                <div
                  style={{
                    textAlign: 'center',
                    background: '#000',
                    color: '#fff',
                    padding: '10px 0',
                  }}
                >
                  *Your browser does not support the video tag.
                </div>
              </object>
            </div>
          );

        default:
          return (
            // wrap the player in a div with a `data-vjs-player` attribute
            // so videojs won't create additional wrapper in the DOM
            // see https://github.com/videojs/video.js/pull/3856
            <div data-vjs-player>
              <video
                ref={node => (this.videoNode = node)}
                className="video-js"
              >
                {children}
              </video>
            </div>
          )
      }
    }

    return (
      <div>
        {playerRender()}
      </div>
    );
  }
}

export default VideoPlayer;
