const K = 1024;
const M = K * 1024;
const G = M * 1024;
const T = G * 1024;

const transformByte = (v, precision = 2, suffix = '') => {
    if (v == null) {
        return '';
    }

    const transform = (v, s) => `${v.toFixed(precision)}${s}${suffix}`

    if (v >= T) {
        v /= T;
        return transform(v, 'T');
    }

    if (v >= G) {
        v /= G;
        return transform(v, 'G');
    }

    if (v >= M) {
        v /= M;
        return transform(v, 'M');
    }

    if (v >= K) {
        v /= K;
        return transform(v, 'K');
    }

    return transform(v, '');
}

const transformDuration = (v) => {
    if (v === null || v === '' || isNaN(v)) {
        return '00:00:00';
    }

    v = Math.round(Number(v));

    let h = '00';
    if (v >= 3600) {
        h = Math.floor(v / 3600);
        h = h > 9 ? h : `0${h}`;
        v = v % 3600;
    }

    let m = '00';
    if (v >= 60) {
        m = Math.floor(v / 60);
        m = m > 9 ? m : `0${m}`;
        v = v % 60;
    }

    let s = v > 9 ? v : `0${v}`;

    return `${h}:${m}:${s}`;
}

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const transformObject = (object, handle) => {
    if (
        !object
        || !handle
        || (!isObject(object) && !Array.isArray(object))
    ) {
        return object;
    }

    if (isObject(object)) {
        let newObj = {...object};

        let resultObj = {};
        Object.keys(newObj).map(item => {
            try {
                if (!isObject(newObj[item]) && !Array.isArray(newObj[item])) {
                    const result = handle(item, newObj[item]);
                    resultObj[result.key] = result.value;
                    return;
                }

                resultObj[handle(item, '').key] = transformObject(newObj[item], handle);
            } catch (e) {
                console.log(e);
                resultObj[item] = newObj[item];
            }
        });

        return resultObj;
    }

    if (Array.isArray(object)) {
        let newList = [...object];

        let resultList = [];
        newList.map((item, index) => {
            if (!isObject(item) && !Array.isArray(item)) {
                try {
                    resultList.push(handle(`${index}`, item).value);
                } catch (e) {
                    console.log(e);
                    resultList.push(item);
                }
                return;
            }

            resultList.push(transformObject(item, handle));
        });

        return resultList;
    }

    return object;
}

const getJsonData = (url) => {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, false);
        xhr.send();

        return JSON.parse(xhr.responseText);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export {
    transformByte,
    transformDuration,
    transformObject,
    getJsonData,
};