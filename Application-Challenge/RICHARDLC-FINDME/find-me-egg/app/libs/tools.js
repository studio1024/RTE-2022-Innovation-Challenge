import i18n from '../../config/i18nConfig'
export const getQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = decodeURI(window.location.search ? window.location.search : window.location.hash).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export const forEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
    return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
    const d = new Date(timeStamp)
    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'dt') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else if (startType === 'd') resStr = year + '-' + month + '-' + date
    else if (startType === 't') resStr = hours + ':' + minutes + ':' + second
    return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
    if (key) return key in obj
    else {
        let keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

export const replaceAll = (str, s1, s2) => {
    return str.replace(new RegExp(s1, 'gm'), s2);
}

/**
 * @param {*} obj 对象
 * @description 判断对象是否为空
 */
export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { return false; }
    }

    return true;
}

// 检查是否是一个字符串
export const isString = (param) => {
    if (Object.prototype.toString.call(param) === 'String') {
        return true;
    } else {
        return false;
    }
}
// 检查是否是一个数组
export const isArray = (param) => {
    if (Object.prototype.toString.call(param) === '[object Array]') {
        return true;
    } else {
        return false;
    }
}
// 检查是否是一个对象
export const isObject = (param) => {
    if (Object.prototype.toString.call(param) === 'Object') {
        return true;
    } else {
        return false;
    }
}
// JS格式化数字（每三位加逗号）
export const toThousands = (str) => {
    var newStr = '';
    var count = 0;
    if (!str && str !== 0) {
        return '-'
    } else {
        if (!isString(str)) {
            str = String(Math.abs(str))
        }
        // 当数字是整数
        if (str.indexOf('.') === -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + ',' + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr; // 自动补小数点后两位
            return str;
        } else { // 当数字带有小数
            for (var i = str.indexOf('.') - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + ',' + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; // 逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str).substr((str).indexOf('.'), ((str).length - 1));
            return str;
        }
    }
}
// 判断当前国际化语言
export const judeLanguage = () => {
    if (i18n[0].locale === 'en-US') return 'en'
    return 'zh'
}

// 日期格式统一化,参数传值是否精确到时分秒,默认为精确到时分秒
export const getTimeFormat = (flag = true, timeStr = 'HH:mm:ss') => {
    // 'yyyy-MM-dd'
    // 'dd/MM/yyyy'
    let dateStr = judeLanguage() == 'en' ? 'dd/MM/yyyy' : 'yyyy-MM-dd'
    if (flag) return dateStr + ' ' + timeStr
    return dateStr
}

// 时间转换为国际化
export const createI18nTime = (time, type) => {
    if (timePattern(time) !== '') {
        let ymdArea = time.substr(0, 10)
        ymdArea = new Date(ymdArea).Format(langueYmdFormat())
        return ymdArea + time.substr(10)
    } else {
        return time
    }
}
export const langueYmdFormat = () => {
    let timeSplit = judeLanguage() == 'en' ? '/' : '-'
    const enYmdFormat = 'dd' + timeSplit + 'MM' + timeSplit + 'yyyy'
    const cnYmdFormat = 'yyyy' + timeSplit + 'MM' + timeSplit + 'dd'
    return judeLanguage() == 'en' ? enYmdFormat : cnYmdFormat
}
export const timePattern = (time) => {
    // 日期正则
    let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    let regExp = new RegExp(reg);
    if (regExp.test(time)) {
        return langueYmdFormat();
    }
    // 日期+时正则
    reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d)$/;
    regExp = new RegExp(reg);
    if (regExp.test(time)) {
        return langueYmdFormat() + ' hh';
    }
    // 日期+时分正则
    reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d$/;
    regExp = new RegExp(reg);
    if (regExp.test(time)) {
        return langueYmdFormat() + ' hh:mm';
    }
    // 日期+时分秒的正则表达式
    reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    regExp = new RegExp(reg);
    if (regExp.test(time)) {
        return langueYmdFormat() + ' hh:mm:ss';
    }
    // 日期+时分秒+毫秒的正则表达式
    reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d.\d{3}$/;
    regExp = new RegExp(reg);
    if (regExp.test(time)) {
        return langueYmdFormat() + ' hh:mm:ss.SSS';
    }
    return '';
}
// 获取谷歌浏览器版本
export const getChromeVersion = () => {
    var arr = navigator.userAgent.split(' ');
    var chromeVersion = '';
    for (var i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) { chromeVersion = arr[i] }
    }
    if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}
export const isBrowser = () => {
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType = null;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = 'IE';
        browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
    } else if (ua.match(/firefox/) != null) { browserType = '火狐'; } else if (ua.match(/ubrowser/) != null) { browserType = 'UC'; } else if (ua.match(/opera/) != null) { browserType = '欧朋'; } else if (ua.match(/bidubrowser/) != null) { browserType = '百度'; } else if (ua.match(/metasr/) != null) { browserType = '搜狗'; } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) { browserType = 'QQ'; } else if (ua.match(/maxthon/) != null) { browserType = '遨游'; } else if (ua.match(/chrome/) != null) {
        var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
        function _mime(option, value) {
            var mimeTypes = navigator.mimeTypes;
            for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        }
        if (is360) {
            browserType = '360';
        } else {
            browserType = 'Chrome';
        }
    } else if (ua.match(/safari/) != null) { browserType = 'Safari'; }
    return  browserType;
}

export const CurentTime = () => {
    var now = new Date();
    var year = now.getFullYear(); // 年
    var month = now.getMonth() + 1; // 月
    var day = now.getDate(); // 日
    var hh = now.getHours(); // 时
    var mm = now.getMinutes(); // 分
    var ss = now.getSeconds(); // 秒
    var clock = ''
    clock = year + '-'
    if (month < 10) { clock += '0' }
    clock += month + '-'
    if (day < 10) { clock += '0' }
    clock += day + ' '
    if (hh < 10) { clock += '0' }
    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm + ':'
    if (ss < 10) clock += '0'
    clock += ss
    return (clock)
}

/*
 * throttle：实现函数的节流（目的是频繁触发中缩减频率）
 实现场景：例如window的resize\scroll事件，我们再调整窗口时该事件会被触发非常多次，此时应用防抖是需要的
 *   @params
 *      func:需要执行的函数
 *      wait:自己设定的间隔时间(频率)
 *   @return
 *      可被调用执行的函数
 */
export function throttle(func, wait = 500) {
    let timer = null,
        previous = 0; //记录上一次操作时间
    return function anonymous(...params) {
        let now = new Date(), //当前操作的时间
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 两次间隔时间超过频率：把方法执行即可
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            // 两次间隔时间没有超过频率，说明还没有达到触发标准呢，设置定时器等待即可（还差多久等多久）
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
 }

/*
 * debounce：实现函数的防抖（目的是规定时间内频繁触发中只执行一次）
实现场景：例如用户的频繁点击按钮，只让他再规定时间内只触发一次
 *  @params
 *     func:需要执行的函数
 *     wait:检测防抖的间隔频率
 *     immediate:是否是立即执行（如果为TRUE是控制第一次触发的时候就执行函数，默认FALSE是以最后一次触发为准）
 *  @return
 *     可被调用执行的函数
 */

export function debounce(func, wait = 300, immediate = false) {
    let timer = null
    return function (...params) {
        let now = immediate && !timer
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null;
            !immediate ? func.call(this, ...params) : null
        }, wait)
        // 若为立即执行，则
        now ? func.call(this, ...params) : null

    }
}