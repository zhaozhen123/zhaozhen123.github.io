import { Component, Vue } from 'vue-property-decorator';
import Clipboard from "clipboard";

@Component({
    components: {},
})
export default class results extends Vue {
    state:any = false
    order_no:any =''
    pay_url:any =''
    timeId:any = ''
    time:any = 7200
    created () {
        if(!this.$common.isWx()) { // 微信环境不截取参数
            let url = decodeURIComponent(this.$common.getQueryString('order_no'))
            this.order_no = url.split(',')[0]
            this.pay_url = url.split(',')[1]
            this.time = 300;
            this.CountDown() // 倒计时五分钟
        } else {
            let data:any = this.$route.query.res
            this.order_no = JSON.parse(data).order_no
            this.CountDown() // 开始倒计时
        }
    }
    CountDown() { // 倒计时两小时
        this.timeId = setInterval(()=> {
            this.time--;
            if(this.time == 0 || this.time < 0) {
                clearInterval(this.timeId) // 清除定时器
                this.$router.push({name: 'EightWords'}); // 过期跳往首页从新下单
            }
        }, 1000)
    }
    button() { // 继续支付 拉起微信支付
        if(!this.$common.isWx()) { //微信外部浏览器调用
            this.state = true
            this.info()
        }
        if(this.$common.isWx()) { // 微信内部调用
            this.onBridgeReady(this.$route.query.res) // 获取以前的参数拉起微信支付
        }
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
        let data = JSON.parse(res)
        let m:any = this
        let win:any = window
        win.WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
              "appId": data.appId,     // 公众号名称，由商户传入     
              "timeStamp": JSON.stringify(data.timeStamp),  // 时间戳，自1970年以来的秒数     
              "nonceStr": data.nonceStr, // 随机串     
              "package": data.package,     
              "signType": data.signType, // 微信签名方式
              "paySign": data.paySign // 微信签名  
           },
           function(get:any) {
           if(get.err_msg == "get_brand_wcpay_request:ok" ) {
                m.$router.push({name: 'results',query:{ order_no: JSON.stringify(data.order_no)}});
           } else {
                m.$router.push({name: 'middle',query:{ 
                    res: JSON.stringify(data),
                }});
           }
        }); 
    }
    info() { //已完成付款点击
        let data = {
            order_no: this.order_no
        }
        this.$post('queryOrder',data).then((res:any)=> { // 查询是否完成付款
            if(res.error_code == 0) { // 成功跳转结果页面
                if(res.data.trade_state == 'SUCCESS') { // 只有成功后才做处理其他状态不做处理
                    this.$router.push({name: 'results',query:{ order_no: JSON.stringify(this.order_no)}});
                } else {
                    if(this.state) {
                        let PAU = process.env.VUE_APP_URL
                        let wurl = window.location.href
                        // if(wurl.indexOf('name') > 0) { // 检查是什么域名
                        //     PAU = process.env.VUE_APP_URL_NAME
                        // }
                        let url = encodeURIComponent(this.order_no + ',' + this.pay_url)
                        window.location.replace(this.pay_url + '&redirect_url='+ encodeURIComponent(PAU + '/middle?order_no=' + url))
                        // location.href =  this.pay_url + '&redirect_url='+ encodeURIComponent(process.env.VUE_APP_URL + '/middle?order_no=' + url)
                    } else {
                        this.$toast('您还没有付款，请先付款')
                    }
                }
            } else {
                this.$toast(res.error_message)
            }
        }).catch((err:any)=> {
            console.log(err)
        })
       if(this.state === false) {
       }
    }
}