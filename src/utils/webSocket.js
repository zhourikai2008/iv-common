import {stringify} from 'qs';

class webSocket {
  ws = null;
  timeout = null;

  constructor() {
  }

  connect(config = {}, callback) {
    const newConfig = Object.assign({
      host: location.hostname,
      port: 80
    }, config);

    const {host, port, ...params} = newConfig;
    const url = `ws://${host}:${port}?${stringify(params)}`;
    let ws = new WebSocket(url, 'echo-protocol');

    ws.onopen = this.onopen;
    ws.onmessage = (evt) => this.onmessage(evt, callback);
    ws.onerror = (evt) => this.onerror(evt, newConfig, callback);
    ws.onclose = (evt) => this.onclose(evt, newConfig, callback);

    this.ws = ws;
  }

  reconnect(config, callback) {
    //1：与服务器已经建立连接
    if (this.ws.readyState === 1) {
      clearTimeout(this.timeout);
    } else {
      //3：已经关闭了与服务器的连接
      if (this.ws.readyState === 3) {
        this.connect(config, callback);
      }

      //0：正尝试与服务器建立连接,2：正在关闭与服务器的连接
      this.timeout = setTimeout(() => {
        this.reconnect();
      }, 1000);
    }
  };

  onopen() {
    console.log('WebSocket connected!');
    this.ws.send('hello');
  }

  onmessage(evt, callback) {
    const received_msg = evt.data;

    if (received_msg === 'hello') {
      setTimeout(() => {
        this.ws.send('hello');
      }, 5000);
      return;
    }

    if (callback) {
      callback(received_msg);
    }
  }

  onerror(evt, config, callback) {
    console.log('WebSocket error:');
    console.log(evt);
    this.reconnect(config, callback);
  }

  onclose(evt, config, callback) {
    console.log('WebSocket closed!');

    if (evt.code !== 1000) {
      this.reconnect(config, callback);
    }
  }

  close() {
    this.ws && this.ws.close(1000);
  }
}

export default webSocket;