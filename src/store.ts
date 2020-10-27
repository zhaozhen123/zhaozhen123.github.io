import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        orderInfo:{}, // vuex 的数据
        State: 1 // 什么什么情况下进入结果页面，1 为 正常付款 2 为订单查询 3 为 短信邮件进入
    },
    mutations: {
        orderInformation(state,pathName) { // 存入信息
            state.orderInfo = pathName
        },
        StateChanges(state,pathName) { // 存入信息
            state.State = pathName
        }
    }
})