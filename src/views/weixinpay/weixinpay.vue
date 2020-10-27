<template>
    <div class="weixinpay">
        <div class="height">
            <div class="weixing"></div>
        </div>
        <div class="content">
            <div class="titleNav">
                <span>商品名称：姓名解析 </span><span class="fr">应付金额 <span style="color:#E42118;">28.00</span> 元</span>
            </div>
            <div class="QrCode">
                <div class="left fl">
                    <div class="title">距离二维码过期还剩下<van-count-down :time="time" @finish="finish" />，请尽快付款</div>
                    <div :class="cover?'Code':'Code cover'" id="qrcode" ref="qrcode"></div>
                    <div class="guide" @click="refresh">
                        <div :class="cover?'pointa':'pointb'"></div>
                        <div class="prompt">
                            <p>{{p1}}</p>
                            <p>{{p2}}</p>
                        </div>
                    </div>
                </div>
                <div class="right fr">
                    <div class="img"></div>
                </div>
            </div>
        </div>
        <div class="amount">
           <a> 客服热线：021-6886 0027</a>
        </div> <br/><br/>
        <div id="companyName" :data-clipboard-text="'3078129182'" @click="copyFn('#companyName')" class="amount"> 客服QQ：3078129182</div>
    </div>
</template>
<script lang="ts" >
import QRCode from 'qrcodejs2'
import { Component, Vue } from 'vue-property-decorator';
import Clipboard from "clipboard";

@Component({
    components: {},
})
export default class weixinpay extends Vue {
    qrcode:any='';
    innerVisible:any=false;
    qr:any='';
    cover:any = true;
    time:any= 7200000;
    timeId:any = ''
    p1:string = '请使用微信扫描'
    p2:string = '二维码完成支付'
    query:any={}
    created () {
        let query:any = this.$route.query.user
        this.query = JSON.parse(query);
        this.payOrder()
        this.CountDown()
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
    payOrder () {
        this.innerVisible = true
        this.qrcode = this.query.pay_url
        this.$nextTick(() => {
        this.crateQrcode()
        })
    }
    CountDown() {
        this.timeId = setInterval(()=>{
            this.info()
            // this.time--
            // if(this.time === 0) {
            //     clearInterval(this.timeId)
            //     this.cover = false
            //     this.p1 = '微信二维码已失效'
            //     this.p2 = '请点击刷新'
            // }
        },5000)
    }
    finish(){ // 倒计时结束
        clearInterval(this.timeId) // 清除定时器
        this.$router.push({name: 'EightWords'}); // 过期跳往首页从新下单
    }
    refresh() { // 刷新按钮
        if(!this.cover) {
            this.time = 10
            this.cover = true
            this.p1 = '请使用微信扫描'
            this.p2 = '二维码完成支付'
            //  this.CountDown()
        }
    }
    // 生成二维码
    crateQrcode () {
        this.qr = new QRCode('qrcode', {
        width: 282,
        height: 275, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        })
    }
    beforeDestroy () {
        clearInterval(this.timeId)
    }
    info() { //轮询结果
        let data = {
            order_no:this.query.order_no
        }
        this.$post('queryOrder',data).then((res:any)=>{
            if(res.error_code == 0) { // 成功跳转结果页面
                if(res.data.trade_state == 'SUCCESS') { // 只有成功后才做处理其他状态不做处理
                  this.$router.push({name: 'results',query:{ order_no: JSON.stringify(this.query.order_no)}});
                }
            } 
        }).catch((err:any)=> {
            console.log(err)
        })
    }
}
</script>
<style lang="scss">
body{
    max-width: 100% !important;
    .weixinpay {
        width: 100%;
        height: 100%;
    }
    .height{
        width:100%;
        height:78px;
        background: url('../../assets/img/backherder.png') -3px -4px no-repeat;
        background-size: 101% 105%;
        display: flex;
        align-items: center;
        justify-content: center;
        .weixing {
            width: 221px;
            height: 50px;
            background: url('../../assets/img/weixingpay.png');
            background-size: 101% 100%;
        }
    }
    .content{
        width:1000px;
        margin:0 auto;
        .titleNav{
            padding:40px 10px 31px 10px;
        }
        .QrCode{
            width: 1000px;
            height: 610px;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            padding:54px 0 51px 0;
            box-sizing: border-box;
            margin-bottom: 40px;
            .left {
                width: 50%;
                height: 100%;
                .title {
                    font-size: 14px;
                    font-family: PingFang, PingFang-SC;
                    font-weight: SC;
                    text-align: center;
                    color: #333333;
                    line-height: 20px;
                    margin:29px 0 29px 0;
                    .van-count-down{
                        display: inline-block;
                    }
                }
                .Code{
                    width: 316px;
                    height: 309px;
                    border: 2px solid #e6e6e6;
                    border-radius: 5px;
                    margin:0 auto;
                    padding:15px;
                    box-sizing: border-box;
                    position: relative;
                }
                .cover{
                    background: hsl(20,40%,90%);
                    filter:blur(10px);
                }
                .guide{
                    width: 316px;
                    height: 74px;
                    background: #ff7674;
                    border-radius: 5px;
                    margin:34px auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // cursor: pointer;
                    .pointa{
                        width:52px;
                        height:52px;
                        background: url('../../assets/img/Pointa.png');
                        background-size: 100% 100%;
                    }
                    .pointb{
                        width:32px;
                        height:32px;
                        background: url('../../assets/img/refresh.png');
                        background-size: 100% 100%;
                    }
                    .prompt {
                        font-size: 16px;
                        font-family: PingFang, PingFang-SC;
                        font-weight: SC;
                        text-align: center;
                        color: #ffffff;
                        line-height: 22px;
                        margin-left: 27px;
                    }
                }
            }
            .right {
                width: 50%;
                .img{
                    width:432px;
                    height:505px;
                    background: url('../../assets/img/weixing.png');
                    background-size: 100% 100%;
                    margin: 0 auto;
                }
            }
        }
    }
    .amount{
        text-align: center;
        height:50px;
    }
}
</style>