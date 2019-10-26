<template>
  <div class="skill">
      <div class="box-card">
            <div class="title">
              自定义对话技能
             </div>
            <el-tabs type="card" v-model="activeTab">
                <el-tab-pane name="commonSkill">
                    <template slot="label">
                        <span class="skillName">普通技能</span>
                        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                        <img src="../static/img/question.png" class="question" alt="">
                        <div class="number">(0)</div>
                        </el-tooltip>
                    </template>
                </el-tab-pane>
                <el-tab-pane name="advancedSkill">
                    <template slot="label">
                        <span class="skillName">高级技能</span>
                        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                        <img src="../static/img/question.png" class="question" alt="">
                        <div class="number">(0)</div>
                        </el-tooltip>
                    </template>
                </el-tab-pane>
                <el-tab-pane name="dictionary">
                    <template slot="label">
                        <span class="skillName">词典</span>
                        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                        <img src="../static/img/question.png" class="question" alt="">
                        <div class="number">(0)</div>
                        </el-tooltip>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <component v-bind:is="activeTab"></component>
      </div>
      <div class="skillRight">
          <div>
              <div class="statistic">
                  <div class="card_top">
                      <div class="top">
                          <span class="top_title">统计</span>
                      </div>
                      <div class="bottom">
                          <div class="top_detail">
                              <span class="see">
                                  <img src="../static/img/see.png" alt="">
                                  对话记录
                              </span>
                              <span class="see statisticsee">
                                  <img src="../static/img/statics.png" alt="">
                                  统计详情
                              </span>
                          </div>
                          <div class="top_date">
                              <span class="el-icon-time"></span>
                              {{dataRange}}
                          </div>
                      </div>
                  </div>
                  <div class="empty"></div>
                  <div class="card_bottom">
                      <div class="card_bottom_content">
                          <div class="middle_conversation">
                              <span class="middle_number">{{staticData.chartCount}}</span>
                              <span class="middle_title">日会话数</span>
                          </div>
                          <div class="card_bottom_vertical"></div>
                          <div class="middle_active">
                              <span class="middle_number">{{staticData.userCount}}</span>
                              <span class="middle_title">日活用户</span>
                          </div>
                          <div class="card_bottom_vertical"></div>
                          <div class="middle_error">
                              <span class="middle_number">{{staticData.averageCount}}</span>
                              <span class="middle_title">平均轮次</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="acquired">
              <div>
                  <div class="view">
                      <el-container>
                          <el-main>
                              <div class="title">
                                  <h3>系统对话技能</h3>
                              </div>
                              <div class="showImage clearfix">
                                  <div class="show" v-for="skill in systemSkill" :key="skill.id">
                                      <div class="show_inner">
                                          <div class="true_show_inner">
                                              <div class="top">
                                                  <span class="top_cname">{{skill.name}}</span>
                                                <el-switch v-model="skill.used" @change="switchSystemSkill"></el-switch>
                                              </div>
                                              <div class="content">
                                                  <span>{{skill.description}}</span>
                                              </div>
                                              <div class="bottom" v-if="skill.used">
                                                  <span class="tips">示例:</span>
                                                  <div class="info">
                                                      <div class="info_word" v-for="(item, index) in skill.example" :key="index">
                                                          <span class="blueColor">{{item}}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </el-main>
                      </el-container>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import dictionary from './Dictionary';
import advancedSkill from './AdvancedSkill'
import commonSkill from './CommonSkill'
export default {
    data() {
        return {
            activeTab: 'commonSkill',
            staticData: {},
            systemSkill: [],
            dataRange: '2019-10-25 至 2019-10-26'
        }
    },
    methods: {
        switchSystemSkill() {
            let url = '/switchSystemSkill';
            let param = {

            };
            let succFn = res => {
                if (res.retcode == 0) {
                    this.$message({
                        type: "success",
                        message: "切换成功"
                    })
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "切换失败"
                })
            };

            this.$axios.post(url, param, succFn, errFn);
        },
        queryStatics() {
            let url = '/getStatics';
            let param = {

            };
            let succFn = res => {
                if (res.retcode == 0) {
                    this.staticData = res.data;
                }
            };
            let errFn = err => {

            };

            this.$axios.get(url, param, succFn, errFn);
        },
        querySystemSkill() {
            let url = '/getSystemSkill';
            let param = {

            };
            let succFn = res => {
                if (res.retcode == 0) {
                    this.systemSkill = res.data.list;
                }
            };
            let errFn = err => {

            };

            this.$axios.get(url, param, succFn, errFn);
        }
    },
    components: {
        dictionary,
        advancedSkill,
        commonSkill
    },
    created() {
        this.queryStatics();
        this.querySystemSkill();
    }
}
</script>
<style scoped>
.skill {
    width: 1200px;
    height: 919px;
    margin: 0px auto 30px;
}
.box-card {
    float: left;
    width: 790px;
    height: 100%;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    border-radius: 10px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.box-card>.title {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    margin-bottom: 19px;
    margin-top: 19px;
}
.question {
    width: 12px;
    height: 12px;
    display: inline-block;
}
.number {
    display: inline-block;
    color: rgb(96, 98, 102);
}
.skillRight {
    float: left;
    width: 390px;
}
.statistic {
    width: 390px;
    height: 191px;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    border-radius: 10px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 20px;
}
.card_top {
    height: 57px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.card_bottom {
    height: 93px;
    width: 100%;
    padding-top: 22px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    
}
.empty {
    width: 100%;
    height: 1px;
    background: #f0f0f0;
}
.card_bottom_content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
}
.middle_conversation {
        height: 59px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.card_bottom_vertical {
    width: 1px;
    height: 42px;
    background: #6b6c70;
    opacity: 0.1;
}
.middle_active {
    height: 59px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.middle_error {
    height: 59px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.middle_number {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
    font-family: Proxima Nova;
    font-weight: bold;
    color: #409EFF;
}
.top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.top_title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
}
.top_detail {  
    text-align: right;
    margin-top: 5px; 
}
.see {
    cursor: pointer;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #409EFF;
}
.statisticsee {
    margin-left: 10px;
}
.top_date {
    margin-left: 8px;
    font-size: 12px;
    font-family: Proxima Nova;
    font-weight: 400;
    color: #606266;
}
.el-icon-time {
    margin-right: 3px;
    font-size: 12px;
    font-family: Proxima Nova;
    font-weight: 400;
    color: #606266;
}
.acquired {
    margin-top: 10px;
    width: 410px;
    margin-left: 10px;
}
.el-main {
    padding: 0;
}
.el-main .title {
    margin: 17px 0 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.title h3 {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    margin-left: 30px;
}
.clearfix {
    zoom: 1;
}
.clearfix::before {
    content: "";
    display: block;
    clear: both;
}
.show {
    cursor: pointer;
    border: none;
    float: left;
    width: 190px;
    height: 158px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.show_inner {
    width: 100%;
    height: 100%;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    box-shadow: 0px 2px 10px 3px rgba(205, 205, 205, 0.19);
    border-radius: 10px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.true_show_inner {
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: space-around;
}
.true_show_inner .top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.top_cname {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 600;
    color: #303133;
}
.true_show_inner .content {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    height: 46px;
    border-bottom: 1px solid #f0f0f0;
}
.true_show_inner .content span {
    width: 100%;
    height: 32px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-top: 6px;
}
.true_show_inner .bottom {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    font-size: 12px;
}
.true_show_inner .tips {
    margin-right: 10px;
    color: #606266;
}
.info_word {
    width: 108px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.blueColor {
    color: #409EFF
}
</style>
