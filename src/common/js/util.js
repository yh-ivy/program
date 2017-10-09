/**
 * 解析url参数
 * @example "?id=12345&a=b"
 * @return Object {id: 12345, a: b}
 */
export function urlParse() {
    // 从url获取到参数字符串
    let search = location.search;
    // 空对象
    let obj = {};
    // 正则
    let reg = /[?&][^?&]+=[^?&]+/g;
    let array = search.match(reg);
    if (array) {
        array.forEach((item) => {
            let temArr = item.substr(1).split('=');
            let key = decodeURIComponent(temArr[0]);
            let value = decodeURIComponent(temArr[1]);
            obj[key] = value;
        })
    }
    return obj;
}
