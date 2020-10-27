<template>
    <div class="results">
        <div class="content">
            <div class="orderNumber">
                <!-- 订单号：18235 -->
            </div>
            <div class="mall" v-if="email && this.sources !== '2' && this.sources !== '1' && IsPhoneAndIsEmail">
                <van-field v-model="emailValue" :class="{'inputPopup':$common.isPc()}" class="input" @blur="inputEmail($event)" placeholder="请输入邮箱号" />
                <van-button type="danger" class="button" @click="emailSave">将结果发送至邮箱(免费)</van-button>
            </div>
            <div class="name">
            <van-row type="flex" justify="center">
                <van-col span="22" class="picture">
                    <div class="title">
                        <van-col span="6">
                            <div class="left">您的姓名</div>
                        </van-col>
                        <van-col span="18">
                            <div class="input fl">{{name}}</div>
                        </van-col>
                    </div>
                     <div class="title">
                        <van-col span="6">
                            <div class="left">您的性别</div>
                        </van-col>
                        <van-col span="18">
                            <div class="input fl">{{gender}}</div>
                        </van-col>
                    </div>
                    <div class="title">
                            <van-col span="6">
                            <div class="left">出生年月</div>
                        </van-col>
                        <van-col span="18">
                            <div class="input fl">{{birthday}}</div>
                        </van-col>
                    </div>
                </van-col>
            </van-row>
            </div>
            <div class="table">
                <div class="chart">
                    命盘
                </div>
                <van-row type="flex" justify="center">
                    <van-col span="5">
                         <div class="title">
                            坤造
                        </div>
                    </van-col>
                    <van-col span="5">
                         <div class="title tit">
                            <div class="red">
                                年
                            </div>
                        </div>
                    </van-col>   <van-col span="5">
                          <div class="title tit">
                            <div class="red">
                                月
                            </div>
                        </div>
                    </van-col>   <van-col span="5">
                         <div class="title tit">
                            <div class="red">
                                日
                            </div>
                        </div>
                    </van-col>   <van-col span="5">
                         <div class="title tit">
                            <div class="red">
                                时
                            </div>
                        </div>
                    </van-col>
                </van-row>
                 <van-row type="flex" justify="center" v-for="(item,index) in mingPan" :key="index">
                    <van-col span="5">
                         <div class="title">
                               {{item.title.replace(/\-/g,"")}}
                        </div>
                    </van-col>
                    <van-col span="5">
                         <div class="title">
                                {{item.nian.replace(/\-/g,"")}}
                        </div>
                    </van-col>   <van-col span="5">
                          <div class="title">
                                 {{item.yue.replace(/\-/g,"")}}
                        </div>
                    </van-col>   <van-col span="5">
                         <div class="title">
                                 {{item.ri.replace(/\-/g,"")}}
                        </div>
                    </van-col>   <van-col span="5">
                         <div class="title">
                                 {{item.shi.replace(/\-/g,"")}}
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div class="collapse">
                <van-collapse v-model="activeName">
                    <van-collapse-item title="八字分析" name="1"> 
                        <div>
                         <div class="title">
                             命格强弱
                          </div>
                          <div>您的命格强弱判断为 <span style="color:#f14044;">"{{normal.shenQiangRuo}}"</span></div>
                          <div v-html="analysis.shenQiangRuoExplain" style="text-indent: 1em;"></div>
                         <div class="title">
                              五行平衡分析
                          </div>
                           <div>您先天命盘中五行（土，金，水，木，火）<span style="color:#f14044;">"{{normal.wuXingQue}}"</span></div>
                          <div v-html="analysis.wuXingQueExplain" style="text-indent: 1em;"></div>
                          <div class="title">
                              八字主格局
                          </div>
                            <div >您的八字主格局为<span style="color:#f14044;">"{{normal.baZiGeJu}}"</span></div>
                          <div v-html="analysis.baZiGeJuExplain" style="text-indent: 1em;"></div>
                          <div class="title">
                              日元星命特征
                          </div>
                            <div>您的日元星命为<span style="color:#f14044;">"{{normal.riYuanXingMing}}"</span></div>
                          <div v-html="analysis.riYuanXingMingExplain" style="text-indent: 1em;"></div>
                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="十神分析" name="2">
                        <div>
                         <div class="title">
                             命格强弱
                          </div>
                          <div class="diagram"></div>
                          <div class="diagramTitle">十神相生相克关系图</div>
                          <van-grid :column-num="2" :gutter="10">
                            <van-grid-item v-for="(item,idnex) in shishen" :key="idnex">
                                <div class="box">
                                    <div class="up">{{item.title}}</div>
                                    <div>
                                        <p> <span>力量:</span>{{item.score}}</p>
                                        <p><span>对应五行:</span>{{item.wuxing}}</p>
                                        <p><span>类项:</span>{{item.leiXiang}}</p>
                                    </div>
                                </div>
                            </van-grid-item>
                            </van-grid>
                         <div class="title">
                              印宫详解：
                          </div>
                          <div style="text-indent: 2em;">
                              生我者为印。印绶一般是生身的代表，六亲类象为母亲、长辈等庇护我的人。可延伸为靠山、文化、知识、信念、信仰、宗教、学校、家庭、房屋，车子等类像。印绶之人在性格上具有随和大度，节俭忍让，无私奉献的特性，易有宗教缘分。但当印绶命格表现为忌的时候，命主则容易陷入懒散，依赖，得过且过，无所作为的困境。甚至容易胡思乱想，出现负面、偏激，不合群的思想和行为，表现出忧虑、抑郁、孤僻等症状。
                          </div>
                          <div v-html="shiShenBreak.yin"></div>
                           <div class="title">
                              比宫详解：
                          </div>
                          <div style="text-indent: 2em;">
                              同我者为比。比劫一般是帮身的代表，在六亲类象上，比劫为兄弟、姊妹、朋友、同事、合伙人等，具有伙同争夺的特性。在性格类像上比劫主务实，做事有魄力，决断果敢，少感情牵绊，喜自由，有广结人缘，舍财重义的特征。因此比劫强大的人多侠义情怀，敢于为朋友两肋插刀打抱不平。但同时不太善于男女情感的细腻表达，神经粗大，情商较低。比劫强的人精力旺盛，体力充沛，有改变世界的源动力，可一旦蛮干过头，就容易陷入有勇无谋的困境，不是被朋友拖累，就是成为坑队友的一把好手。
                          </div>
                          <div v-html="shiShenBreak.bi"></div>
                           <div class="title">
                              食宫详解：
                          </div>
                          <div style="text-indent: 2em;">
                              我生者为食。食伤一般是泄身的代表，为欲望之源。六亲类象为子女、孩子、晚辈以及学生等。一切为我所酝酿产出或耗泄我能量的东西，如演讲，歌唱，写作，艺术创作，追求美食和情欲，都属于食伤的类像。食伤之人是乐天知命的代表，重视物质与精神生活的调和。具有很强的审美能力，喜好文艺，感情生活丰富，思想洒脱，感性，理想高远，待人热忱，善于沟通，头脑清晰，辩才无碍，极具创意才华。但当食伤气场过度为忌时，命主则容易表现出惹事生非，爱发泄，离经叛道，心高气傲，不服管束，淘气妄为，玩世不恭，做事欠责任感，任性，自制力弱，不通世故，虎头蛇尾等负面特性。
                          </div>
                          <div v-html="shiShenBreak.shi"></div>
                           <div class="title">
                              财宫详解：
                          </div>
                          <div style="text-indent: 2em;">
                              我克者为财。财一般是被我克制、支配类像的代表，财的六亲类象对男子表现为妻子、情人、下属及仆人等。也指钱财，投资，及田园不动产之类。财为人生之根本，养命之源头，能支撑人之生长与成长，亦及供人所驱使，行使支配者的指令与使命，是一切财富资本。财气场强大之人容易从事跟钱财或商业打交道的工作，善于处理人际关系。异性缘强且易得异性帮助。但当财过度为忌时，也容易表现为市侩贪财，阿谀奉承，立场不定、没主见，好色，吝啬，博而不精，华而不实，不切实际，重色轻友，爱耍嘴皮等负面特性。
                          </div>
                          <div v-html="shiShenBreak.cai"></div>
                           <div class="title">
                              官宫详解：
                          </div>
                          <div style="text-indent: 2em;">
                              克我者为官杀。官杀一般是克制自我身的类像代表，具有约束，管制的特性。凶则为胁迫，逼迫等类像。官杀可代表丈夫，领导，上司，部队，公检法机关，法律，法则，逻辑规则等强权事物；官杀之人反应机灵，善于洞察，深思熟虑，逻辑思维敏捷，善于谋划，遵纪守法，注重名誉。但当官杀气场过度为忌时，也会表现出疑心过重，墨守成规，迂腐，不懂变通，官僚，死要面子，沽名钓誉等负面特质。官杀之人在工作上多事业心强、积极进取、顾全大局，但容易由于责任心重而过度操劳，甚至超负荷工作，被领导施以重压。
                          </div>
                          <div v-html="shiShenBreak.guan"></div>
                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="流年运势分析" name="3">
                        <div>
                         <div class="title">
                             流年运势
                          </div>
                          <div style="text-indent: 2em;">
                            <div v-for="(item,index) in daYunString.daYunString" :key="index" >
                              {{item.explain}}
                            </div>
                          </div>
                          <br/>
                          <div>
                              人生有命有运，命为本质，运为契机。再优良的种子，错过了春种秋收的契机，也会颗粒无收。但即使是一般的种子，如果处处逢时趁势，也能收获丰厚。因此，借助命理师的帮助，了解自己的运势起伏，遇低则厚积，逢高则薄发。是改变自己命运的重要捷径。
                          </div>
                          <div v-for="(i,z) in daYunA" :key="z + '1'">
                              <div v-html="i.explain"></div>
                          </div>    
                         <div class="title">
                              桃花运势
                          </div>
                          <div style="text-indent: 2em;">
                               人生有命有运，命为本质，运为契机。再优良的种子，错过了春种秋收的契机，也会颗粒无收。但即使是一般的种子，如果处处逢时趁势，也能收获丰厚。因此，借助命理师的帮助，了解自己的运势起伏，遇低则厚积，逢高则薄发。是改变自己命运的重要捷径。
                          </div>
                          <div v-html="daYunString.taohua" ></div>
                            <div class="title">
                              事业财运
                          </div>
                          <div style="text-indent: 2em;">
                               人生有命有运，命为本质，运为契机。再优良的种子，错过了春种秋收的契机，也会颗粒无收。但即使是一般的种子，如果处处逢时趁势，也能收获丰厚。因此，借助命理师的帮助，了解自己的运势起伏，遇低则厚积，逢高则薄发。是改变自己命运的重要捷径。
                          </div>
                          <div v-html="daYunString.shiYeExpain"></div>
                            <div class="title">
                              健康运势
                          </div>
                          <div style="text-indent: 2em;">
                               人生有命有运，命为本质，运为契机。再优良的种子，错过了春种秋收的契机，也会颗粒无收。但即使是一般的种子，如果处处逢时趁势，也能收获丰厚。因此，借助命理师的帮助，了解自己的运势起伏，遇低则厚积，逢高则薄发。是改变自己命运的重要捷径。
                          </div>
                          <div v-html="daYunString.jianKangExplain"></div>
                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="命格评分" name="4">
                         <div class="title">
                              您的命格得分：{{mingGe.score}}
                          </div>
                          <div style="text-indent: 2em;">
                                命格点评将以简练的偈语为您点醒和揭示正确的处世方式。细细揣摩，您将获得意想不到的收获。
                          </div>
                          <div v-html="mingGe.scoreExplain"></div>
                           <div class="title">
                              本命诗曰：
                          </div>
                          <div style="text-indent: 2em;">
                                诗歌是语言的精华。本命诗包括本命诗，祝，和谶三部分。分别为您点醒当下的困惑并揭示未来人生正确和错误的处世方式。希望您能有所领悟和收获。
                          </div>
                          <div v-html="mingGe.benMingShi"></div>
                    </van-collapse-item>
                    <van-collapse-item title="既已知命，如何改命" name="5">
                          <div class="title">
                              如何增加财运：
                          </div>
                          <div v-html="gaiMing.caiYunExplain"></div>
                           <div class="title">
                              如何改善姻缘：
                          </div>
                          <div v-html="gaiMing.yinYuanExplain"></div>
                           <div class="title">
                              如何寻找自己生命中的贵人：
                          </div>
                          <div v-html="gaiMing.ShengXiaoExplain"></div>
                           <div class="title">
                              如何确定自己的开运物：
                          </div>
                          <div v-html="gaiMing.kaiYunExplain"></div>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
        <van-popup v-model="show" :round="true" v-if="this.sources !== '1' && this.sources !== '2' && IsPhoneAndIsEmail">
            <div class="popup">
                <div class="title">请保存您的付费结果</div>
                <div class="subtitle">线上结果仅限查看，请输入手机号，我们会将结果以短信方式发送到您的手机</div>
                <van-field type="tel" :class="{'inputPopup':$common.isPc()}" v-model="value" placeholder="请输入手机号保存结果" @blur="input($event)" />
                <div class="prompt">暂不支持非大陆手机号，非大陆用户请 <span @click="emailClick">保存邮箱</span></div>
                <van-button type="danger" class="button" @click="save">保存并查看结果</van-button>
                <div class="skip" @click="results">跳过直接查看结果</div>
            </div>
        </van-popup>
        <div class="amount">
             <a href="tel:021-6886 0027" class="amount" v-if="!$common.isPc()">客服热线：021-6886 0027</a>
             <a class="amount" v-if="$common.isPc()">客服热线：021-6886 0027</a>
              <div id="companyName" :data-clipboard-text="'3078129182'" @click="copyFn('#companyName')" class="amount"> 客服QQ：3078129182</div>
        </div> <br/>
       
    </div>
</template>
<script lang="ts" src="./results"></script>
<style lang="scss">
@import "./results.scss";
</style>