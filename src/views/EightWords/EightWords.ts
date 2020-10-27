import { Component, Vue, Watch } from 'vue-property-decorator';
import Clipboard from "clipboard";

@Component({
    components: {},
})
export default class EightWords extends Vue {
    time = 30 * 60 * 1000;
    radio = ''
    radios = ''
    active = 0
    value = ''
    valueTime = ''
    username = ""
    usertime = ""
    minDate = new Date(1900, 0, 1);
    maxDate = new Date(2021, 11, 31);
    currentDate = new Date();
    stone = false;
    a = 0;
    show = false;
    top: any = '0';
    NameOrGossip:any= false;
    PAU:any = '';
    created() {
        let m:any = this
        this.PAU = process.env.VUE_APP_URL
        let url = window.location.href
        if(url.indexOf('name') < 0) { // 检查是什么域名
            m.NameOrGossip = true
            // this.PAU = process.env.VUE_APP_URL_NAME
        }
        if(this.$common.isWx() && this.$common.getQueryString('code')) { //微信环境内并且需要拼接code用于回调后台接口
            let data = JSON.parse(this.$common.getQueryString('state'))
            data.code = this.$common.getQueryString('code')
            this.addOrder(data)
        }
        localStorage.setItem("getParam", this.$common.getParam("qid")); // 存储qid 放在后面获取
        let time_GetTime:any = new Date().getTime()

    }
    copyFn(id:any) { // 复制功能
        let clipboard = new Clipboard(id);
        let m:any = this
        this.$nextTick(() => {
          clipboard.on("success", function(e:any) {
            m.$toast('复制成功')
            clipboard.destroy();
          });
          clipboard.on("error", function(e:any) {
            m.$toast('当前浏览器不支持复制')
            clipboard.destroy();
          });
        });
      }
    onBridgeReady(res:any) { // 微信内跳转支付
        let m:any = this
        let win:any = window
        win.WeixinJSBridge.invoke( // 微信内部方法，在微信环境外是无法使用的
           'getBrandWCPayRequest', {
              "appId": res.appId,     // 公众号名称，由商户传入     
              "timeStamp": JSON.stringify(res.timeStamp),  // 时间戳，自1970年以来的秒数     
              "nonceStr": res.nonceStr, //随机串     
              "package": res.package,     
              "signType": res.signType, // 微信签名方式
              "paySign": res.paySign // 微信签名  
           },
           function(get:any) {
           if(get.err_msg == "get_brand_wcpay_request:ok" ) {
                m.$router.push({name: 'results',query:{ order_no: JSON.stringify(res.order_no)}});
           } else {
                m.$router.push({name: 'middle',query:{ 
                    res: JSON.stringify(res),
                }});
           }
        }); 
    }
    reset() {
        let countDown: any = this.$refs.countDown
        countDown.reset();
    }
    finish() { // 倒计时结束从新开始倒计时
        this.reset()
    }
    validator(val: any) { // 中文校验
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
        let reg = /^[u4E00-u9FA5]+$/
        var regNumber = /\d+/; 
        var regString = /[a-zA-Z]+/; 
        let content = (val.target.value).replace(/\s*/g, "");
        if (reg.test(content) || (val.target.value).replace(/\s*/g, "").length == 0 || pattern.test(content) ||regNumber.test(content) || regString.test(content)) {
            this.$toast('姓名必须为汉字哦~')
            this.username = ''
        }
        return reg.test(val)
    }
    showPopup() {
        this.show = true;
    }
    determine() { // 时间选择取消按钮
        this.show = false
    }
    cancel() { // 时间选择确定按钮
        this.show = false
        let myDate: any = this.currentDate;
        if (this.active == 1) {
            console.log(myDate.getDate())
            let day: any = myDate.getDate();
            if (day <= 10) {
                if (day == 1) {
                    day = `初${this.$common.NoToChinese(day)}`;
                } else {
                    let num = `${this.$common.NoToChinese(day)}`.replace(/(^一*)/g, "");
                    day = `初${num}`;
                }
            } else if (day >= 10 && day < 20) {
                day = `${this.$common.NoToChinese(day)}`.replace(/(^一*)/g, "");
            } else {
                day = `${this.$common.NoToChinese(day)}`;
            }
            this.usertime = myDate.getFullYear() + '年' + this.$common.NoToChinese((myDate.getMonth() + 1)) + '月' + day
        } else {
            let data = this.$common.standardizedDate(myDate)
            this.usertime = data.year + '年' + data.month + '月' + data.day + '日'
        }
    }
    lunar() { //时间选择
        // 转农历
        this.active = 1
        if (this.a === 0) {
            this.a++;
            let myDate: any = this.currentDate;
            let calendarlunar: any = this.$calendar;
            let lunar = calendarlunar.solar2lunar(
                myDate.getFullYear(),
                myDate.getMonth() + 1,
                myDate.getDate()
            );
            lunar.lunarDate = lunar.lunarDate.replace(/\-/g, "/");
            this.currentDate = new Date(lunar.lunarDate + ' ' + myDate.getHours() + ':00:00');
            this.stone = true;
        }
    }
    solar() { //时间选择
        // 转阳历
        this.active = 0
        if (this.stone) {
            this.a = 0;
            this.stone = false;
            let myDate: any = this.currentDate;
            let calendarsolar: any = this.$calendar;
            let solar = calendarsolar.lunar2solar(
                myDate.getFullYear(),
                myDate.getMonth() + 1,
                myDate.getDate()
            );
            solar.date = solar.date.replace(/\-/g, "/");
            this.currentDate = new Date(solar.date + ' ' + myDate.getHours() + ':00:00');
        }
    }
    start() { // 立即合成
        let data_tiem:any= new Date().getTime()
        if (this.username === '') {
            this.$toast('请正确填写您的姓名')
        } else if (this.radio === '') {
            this.$toast('请选择您的性别')
        } else if (this.usertime === '') {
            this.$toast('请正确填写您的出生年月')
        } else { // 校验通过调用接口处理
            this.$state.commit('StateChanges', 1) // 付款成功跳转结果页面 修改状态管理里面的状态
            if (this.active == 1) {
                this.solar()
                this.active = 1
            }
            let sources: string = '2'
            if (this.$common.isPc()) { // 判断是否是PC
                sources = '1'
            } else if(this.$common.isWx()) {
                sources = '3'
            }
            let Date: any = this.$common.standardizedDate(this.currentDate)
            let data:any = {
                name: this.username,
                gender: this.radio,
                birthday: Date.year + '-' + Date.month + '-' + Date.day + ' ' + Date.hour + ':00:00',
                birthday_type: this.active,
                sources: sources,
                qid: this.$common.getQueryString('qid') || ''
            }
            if(this.$common.isWx()) {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe5297ed5bd5761cc&redirect_uri='+encodeURI(this.PAU)+'&response_type=code&scope=snsapi_base&state='+ JSON.stringify(data) +'#wechat_redirect'
            } else {
                this.addOrder(data)
            }
            let win:any = window
            win._ks_trace.push({event: 'form', convertId: 131829, cb: function(){
                console.log('Your callback function here!')
            }})
        }
    }
    addOrder(data:any) { // 统一下单接口
        this.$post('addOrder', data).then((res: any) => {
            if (res.error_code == 0) {
                if (this.$common.isPc()) { // PC跳转扫描二维码
                    this.$router.push({ name: 'weixinpay', query: { user: JSON.stringify({ pay_url: res.data.pay_url, order_no: res.data.order_no }) } });
                } else if(this.$common.isWx()) {
                    this.onBridgeReady(res.data)
                } else {
                    let url = encodeURIComponent(res.data.order_no + ',' + res.data.pay_url)
                    // location.href = res.data.pay_url + '&redirect_url=' + encodeURI(this.PAU + '/middle?order_no=' + url)
                    window.location.replace(res.data.pay_url + '&redirect_url=' + encodeURI(this.PAU + '/middle?order_no=' + url))
                }
            } else {
                this.$toast(res.error_message)
            }
        }).catch((err: any) => {
            console.log(err)
        })
    }
    formatter(type: any, val: any) {
        //时间格式化
        if (type === "year") {
            return `${val}年`;
        } else if (type === "month") {
            if (this.stone) {
                if (val >= 10 && val < 20) {
                    return `${this.$common.NoToChinese(val)}月`.replace(/(^一*)/g, "");
                } else {
                    return `${this.$common.NoToChinese(val)}月`;
                }
            } else {
                return `${val}月`;
            }
        } else if (type === "day") {
            if (this.stone) {
                if (val <= 10) {
                    if (val == 1) {
                        return `初${this.$common.NoToChinese(val)}`;
                    } else {
                        let num = `${this.$common.NoToChinese(val)}`.replace(/(^一*)/g, "");
                        return `初${num}`;
                    }
                }
                if (val >= 10 && val < 20) {
                    return `${this.$common.NoToChinese(val)}`.replace(/(^一*)/g, "");
                } else {
                    return `${this.$common.NoToChinese(val)}`;
                }

            } else {
                return `${val}日`;
            }
        }
        if (!this.stone) {
            return `${val} 时`;
        } else {
            if (val == '00') {
                return ('0子时')
            } else {
                return (val + this.$common.Chinese(val)).replace(/(^0*)/g, "");
            }
        }
    }
    filter(type: any, val: any) {
        return val;
    }
    @Watch('show')
    opened(val:any) {
        // var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset
        let company:any = document.getElementsByTagName("body")[0]
        if(val) {
            company.style.overflow = 'hidden';
        } else {
            company.style.overflow = 'auto';
        }
    }
}