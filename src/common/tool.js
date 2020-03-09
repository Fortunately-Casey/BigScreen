export function getURL(url) {
    let _result = '';
    if (process.env.NODE_ENV === 'development') {
        _result = `http://119.3.194.191:8099/${url}`; // 开发环境会自动走代理
    } else if (process.env.NODE_ENV === 'production') {
        _result = `http://119.3.194.191:8099/${url}`; // 正式环境地址
    }
    return _result;
}

// 防抖
export function debounce(fn, delay) {
    let timer = null
    return function () {
        let arg = arguments

        clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}

