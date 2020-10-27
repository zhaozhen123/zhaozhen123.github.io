import { Component, Vue } from 'vue-property-decorator';
import Clipboard from "clipboard";

@Component({
    components: {},
})
export default class results extends Vue {
    value = ''
    activeName = ['1']
    show: any = true
    email: any = true
    emailValue: any = ''
    emai: any = false
    mingPan: any = []
    analysis: any = {}
    name: string = ''
    gender: string = ''
    birthday: string = ''
    shishen: any = []
    shiShenBreak: any = {}
    daYunString: any = {}
    daYunA: any = []
    mingGe: any = {}
    gaiMing: any = {}
    sources: any = ''
    normal: any = {}
    order_no: any = ''
    IsPhoneAndIsEmail = true
    created() {
        if (this.$state.state.State == 2) {
            this.IsPhoneAndIsEmail = false
            this.manage(this.$state.state.orderInfo)
        } else {
            if (this.$common.getQueryString('sources') == '1' || this.$common.getQueryString('sources') == '2') { // 存在说明是短信或者邮箱点击链接进来的
                this.order_no = this.$common.getQueryString('order_no')
            } else {
                let query: any = this.$route.query.order_no
                this.order_no = JSON.parse(query);
            }
            this.getData()
            this.sources = this.$common.getQueryString('sources')
        }
    }
    lunar(val: any) { //时间选择
        // 转农历
        let myDate: any = val;
        let calendarlunar: any = this.$calendar;
        let lunar = calendarlunar.solar2lunar(
            myDate.split('-')[0],
            myDate.split('-')[1],
            myDate.split('-')[2]
        );
        lunar.lunarDate = lunar.lunarDate.replace(/\-/g, "/");
        return lunar.lunarDate
    }
    solar(val: any) { //时间选择
        // 转阳历
        let myDate: any = val;
        let calendarsolar: any = this.$calendar;
        let solar = calendarsolar.lunar2solar(
            myDate.split('-')[0],
            myDate.split('-')[1],
            myDate.split('-')[2]
        );
        solar.date = solar.date.replace(/\-/g, "/");
        this.birthday = solar.date
    }
    manage(data: any) {
        this.normal.shenQiangRuo = data.data.normal.shenQiangRuo
        this.normal.wuXingQue = data.data.normal.wuXingQue
        this.normal.riYuanXingMing = data.data.normal.riYuanXingMing
        this.normal.baZiGeJu = data.data.normal.baZiGeJu
        let birthday_type = data.data.normal.birthday_type
        this.name = data.data.normal.user
        this.gender = data.data.normal.gender
        if (birthday_type == 1) {
            let birthday = data.data.normal.birthday.replace(/\-/g, "/").split("/")
            this.birthday = this.lunar(data.data.normal.birthday).replace(/\//g, "/").split("/")
            let day: any = this.birthday[2]
            if (day <= 10) {
                if (day == 1) {
                    day = `初${this.$common.NoToChinese(day)}`;
                } else {
                    let num = `${this.$common.NoToChinese(day)}`.replace(/(^一*)/g, "");
                    day = `初${num}`;
                }
            } else {
                if (day >= 10 && day < 20) {
                    day = `${this.$common.NoToChinese(day)}`.replace(/(^一*)/g, "");
                } else {
                    day = `${this.$common.NoToChinese(day)}`;
                }
            }
            this.birthday = this.birthday[0] + '年' + this.$common.NoToChinese(this.birthday[1]) + '月' + day + ' ' + (birthday[3] + this.$common.Chinese(birthday[3])).replace(/(^0*)/g, "")
        } else {
            this.birthday = data.data.normal.birthday.replace(/\-/g, "/").split("/")
            this.birthday = this.birthday[0] + '年' + this.birthday[1] + '月' + this.birthday[2] + '日' + this.birthday[3] + '时'
        }
        let mingPan = data.data.normal.mingPan
        for (let key in mingPan) {
            switch (key) {
                case 'shiShen':
                    mingPan[key].title = '十神'
                    break;
                case 'tianGan':
                    mingPan[key].title = '天干'
                    break;
                case 'diZhi':
                    mingPan[key].title = '地支'
                    break;
                case 'cangGan':
                    mingPan[key].title = '藏干'
                    break;
                case 'cangGanShiShen':
                    mingPan[key].title = '十神'
                    break;
            }
        }
        this.mingPan = mingPan
        console.log(this.mingPan)
        // 八字分析
        this.analysis.shenQiangRuoExplain = data.data.normal.shenQiangRuoExplain
        this.analysis.wuXingQueExplain = data.data.normal.wuXingQueExplain
        this.analysis.baZiGeJuExplain = data.data.normal.baZiGeJuExplain
        this.analysis.riYuanXingMingExplain = data.data.normal.riYuanXingMingExplain
        this.shishen = data.data.normal.shiShen
        for (var key in this.shishen) {
            if (key == 'bi') {
                this.shishen[key].title = '比宫（同我）'
            } else if (key == 'cai') {
                this.shishen[key].title = '财宫（我克）'
            } else if (key == 'guan') {
                this.shishen[key].title = '官宫（克我）'
            } else if (key == 'shi') {
                this.shishen[key].title = '食宫（我生）'
            } else if (key == 'yin') {
                this.shishen[key].title = '印宫（生我）'
            }
        }
        // 十神分析
        this.shiShenBreak.yin = data.data.customer.shiShen.yin.explain
        this.shiShenBreak.bi = data.data.customer.shiShen.bi.explain
        this.shiShenBreak.cai = data.data.customer.shiShen.cai.explain
        this.shiShenBreak.guan = data.data.customer.shiShen.guan.explain
        this.shiShenBreak.shi = data.data.customer.shiShen.shi.explain
        // 运势
        this.daYunString.daYunString = JSON.parse(data.data.normal.daYunString)
        this.daYunA = data.data.customer.daYun
        this.daYunString.taohua = data.data.customer.taoHuaExplain
        this.daYunString.shiYeExpain = data.data.customer.shiYeExpain
        this.daYunString.jianKangExplain = data.data.customer.jianKangExplain
        //命格
        this.mingGe = data.data.customer.mingGe
        this.mingGe.score = data.data.normal.score
        // 改命
        this.gaiMing = data.data.customer.gaiMing
    }
    getData() {
        let order_no = this.order_no
        let params = {
            order_no: order_no
        }
        let data: any = {}
        this.$fetch('getInfo', params).then((res: any) => {
            if (res.error_code == 0) {
                data = res
                this.manage(data)
            } else {
                this.$toast(res.error_message)
            }
        }).catch((err: any) => {
            console.log(err)
        })
    }
    input(e: any) { // 手机号校验
        if (e.target.value == '') {
            return false;
        }
        let value = e.target.value.replace(/\s*/g, "");
        if (!(/^1[3456789]\d{9}$/.test(value))) {
            this.$toast("手机号码有误，请重填")
            return false;
        }
    }
    inputEmail(e: any) { // 邮箱校验
        if (e.target.value == '') {
            this.emai = false
            return false;
        }
        let value = e.target.value.replace(/\s*/g, "");
        let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
        if (!myReg.test(value)) {
            this.emai = false
            this.$toast("邮箱有误，请重填")
            return false;
        } else {
            this.emai = true
        }
    }
    save() { //发送手机号
        if (this.value !== '') {
            let params = {
                order_no: this.order_no,
                phone: this.value
            }
            this.$post('sendSMS', params).then((res: any) => {
                if (res.error_code == 0) {
                    this.$toast(res.error_message)
                    this.show = false
                } else {
                    this.$toast(res.error_message)
                    this.show = false
                }
            })
        }
    }
    emailSave() { // 发送邮件
        if (this.emai) {
            if (this.emailValue !== '') {
                let params = {
                    order_no: this.order_no,
                    email: this.emailValue
                }
                this.$post('sendEmail', params).then((res: any) => {
                    if (res.error_code == 0) {
                        this.$toast(res.error_message)
                        this.email = false
                    } else {
                        this.$toast(res.error_message)
                        this.email = false
                    }
                })
            }
        }
    }
    copyFn(id: any) { // 复制功能
        let clipboard = new Clipboard(id);
        let m: any = this
        this.$nextTick(() => {
            clipboard.on("success", function (e: any) {
                m.$toast('复制成功')
                clipboard.destroy();
            });
            clipboard.on("error", function (e: any) {
                m.$toast('当前浏览器不支持复制')
                clipboard.destroy();
            });
        });
    }
    emailClick() {
        this.email = true
        this.show = false
    }
    results() {
        this.show = false
    }
}