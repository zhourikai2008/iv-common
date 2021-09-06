
iv-common Utils
==========

Classes:
- [signalR](#signalR)
- [webSocket](#webSocket)
- [ImageResizer](#ImageResizer)

Functions:
- [transformByte()](#transformByte)
- [transformDuration()](#transformDuration)
- [transformObject()](#transformObject)
- [getJsonData()](#getJsonData)

## signalR

```js
import { utils } from 'iv-common';
const { signalR } = utils;

//connect signalR
const connection = signalR.connect(
    `/pushHub`,
    {
        onReceiveMessage: msg => {
            console.log(msg);
        },
    },
    'AccessToken'
);

//stop signalR
connection.stop();
```

##webSocket

```js
import { utils } from 'iv-common';
const { webSocket } = utils;

const ws = new webSocket();
const urlParams = {
    deviceCode: 'xxxx-xxx-xxx-xx'
};

//connect webSocket
ws.connect({
    host: '192.168.3.26',
    port: '10086',
    ...urlParams,
}, (msg) => {
    console.log(msg);
});

//close webSocket
ws.close();
```

##ImageResizer

```js
import { utils } from 'iv-common';
const { ImageResizer } = utils;

const imageResizer = new ImageResizer({
    resizeMode: 'auto',
    // auto, width, height.
    // auto: automatic resize according to the maximum width and height ratio.
    // width: only according to the width, whether equal proportion resize is needed or not is judged.
    // height: only according to the height.
    maxWidth: 400,
    maxHeight: 400,
});
const url = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2020%2F03%2F23%2F1584960099168856.jpeg&refer=http%3A%2F%2Fimg2.ctoutiao.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633255836&t=0414ec322c57d38816040cb258e0cc00';
imageResizer.execute(
    url,
    'url',
    (err, base64) => {
        if (err) {
            console.log(err);
            return;
        }
        
        console.log(base64);
    }
);

imageResizer.reset({
    maxWidth: 200,
    maxHeight: 200,
});
imageResizer.execute(url, 'url', (err, base64) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(base64);
});
```

##transformByte()
```js
function transformByte(value: number, precision?: number, suffix?: string): string;
```

###usage
```js
import { utils } from 'iv-common';
const { transformByte } = utils;

transformByte(100000000);
// 95.37M

transformByte(100000000, 0);
// 95M

transformByte(100000000, 3, 'B');
// 95.367MB
```

##transformDuration()
```js
function transformDuration(value: number): string;
```
Transform seconds to hours:mm:ss.

###usage
```js
import { utils } from 'iv-common';
const { transformDuration } = utils;

transformDuration();
// 00:00:00

transformDuration(100000);
// 27:46:40

transformDuration(3600);
// 01:00:00
```

##transformObject()
```js
function transformObject(object: Object, handle: Handle): Object;
function Handle(key: string, value: any): Object;
```
Transform key and value in Object with recursive way.

###usage
```js
import { utils } from 'iv-common';
const { transformObject } = utils;

transformObject({s: 1}, (key, value) => {
    // must return object like {key: xx, value: xx}
    return {
        key: key.toUpperCase(),
        value
    };
});
// {S: 1}

transformObject({s: 1, x: {ss: 1}}, (key, value) => {
    // must return object like {key: xx, value: xx}
    return {
        key: key.toUpperCase(),
        value: value + 1
    };
});
// {S: 2, X: {SS: 2}}

transformObject([1, 2, 3], (key, value) => {
    // must return object like {key: xx, value: xx}
    return {
        key,
        value: value * value
    };
});
// [1, 4, 9]
```

##getJsonData()
```js
function getJsonData(url: string): Object | null;
```

###usage
```js
import { utils } from 'iv-common';
const { getJsonData } = utils;

getJsonData('/config.json');
// {version: '1.0.0'}
```