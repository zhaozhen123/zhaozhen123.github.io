// tslint:disable——忽略该行以下所有代码出现的错误提示，可以在文件首行添加达到忽略整个文件的格式提示

// tslint:enable——当前ts文件重新启用tslint
// tslint:disable-line——忽略当前行代码出现的错误提示
// tslint:disable-next-line——忽略下一行代码出现的错误提示
// @ts-nocheck
// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?e649ba6f0a59394e5225459d0576f0e8";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();
// var s = document.getElementsByTagName("script")[0];
//加载大数据统计js
window._mouth = window._mouth || [];
window._mouth.push(["_setAccount", "bapm_h5"]);
// var eater = document.createElement("script");
// eater.type = "text/javascript";
// eater.async = true;
// eater.src = "//qh.qihaxiaoshuo.com/eater_x.js";
// s.parentNode.insertBefore(eater, s);
!
function() {
    function e(e) {
        return decodeURIComponent((new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null
    }
    function t(e) {
        try {
            return zm.cookie.get(e) || zm.sessionStorage.get(e) || zm.localStorage.get(e)
        } catch(t) {}
    }
    function o(e, t, o) {
        try {
            zm.cookie.set(e, t, {
                domain: document.location.hostname,
                path: "/",
                max_age_ms: o
            }),
            o ? zm.localStorage.set(e, t, o) : zm.sessionStorage.set(e, t)
        } catch(a) {}
    }
    function a() {
        return "xxxxxxxxxxyxxxxx".replace(/[xy]/g,
        function(e) {
            var t = 16 * Math.random() | 0,
            o = "x" == e ? t: 3 & t | 8;
            return o.toString(16)
        })
    }
   var zm = {};
    zm.prop = {
        vdur: 18e5,
        now: +new Date,
        max_age_ms: 31536e6,
        ten_year_ms: 31536e7
    },
    zm.cookie = {},
    zm.cookie.set = function(e, t, o) {
        var a;
        o.max_age_ms && (a = new Date, a.setTime(a.getTime() + o.max_age_ms)),
        document.cookie = e + "=" + t + (o.domain ? "; domain=" + o.domain: "") + (o.path ? "; path=" + o.path: "") + (a ? "; expires=" + a.toGMTString() : "") + (o.secure ? "; secure": "")
    },
    zm.cookie.get = function(e) {
        return (e = RegExp("(^| )" + e + "=([^;]*)(;|$)").exec(document.cookie)) ? e[2] : null
    },
    zm.localStorage = {},
    zm.localStorage.createElem = function() {
        if (!zm.localStorage.elem) try {
            zm.localStorage.elem = document.createElement("input"),
            zm.localStorage.elem.type = "hidden",
            zm.localStorage.elem.style.display = "none",
            zm.localStorage.elem.addBehavior("#default#userData"),
            document.getElementsByTagName("head")[0].appendChild(zm.localStorage.elem)
        } catch(e) {
            return ! 1
        }
        return ! 0
    },
    zm.localStorage.set = function(e, t, o) {
        var a = new Date;
        a.setTime(a.getTime() + o || 31536e6);
        try {
            window.localStorage ? (t =  t, window.localStorage.setItem(e, t)) : zm.localStorage.createElem() && (zm.localStorage.elem.expires = a.toUTCString(), zm.localStorage.elem.load(document.location.hostname), zm.localStorage.elem.setAttribute(e, t), zm.localStorage.elem.save(document.location.hostname))
        } catch(r) {}
    },
    zm.localStorage.get = function(e) {
        var t;
        if (window.localStorage) {
            if (t = window.localStorage.getItem(e)) {
                var o = t.indexOf("|"),
                a = t.substring(0, o) - 0;
                if (a && a > (new Date).getTime()) return t.substring(o + 1)
            }
        } else if (zm.localStorage.createElem()) try {
            return zm.localStorage.elem.load(document.location.hostname),
            zm.localStorage.elem.getAttribute(e)
        } catch(r) {}
        return null
    },
    zm.sessionStorage = {},
    zm.sessionStorage.set = function(e, t) {
        if (window.sessionStorage) try {
            window.sessionStorage.setItem(e, t)
        } catch(o) {}
    },
    zm.sessionStorage.get = function(e) {
        return window.sessionStorage ? window.sessionStorage.getItem(e) : null
    },
    zm.sessionStorage.remove = function(e) {
        window.sessionStorage && window.sessionStorage.removeItem(e)
    },
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    });
    var r = {};
    r.v = "1.0.1",
    r.ja = navigator.javaEnabled ? 1 : 0,
    r.ck = navigator.cookieEnabled ? 1 : 0;
    var n = t("__strace") || 0;
    r.ns = zm.prop.now - n > zm.prop.vdur ? 1 : 0,
    n = t("__utrace") || 0,
    r.nv = 0 === n ? 1 : 0,
    o("__strace", zm.prop.now);
    var m = 1 === r.ns ? zm.prop.now: n;
    o("__utrace", m, zm.prop.max_age_ms),
    r.lt = m;
    var c = t("__user") || "";
    c || (c = a(), o("__user", c, zm.prop.ten_year_ms)),
    r.user = c;
    var i = e("s") || e("qid") || e("src");
    if (i ? (i = i.trim(), o("s", i)) : i = t("s"),r.s=i?i:document.referrer?"other":"direct", document && (r.domain = document.domain || "", r.url = document.URL || "", r.title = document.title || "", r.referrer = document.referrer || ""), window && window.screen && (r.sh = window.screen.height || 0, r.sw = window.screen.width || 0, r.cd = window.screen.colorDepth || 0), navigator && (r.lang = navigator.language || ""), _mouth) for (var l in _mouth) switch (_mouth[l][0]) {
    case "_setAccount":
        r.account = _mouth[l][1]
    }
    var s = "";
    for (var l in r)"" != s && (s += "&"),
    s += l + "=" + encodeURIComponent(r[l]);
    var g = new Image(1, 1);
    g.src = "//qh.qihaxiaoshuo.com/1.gif?" + s
} ();
