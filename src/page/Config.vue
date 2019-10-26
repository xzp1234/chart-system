<template>
  <div class="config-page">
      <div class="header">
          <div class="header-content">
                <div class="left">
                    当前机器人
                    <el-dropdown @command="selectChange">
                        <span class="el-dropdown-link">
                            无问东西<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="new">
                                <i class="el-icon-circle-plus-outline createRobot">&nbsp;新建机器人</i>
                            </el-dropdown-item>
                            <el-input class="search"
                                placeholder="请输入机器人名称"
                                suffix-icon="el-icon-search"
                                size="mini"
                                v-model="key">
                            </el-input>
                            <el-dropdown-item v-for="biz in bizList" :key="biz.bid" :command="biz.bid">{{biz.zhName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="text" class="set-config" @click="setConfig">设置</el-button>
                </div>
                <div class="right">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="debuggHandle">机器人调试</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="publishHandle">发布</el-button>
                </div>
          </div>
      </div>
      <div class="body">
          <router-view></router-view>
      </div>
      <el-drawer :visible.sync="showDialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
                <div class="box-card debug-box-card">
                    <el-tabs v-model="activeTab" @tab-click="selectTab">
                        <el-tab-pane name="chart">
                            <template slot="label">
                                <span>
                                    <i class="el-icon-service"></i>
                                    机器人对话
                                </span>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane name="JSON">
                            <template slot="label">
                                <span>
                                    <i class="el-icon-s-data"></i>
                                    JSON
                                </span>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane name="skill">
                            <template slot="label">
                                <span>
                                    <i class="el-icon-news"></i>
                                    预置技能
                                </span>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane name="clear" disabled>
                            <template slot="label">
                                <span @click="clearScreen" class="clear-btn">
                                    清屏
                                </span>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                    <el-card shadow="always" class="console">
                        <div v-if="activeTab == 'chart'" class="">
                            <div class="session" v-for="item in chartList" :key="item.id"  :class="item.isBot ? 'bot' : 'user'">
                                <div class="pre-answer">
                                    <el-tag :type="item.isBot ? 'success': 'info'" class="bot-tag">
                                        <div class="aitext">
                                            <div class="text">{{item.text}}</div>
                                        </div>
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                        <div v-if="activeTab == 'JSON'" class="">
                            {{JSONString}}
                        </div>
                        <div v-if="activeTab == 'skill'" class="">
                            <el-collapse accordion>
                                <el-collapse-item v-for="item in systemSkill" :key="item.id">
                                    <template slot="title">
                                        <i class="symble-icon"></i>
                                        {{item.name}}
                                    </template>
                                    <el-form :model="item">
                                        <el-form-item label="开启" :label-width="formLabelWidth">
                                            <el-switch v-model="item.used"></el-switch>
                                        </el-form-item>
                                        <el-form-item label="描述" :label-width="formLabelWidth">
                                            <div>{{item.description}}</div>
                                        </el-form-item>
                                        <el-form-item label="例句" :label-width="formLabelWidth">
                                            <ul>
                                                <li v-for="(eg, index) in item.example" :key="index">
                                                    <el-button type="text">
                                                        <span class="eg-text">{{eg}}</span>
                                                    </el-button>
                                                </li>
                                            </ul>
                                        </el-form-item>
                                    </el-form>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-card>
                    <div class="input-area" v-if="activeTab == 'chart'">
                        <el-input v-model="input" @keyup.enter.native="sendMessage" placeholder="请输入用户说法，按enter结束"></el-input>
                    </div>
                </div>
            </div>
        </el-drawer>
        <!-- 新增机器人 -->
        <el-dialog title="新增机器人" :visible.sync="showDlg">
            <el-form :model="form">
                <el-form-item label="机器人名称" :label-width="formLabelWidth">
                    <el-input v-model="form.zhName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="机器人ID" :label-width="formLabelWidth">
                    <el-input v-model="form.enName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDlg = false">取 消</el-button>
                <el-button type="primary" @click="addBiz">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
      return {
          key: '',
          showDialog: false,
          input: '',
          activeTab: 'chart',
          form: {
              enName: '',
              zhName: ''
          },
          showDlg: false,
          bizList: [],
          formLabelWidth: '100px',
          chartList: [
              {
                  id: '2312',
                  isBot: true,
                  text: '请问有什么需要帮助的吗'
              },
              {
                  id: '233432',
                  isBot: false,
                  text: '我想听一首周杰伦的歌'
              },
              {
                  id: '2332112',
                  isBot: true,
                  text: '抱歉，我没有这个技能'
              }
          ],
          systemSkill: [],
          JSONString: ""
      }
  },
  methods: {
      selectTab(tab) {
          if (tab.name == 'skill') {
              this.querySystemSkill();
          }
          if (tab.name == 'JSON') {
              this.queryJSON()
          }
      },
      selectChange(value) {
          if (value == 'new') {
              this.showDlg = true;
          }
      },
    addBiz() {
        let url = '/addBiz';
        let param = this.form
        let succFn = res => {
            if (res.retcode == 0) {
                this.showDlg = false;
                this.$message({
                    type: "success",
                    message: "新增成功"
                })
            }
        };
        let errFn = err => {
            this.$message({
                type: "error",
                message: "新增失败"
            })
        };

        this.$axios.post(url, param, succFn, errFn);
    },
    setConfig() {

    },
    debuggHandle() {
          this.showDialog = true;
    },
    publishHandle() {
        let url = '/publish';
        let param = {

        };
        let succFn = res => {
            if (res.retcode == 0) {
                this.$message({
                    type: "success",
                    message: "发布成功"
                })
            }
        };
        let errFn = err => {
            this.$message({
                type: "error",
                message: "发布失败"
            })
        };

        this.$axios.post(url, param, succFn, errFn);
    },
    queryBizList() {
        let url = '/getBizList';
        let param = {

        };
        let succFn = res => {
            if (res.retcode == 0) {
                this.bizList = res.data.list;
            }
        };
        let errFn = err => {
            this.$message({
                type: "error",
                message: "查询失败"
            })
        };

        this.$axios.get(url, param, succFn, errFn);
    },
    sendMessage() {
        let data = {
            "id": null,
            "isBot": false,
            "text": this.input
        };
        this.chartList.push(data);
        this.input = '';
        let url = '/getKeFuDebugResult';
        let param = {

        };
        let succFn = res => {
            if (res.retcode == 0) {
                this.chartList.push(res.data);
            }
        };
        let errFn = err => {
            this.$message({
                type: "error",
                message: "查询失败"
            })
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
    },
    queryJSON() {
        let url = '/getJSON';
        let param = {

        };
        let succFn = res => {
            if (res.retcode == 0) {
                this.JSONString = res.data;
            }
        };
        let errFn = err => {

        };

        this.$axios.get(url, param, succFn, errFn);
    },
    clearScreen() {
        this.chartList =  [
              {
                  id: '2312',
                  isBot: true,
                  text: '请问有什么需要帮助的吗'
              }
        ];
    }
  },
  created() {
      this.queryBizList();
  }
}
</script>

<style scoped>
.config-page {
    width: 100%;
}
.header {
    width: 100%;
    height: 60px;
    position: relative;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 7px 7px -7px #dddddd;
    box-shadow: 0px 7px 7px -7px #dddddd;
}
.header-content {
    width: 1200px;
    height: 100%;
    margin: auto;
}
.left {
    float: left;
    height: 60px;
    line-height: 60px;
}
.right {
    height: 60px;
    line-height: 60px;
    float: right;
}
.el-dropdown-menu__item i {
    margin-right: 5px;
}
.el-dropdown-menu .el-dropdown-menu__item, .el-popper .el-dropdown-menu__item {
    padding: 0 36px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-popper {
    width: 240px;
}
.createRobot {
    color: #409EFF;
}
.search {
    display: block;
    width: 80%;
    height: 30px;
    margin: 5px auto; 
}
.set-config {

}
.body {
    background-color: #FCFCFC;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 70px;
}
.debug-box-card {
        height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
}
.console {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
}
.input-area {
    margin-top: 15px;
}

.debug-box-card .session {
    margin: 10px 0;
    text-align: left;
}
.debug-box-card .pre-answer {
    margin: 10px 0;
}
.debug-box-card .session .el-tag {
    word-break: break-word;
    white-space: normal;
    height: auto;
    white-space: pre-line;
}
.debug-box-card .bot-tag {
    line-height: 25px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.aitext {
    width: 100%;
}
.aitext .text {
    font-size: 12px;
    color: #909399;
}
.debug-box-card .session.user {
    text-align: right;
}
.symble-icon {
    margin: 10px;
    background: #ebeef5;
    width: 10px;
    height: 10px;
    border-radius: 100%;
}
.eg-text {
    color: #07c05f;
}
.clear-btn {
    color: #409eff;
    cursor: pointer;
}
</style>
