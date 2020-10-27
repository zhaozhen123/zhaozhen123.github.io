import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class order extends Vue {
    orderNumber:any = '请输入订单号查询'
    orderList() {
        if(this.orderNumber == '') {
            this.$toast('订单号为空请从新输入')
        } else {
            let data:object = {
                order_no:this.orderNumber || '20201022535699551603337717'
            }
            this.$post('getUserInfo', data).then((res: any) => { //查询数据
                if(res.data && res.error_code == 0) {
                    this.$state.commit('orderInformation',res) // 存入信息到veux 做信息保存
                    this.$state.commit('StateChanges', 2) // 修改状态为订单查询进入
                    this.$router.push({path:'/results'}) // 跳转路由
                } else {
                    this.$toast('没有该订单信息，请再次确认您的商户单号')
                }
            }).catch((err: any) => {
                console.log(err)
            })
        }
    }
}