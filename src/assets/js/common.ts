var timeInter: any;
import axios from 'axios';
import { Base64 } from 'js-base64';
const isIos = ()=> {
  var u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};
export default {
    isWx() {
        var ua = navigator.userAgent.toLowerCase()
        var isWeixin = ua.indexOf("micromessenger") != -1
        if (isWeixin) {
            return true
        } else {
            return false
        }
    },
    isAndroid() {
        var u = navigator.userAgent
        return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1
    },
    isIos,
    isPc() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) || window.screen.availWidth < 600) {
            return false
        } else {
            return true
        }
    },
    timeDifference(date2: any, date1: any) { // 两个时间计算差值
        let date3 = date1 - date2
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    },
    downCount(timeMap: any, fn: Function) {
        //倒计时  0 天 1 时 2 分 3秒
        if (timeMap[0].time > 0) return false
        timeInter = setInterval(() => {
            if (
                timeMap[3].time <= 0 &&
                timeMap[2].time <= 0 &&
                timeMap[1].time <= 0
            ) {
                //时间为0
                clearInterval(timeInter)
                returnZero()
                if (fn) fn()
                return false
            }
            timeMap[3].time-- //秒--
            if (timeMap[3].time < 0) {
                if (timeMap[2].time <= 0 && timeMap[1].time <= 0) {
                    clearInterval(timeInter)
                    returnZero()
                    return false
                }
                timeMap[3].time = 59
                if (timeMap[2].time <= 0) {
                    timeMap[2].time = 59
                    if (timeMap[1].time <= 0) {
                        timeMap[1].time = 24
                    } else timeMap[1].time--
                } else timeMap[2].time--
            }
        }, 1000)

        function returnZero() {
            for (var k = 0; k < timeMap.length; k++) {
                timeMap[k].time = 0
            }
        }
    },
    toArr(item: string) {
        //分隔成数组
        if (item == "" || !item) return []
        return item.split(" ")
    },
    inArray(search: any, array: any) {
        for (var i in array) {
            if (array[i] == search) {
                return true
            }
        }
        return false
    },
    remove(arr: any, val: any) {
        //移出数组的指定项
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1)
                break
            }
        }
    },
    clearIntervalFn() {
        clearInterval(timeInter)
    },

    /*父级点击后,遍历DOM冒泡数组,匹配有无data-index(或者data-otherData),匹配上的话,返回自定义属性*/
    findChildByTagData(item: any, otherData: any) {
        return item.dataset ? (!otherData ? item.dataset.index : item.dataset[otherData]) :
            (!otherData ? item.getAttribute('data-index') : item.getAttribute(`data-${otherData}`))
    },

    /*获取Url hash参数*/
    getQueryString(name: string) {
        if (window.URLSearchParams) {
            const
                url: any = window.location.href,
                locationSearch: any = ~url.indexOf('?') && `?${url.split('?')[1]}`,
                params = new URLSearchParams(locationSearch);
            return params.get(name)
        }
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        let result
        let searchItem = window.location.hash.split("?")[1]
        if (searchItem !== undefined) {
            result = searchItem.match(reg)
        } else {
            searchItem = window.location.href
            result = searchItem
                .substring(searchItem.indexOf("?"), searchItem.length)
                .substr(1)
                .match(reg)
        }
        return result ? decodeURIComponent(result[2]) : null
    },
    getParam: function (paramName:any) {
        var paramValue:any = "",
          isFound = !1;
        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
          var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0;
          while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue;
    },
    getCookie: function (sName:any) {
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
        }
        return null;
    },
    getOsTypeS: function(){
        var agent = navigator.userAgent.toLowerCase();
        var os_type = agent, version, index;
        if (agent.indexOf("windows nt 10.0") != -1) os_type = "Windows 10";
        if (agent.indexOf("windows nt 6.2") != -1) os_type = "Windows 8";
        if (agent.indexOf("windows nt 6.1") != -1) os_type = "Windows 7";
        if (agent.indexOf("windows nt 6.0") != -1) os_type = "Windows Vista";
        if (agent.indexOf("windows nt 5.1") != -1) os_type = "Windows XP";
        if (agent.indexOf("windows nt 5.0") != -1) os_type = "Windows 2000";
        if (agent.indexOf("mac") != -1) os_type = "Mac/iOS";
        if (agent.indexOf("x11") != -1) os_type = "UNIX";
        if (agent.indexOf("linux") != -1) os_type = "Linux";
        if (agent.indexOf("android") != -1) os_type = "android";
        return os_type;
    },
    getBrowser: function() {
        var agent = navigator.userAgent.toLowerCase();
        var browser_type = agent;
        if(agent.indexOf("baidu") >0 ) {
            browser_type = "baidu";
        }
        if (agent.indexOf("msie") > 0) {
            browser_type = "IE";
        }
        if (agent.indexOf("firefox") > 0) {
            browser_type = "firefox";
        }
        if (agent.indexOf("chrome") > 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("360 aphone browser") < 0) {
            browser_type = "chrome";
        }
        if (agent.indexOf("360 aphone browser") > 0 || agent.indexOf("qhbrowser") > 0) {
            browser_type = "360";
        }
        if (agent.indexOf("ucbrowser") > 0) {
            browser_type = "UC";
        }
        if (agent.indexOf("micromessenger") > 0) {
            browser_type = "WeChat";
        }
        if ((agent.indexOf("mqqbrowser") > 0 || agent.indexOf("qq") > 0) && agent.indexOf("micromessenger") < 0) {
            browser_type = "QQ";
        }
        if (agent.indexOf("miuibrowser") > 0) {
            browser_type = "MIUI";
        }
        if (agent.indexOf("mb2345browser") > 0) {
            browser_type = "2345";
        }
        if (agent.indexOf("sogoumobilebrowser") > 0) {
            browser_type = "sogou";
        }
        if (agent.indexOf("liebaofast") > 0) {
            browser_type = "liebao";
        }
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0 && agent.indexOf("ucbrowser") < 0 && agent.indexOf("micromessenger") < 0 && agent.indexOf("mqqbrowser") < 0 && agent.indexOf("miuibrowser") < 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("sogoumobilebrowser") < 0 && agent.indexOf("liebaofast") < 0 && agent.indexOf("qhbrowser") < 0) {
            browser_type = "safari";
        }
        return browser_type;
    },
    // h5_report: function (act:any, value:any) {
    //     let arr:any = [];
    //     let str;
    //     let type = 'mt';
    //     arr.push(this.getParam("qid") || localStorage.getItem("getParam"));
    //     arr.push(this.getCookie("__user") || sessionStorage.__user || localStorage.__user);
    //     arr.push(this.getOsTypeS());
    //     arr.push(this.getBrowser());
    //     if(this.isPc()){
    //         type = 'pc'
    //     } else {
    //         type = 'mt'
    //     }
    //     arr.push(window.location.href, type);
    //     arr.push(act);
    //     str = arr.join('\t');
    //     axios({
    //         method: "get",
    //         url: 'http://report.bzpm.hwsj.xyz/bzpm/user_action?code=' + Base64.encode(str),
    //         data: {}, 
    //         headers: {
    //             "Content-Type": 'application/json;charset=UTF-8'
    //         }
    //     })
    // },
    ks_activate(res:any) { // 快手广告转化数据API对接文档
        console.log(res)
        axios({
            method: "get",
            url: 'https://e.kuaishou.com/rest/log/activate',
            params: {
                callback:res.callback,
                event_type:res.event_type,
                event_time:res.event_time,
                purchase_amount:res.purchase_amount
            }, 
            headers: {
                "Content-Type": 'application/json;charset=UTF-8'
            }
        })
    },
    NoToChinese(num: any) {
        // 阿拉伯转话中文
        // 转中文函数
        if (!/^\d*(\.\d*)?$/.test(num)) {
            // alert("Number is wrong!");
            return "Number is wrong!";
        }
        var AA: any = new Array(
            "零",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九"
        );
        var BB: any = new Array("", "十", "百", "千", "万", "亿", "点", "");
        let a: any = ("" + num).replace(/(^0*)/g, "").split(".");
        // console.log(a)
        let k: number = 0;
        let re: string = "";
        for (var i = a[0].length - 1; i >= 0; i--) {
            switch (k) {
                case 0:
                    re = BB[7] + re;
                    break;
                case 4:
                    if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                        re = BB[4] + re;
                    break;
                case 8:
                    re = BB[5] + re;
                    BB[7] = BB[5];
                    k = 0;
                    break;
            }
            if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                re = AA[0] + re;
            // console.log(re)
            if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            k++;
        }
        if (a.length > 1) {
            //加上小数部分(如果有小数部分)
            re += BB[6];
            for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
        }
        return re;
    },
    Chinese(val: any) {
        val = val + "";
        let hour = "";
        if (val == "00" || val == "23") {
            hour = "子时";
        } else if (val == "01" || val == "02") {
            hour = "丑时";
        } else if (val == "03" || val == "04") {
            hour = "寅时";
        } else if (val == "05" || val == "06") {
            hour = "卯时";
        } else if (val == "07" || val == "08") {
            hour = "辰时";
        } else if (val == "09" || val == "10") {
            hour = "巳时";
        } else if (val == "11" || val == "12") {
            hour = "午时";
        } else if (val == "13" || val == "14") {
            hour = "未时";
        } else if (val == "15" || val == "16") {
            hour = "申时";
        } else if (val == "17" || val == "18") {
            hour = "酉时";
        } else if (val == "19" || val == "20") {
            hour = "戌时";
        } else if (val == "21" || val == "22") {
            hour = "亥时";
        }
        return hour;
    },
    standardizedDate(date:any) { // 处理newDdate数据格式
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        if(month < 10){
            month = '0' + month
        }
        if(day < 10){
            day = '0' + day
        }
        if(hour < 10){
            hour = '0' + hour
        }
        return {
          year,
          month,
          day,
          hour,
          minute
        };
      },
      random() {
        /*生成32位随机字符串*/
        /*默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*/
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < 32; i++) {
             pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd
    }
      
}
