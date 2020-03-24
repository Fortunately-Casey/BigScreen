export function getURL(url) {
    let _result = '';
    if (process.env.NODE_ENV === 'development') {
        _result = `/api${url}`; // 开发环境会自动走代理
        // _result = `http://58.221.154.38:8099/${url}`; // 开发环境会自动走代理
    } else if (process.env.NODE_ENV === 'production') {
        _result = `https://yqfk.ntkfqjy.com:20000/api${url}`; // 正式环境地址
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

// 日期转换
export function Todate(chinadatetime) { //Fri Oct 31 18:00:00 UTC+0800 2008 
    if (chinadatetime) {
        var d = new Date(chinadatetime);
        var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        var date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        var datetime = d.getFullYear() + '-' + month + '-' + date;
        return datetime;
    } else {
        return "";
    }
}

