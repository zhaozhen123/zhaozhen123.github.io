<template>
  <div class="order">
    <div class="orderInput">
      <van-field
        v-model="orderNumber"
        autosize
        placeholder="请输入订单号查询"
        type="digit"
      />
      <van-button
        type="primary"
        class="van-button"
        color="#e04f4c"
        text="搜索"
       
        @click="orderList"
      ></van-button>
    </div>
    <span>
      <div class="noOrder">没有该订单记录，请再次确认你的订单编号！</div>
      <div class="subtitle">
        <p class="red">忘记或找不到订单号？</p>
        <p class="gray">
          微信支付： 在微信列表的微信支付进入到交易记录，找 到订单号进行查询
        </p>
      </div>
      <div class="guide"></div>
    </span>
    <!-- <span v-if="!show">
      <div class="orderList" v-for="(item, index) in 5" :key="index">
        <ul>
          <li>订单标号:<span>18235</span></li>
          <li>商品名称:<span>姓名解析</span></li>
          <li>订单金额:<span>￥2.0</span></li>
        </ul>
        <van-button type="primary" color="#e04f4c">查看订单结果</van-button>
      </div>
    </span> -->
  </div>
</template>
<script lang="ts" src="./order"></script>
<style lang="scss">
body {
  background: #f7f7f7;
  .order {
    padding: pxToRem2(24);
    .orderInput {
      height: pxToRem2(122);
      width: 100%;
      padding: 0 pxToRem2(24) 0 pxToRem2(24);
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .van-button {
        width: pxToRem2(187);
        height: pxToREm2(80);
        background: #e04f4c;
        border-radius: pxToRem2(5);
        position: absolute;
        top: 50%;
        right: pxToRem2(30);
        transform: translateY(-50%);
      }
    }
    .noOrder {
      height: pxToRem2(233);
      width: 100%;
      margin-top: pxToRem2(24);
      background: #fff;
      text-align: center;
      line-height: pxToRem2(233);
      font-size: pxToRem2(28);
      font-family: PingFang, PingFang-SC;
      font-weight: SC;
      text-align: center;
      color: #333333;
    }
    .subtitle {
      margin-top: pxToRem2(28);
      .red {
        font-size: pxToRem2(28);
        font-family: PingFang, PingFang-SC;
        font-weight: SC;
        text-align: center;
        color: #e04f4c;
        line-height: pxToRem2(61);
      }
      .gray {
        margin: 0 pxToRem2(60) 0 pxToRem2(60);
        font-size: pxToRem2(24);
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #999999;
        line-height: pxToRem2(34);
      }
    }
    .guide {
      height: pxToRem2(564);
      width: 100%;
      background: url("../../assets/img/guide.png");
      background-size: 100% 100%;
      margin-top: pxToRem2(28);
    }
    .orderList {
      height: pxToRem2(350);
      width: 100%;
      background: #fff;
      margin-top: pxToRem2(28);
      padding: pxToRem2(48) 0 pxToRem2(24) pxToRem2(48);
      box-sizing: border-box;
      ul {
        li {
          font-size: pxToRem2(24);
          font-family: PingFang, PingFang-SC;
          font-weight: SC;
          text-align: left;
          color: #999999;
          line-height: pxToRem2(52);
          span {
            color: #333333;
            margin-left: pxToRem2(20);
          }
        }
      }
      .van-button {
        margin-top: pxToRem2(32);
        width: pxToRem2(257);
        height: pxToREm2(80);
        background: #e04f4c;
        border-radius: pxToRem2(5);
      }
    }
    .van-cell {
      background: #f7f7f7;
      width: pxToRem2(427);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

</style>