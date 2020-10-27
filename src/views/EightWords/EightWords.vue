<template>
  <div class="EightWords">
    <div class="orderinfo" @click="$router.push({path:'/order'})">订单查询</div>
    <div class="href"></div>
    <div class="background">
      <!-- 模块一 -->
      <div :class="NameOrGossip?'herderBack nameHerderBack':'herderBack'">
        <div class="countdown">
          <van-row>
            <van-col span="12" class="right">
              优惠价：&yen;
              <span class="yen">28</span>
              <span class="ends">原价:&yen;98</span>
            </van-col>
            <van-col span="12" class="right">
              优惠结束:
              <van-count-down
                :time="time"
                @finish="finish"
                format="HH : mm : ss"
                ref="countDown"
              />
            </van-col>
          </van-row>
          <span class="line"></span>
        </div>
      </div>
      <div class="herder">
        <div class="input">
          <van-row>
            <van-col span="4" offset="2">
              <!-- 背景图片 -->
              <div class="title"></div>
            </van-col>
            <van-col span="12" offset="1" class="inputLeft">
              <!-- <van-form> -->
              <van-field
                type="text"
                placeholder="请输入姓名（必须汉字）"
                v-model="username"
                @blur="validator($event)"
              />
              <van-radio-group
                v-model="radio"
                direction="horizontal"
                class="radio"
              >
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
              <div class="time" @click="showPopup">
                <van-field
                  v-if="!$common.isPc()"
                  placeholder="请选择出生年月"
                  v-model="usertime"
                  disabled
                />
                <van-field
                  v-if="$common.isPc()"
                  placeholder="请选择出生年月"
                  @click="showPopup"
                  @click-input="showPopup"
                  v-model="usertime"
                  readonly
                />
                <span></span>
              </div>
              <!-- </van-form> -->
            </van-col>
          </van-row>
        </div>
        <div class="start" @click="start"></div>
        <div class="agreement">
          <!-- <van-checkbox v-model="checked" shape="square" class="up" icon-size="13px">
                    <div class="upimg"></div>
          </van-checkbox> -->
          <p>
            已有
            <span>7189569</span>人进行测算
          </p>
          <p>99.6%以上的测算用户对分析结果非常满意。</p>
        </div>
      </div>
      <!-- 模块一 -->
      <div :class="NameOrGossip?'nameModule1':'module1'"></div>
      <div :class="NameOrGossip?'nameModule2':'module2'">
      </div>
      <div :class="NameOrGossip?'nameModule3':'module3'">
      </div>
      <!-- 模块四 -->
      <div class="moduleInput">
        <div class="title">揭秘2021年事业，财运，感情</div>
        <van-row type="flex" justify="center">
          <van-col span="22" class="picture">
            <div class="name">
              <div class="left fl">您的姓名</div>
              <van-cell-group class="right fr">
                <van-field
                  v-model="username"
                  placeholder="请输入姓名（必须汉字）"
                  @blur="validator($event)"
                />
              </van-cell-group>
            </div>
            <div class="name choose">
              <div class="left fl">您的性别</div>
              <van-radio-group
                v-model="radio"
                direction="horizontal"
                class="right radio"
              >
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
            </div>
            <div class="name time" @click="showPopup">
              <div class="left fl">出生年月</div>
              <van-cell-group class="right fr">
                <!-- v-if="!$common.isPc()" placeholder="mm/dd/yyyy" v-model="usertime" disabled/>
                <van-field  v-if="$common.isPc()"-->
                <van-field
                  v-if="!$common.isPc()"
                  v-model="usertime"
                  placeholder="请选择出生年月"
                  disabled
                />
                <van-field
                  v-if="$common.isPc()"
                  v-model="usertime"
                  placeholder="请选择出生年月"
                  @click-input="showPopup"
                   readonly
                />
                <span></span>
              </van-cell-group>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="buttom" @click="start"></div>
      <div class="amount">已有 7189569 人测算</div>
      <a href="tel:021-6886 0027" class="amount" v-if="!$common.isPc()"
        >客服热线：021-6886 0027</a
      >
      <a class="amount" v-if="$common.isPc()">客服热线：021-6886 0027</a>
      <div id="companyName" :data-clipboard-text="'3078129182'" @click="copyFn('#companyName')" class="amount"> 客服QQ：3078129182</div>
      <br/><br/>
      <a class="amount">上海广乐网络科技有限公司 <br/> 沪ICP备14038021号</a>
      <!-- <div class="agreementfoor">
                <van-checkbox v-model="checked" shape="square" class="up" icon-size="13px">
                    <div class="upimg"></div>
                </van-checkbox>
      </div>-->
    </div>
    <div class="footer"></div>
    <!-- <div class="footerPopup" v-if="show">
    </div> -->
    <van-popup
      v-if="show"
      v-model="show"
      position="bottom"
      :class="{ popupWidth: $common.isPc() }"
    >
      <div class="backPopup" >
        <van-row class="button">
          <van-col
            span="12"
            @click="solar"
            :class="active == 0 ? 'solar' : 'lunar actve'"
            >公历</van-col
          >
          <van-col
            span="12"
            @click="lunar"
            :class="active == 1 ? 'solar  actve' : 'lunar'"
            >农历</van-col
          >
        </van-row>
      </div>
      <van-datetime-picker
        v-model="currentDate"
        type="datehour"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        :filter="filter"
        :show-toolbar="false"
        :visible-item-count="5"
      />
      <van-row class="submit">
        <van-col span="12" class="determine" @click="determine">取消</van-col>
        <van-col span="12" class="cancel" @click="cancel">确定</van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script lang="js">
import { calendar } from '../../static/utils/calendar.js';
</script>
>
<script lang="ts" src="./EightWords.ts"></script>
<style lang="scss">
@import "./EightWords.scss";
</style>
