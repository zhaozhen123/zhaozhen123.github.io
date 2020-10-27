<template>
    <div class="middle">
        <div class="content">
            <p class="title">温馨提示</p>
            <p> 1. 如果未完成付款，请点击“继续支付”； </p>
            <p> 2. 如果已完成支付，<span>请点击“已完成支付”才能查看您的测试结果！</span></p>
        </div>
        <div class="bnt">
               <van-button type="danger" class="button" @click="button">继续支付</van-button>
               <van-button plain hairline type="info" class="info" @click="info">已完成支付</van-button>
        </div>
        <p><a href="tel:021-6886 0027" class="amount">客服热线：021-6886 0027</a> </p> 
        <p> <div id="companyName" :data-clipboard-text="'3078129182'" @click="copyFn('#companyName')" class="amount"> 客服QQ：3078129182</div></p>
    </div>
</template>
<script lang="ts" src="./middle"></script>
<style lang="scss">
@import "./middle.scss";
</style>