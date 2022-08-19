/**
 * @author lishuai
 * @date 2022/7/13
 * 前台js常用函数工具类
 */
(function ($, window) {
    //前台工具类对象
    window.$t = window.$t || {};

    /**
     * s随机头像
     */
    window.$t.getHeadPic = function () {
        var headPics=[
            "http://yfqc-dev.oss-cn-shanghai.aliyuncs.com/1526484289528363742.jpg",
        "http://tva4.sinaimg.cn/crop.0.0.640.640.180/4a02849cjw8fc8vn18vktj20hs0hs75v.jpg",
        "http://cymall.oss-cn-shenzhen.aliyuncs.com/20180227/30843412072045.jpg",
        "http://tva1.sinaimg.cn/crop.0.23.1242.1242.180/8693225ajw8fbimjimpjwj20yi0zs77l.jpg",
        "http://tva2.sinaimg.cn/crop.0.0.640.640.180/648fbe5ejw8ethmg0u9egj20hs0ht0tn.jpg",
       "http://tva1.sinaimg.cn/crop.0.23.1242.1242.180/8693225ajw8fbimjimpjwj20yi0zs77l.jpg",
        "http://tva1.sinaimg.cn/crop.0.0.180.180.180/7fde8b93jw1e8qgp5bmzyj2050050aa8.jpg",
       "http://tva1.sinaimg.cn/crop.0.23.1242.1242.180/8693225ajw8fbimjimpjwj20yi0zs77l.jpg",
        "http://yfqc-dev.oss-cn-shanghai.aliyuncs.com/1526484289528363742.jpg",
        "http://tva1.sinaimg.cn/crop.0.23.1242.1242.180/8693225ajw8fbimjimpjwj20yi0zs77l.jpg"
        ];

       return headPics[Math.floor(Math.random()*10)];

    };
    /**
     * 日期格式化
     * @param fmt   转化格式
     * @param date   时间
     */
    window.$t.dateFormat = function (dateStr, fmt) {
        if (!dateStr) {
            return ""
        }
        var date = new Date(dateStr);
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };


    /**
     * 获取前端缓存
     * @param key   字典或枚举  code|enum
     */
    window.$t.getStorageItem = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };

    /**
     * 设置前端缓存
     * @param key   字典或枚举  code|enum
     * @param data   存储的值（数组）
     */
    window.$t.setStorageItem = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };


    /**
     * 产生一个唯一的uuid
     * @param len 产生的字符串长度
     * @param radix 进制数
     */
    window.$t.getUUID = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };


})(jQuery, window);