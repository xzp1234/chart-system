<template>
    <div class="statistic-page">
        <el-page-header @back="goBack" content="统计"></el-page-header>
        <div class="statistic-content">
            <div class="basic-data">
                <div class="toolbar">
                    <span class="toolbar-title">基础数据</span>
                    <div class="date-pick">
                        <span>时间</span>
                        <el-date-picker v-model="selectDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-button-group class="button-group">
                        <el-button type="text" @click="queryData">今日</el-button>
                        <el-button type="text" @click="queryData">近三天</el-button>
                        <el-button type="text" @click="queryData">近一周</el-button>
                        <el-button type="text" @click="queryData">近一个月</el-button>
                    </el-button-group>
                </div>
                <div class="table-wrap">
                    <div class="table-title">1.会话数据
                        <el-button class="float-right" size="mini" type="success" icon="el-icon-download" @click="downLoad" plain>下载数据</el-button>
                    </div>
                    <el-table :data="converData" border style="width: 100%">
                        <el-table-column prop="conversationCount" label="会话数（用户请求总数）" width="180">
                        </el-table-column>
                        <el-table-column prop="activeUserCount" label="活跃用户数（人*天）" width="180">
                        </el-table-column>
                        <el-table-column prop="textQuestionScale" label="文本问题占比">
                        </el-table-column>
                        <el-table-column prop="voiceQuestionScale" label="语音问题占比" width="180">
                        </el-table-column>
                        <el-table-column prop="uselessAnswer" label="无效回复数（无命中类+无效客服类）" width="180">
                        </el-table-column>
                        <el-table-column prop="uselessAnswerScale" label="无效回复比例">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-wrap">
                    <div class="table-title">2.用户数据
                        <el-button class="float-right" size="mini" type="success" icon="el-icon-download" @click="downLoad" plain>下载数据</el-button>
                    </div>
                    <el-table :data="userData" border style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="todayNewUserCount" label="今日用户增长数" width="180">
                        </el-table-column>
                        <el-table-column prop="newUserScale" label="用户增长率">
                        </el-table-column>
                        <el-table-column prop="skillCoverScale" label="技能覆盖率" width="180">
                        </el-table-column>
                        <el-table-column prop="todayActiveUserCount" label="今日用户活跃人数" width="180">
                        </el-table-column>
                        <el-table-column prop="sevenDayAverageActiveDayCount" label="七天内活跃用户的平均活跃天数">
                        </el-table-column>
                        <el-table-column prop="thirtyDayAverageActiveDayCount" label="三十天内活跃用户的平均活跃天数" width="180">
                        </el-table-column>
                        <el-table-column prop="todayUserCount" label="今日用户数">
                        </el-table-column>
                        <el-table-column prop="todayConversationCount" label="今日对话数" width="180">
                        </el-table-column>
                        <el-table-column prop="displeasureConversationCount" label="不满意的对话数">
                        </el-table-column>
                        <el-table-column prop="displeasureScale" label="不满意率" width="180">
                        </el-table-column>
                        <el-table-column prop="averageConversationLength" label="平均对话长度">
                        </el-table-column>
                        <el-table-column prop="userTotalCount" label="累计用户总数">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-wrap">
                    <div class="table-title">3.分类统计
                        <el-button class="float-right" size="mini" type="success" icon="el-icon-download" @click="downLoad" plain>下载数据</el-button>
                    </div>
                    <el-table :data="converData" border style="width: 100%">
                        <el-table-column prop="conversationCount" label="会话数（用户请求总数）" width="180">
                        </el-table-column>
                        <el-table-column prop="activeUserCount" label="活跃用户数（人*天）" width="180">
                        </el-table-column>
                        <el-table-column prop="textQuestionScale" label="文本问题占比">
                        </el-table-column>
                        <el-table-column prop="voiceQuestionScale" label="语音问题占比" width="180">
                        </el-table-column>
                        <el-table-column prop="uselessAnswer" label="无效回复数（无命中类+无效客服类）" width="180">
                        </el-table-column>
                        <el-table-column prop="uselessAnswerScale" label="无效回复比例">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="class-data">
                <div class="toolbar">
                    <span class="toolbar-title">类别高配聚类</span>
                    <div class="class-type">
                        <span>类型</span>
                        <el-select v-model="classType">
                            <el-option label="周报" value="week"></el-option>
                            <el-option label="日报" value="day"></el-option>
                        </el-select>
                    </div>
                    <div class="date-select">
                        <span>时间</span>
                        <el-date-picker v-model="day" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="button-group">
                        <el-button class="float-right" size="mini" type="success" icon="el-icon-download" @click="downLoad" plain>下载数据</el-button>
                    </div>
                </div>
                <div class="table-wrap">
                    <el-table :data="classData" border style="width: 100%">
                        <el-table-column prop="classId" label="类别ID" width="180">
                        </el-table-column>
                        <el-table-column prop="userRealQuestion" label="用户真实问题" width="180">
                        </el-table-column>
                        <el-table-column prop="batAnswer" label="机器人回答">
                        </el-table-column>
                        <el-table-column prop="answerBlong" label="答案所属" width="180">
                        </el-table-column>
                        <el-table-column prop="frequency" label="频次" width="180">
                        </el-table-column>
                        <el-table-column prop="classTotalFrequency" label="类别总频次">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectDate: '',
            converData: [],
            userData: [],
            classType: '',
            day: '',
            classData: ''
        };
    },
    methods: {
        goBack() {
            this.$router.push(
                {
                    name: 'config'
                }
            );
        },
        handleOpen() {

        },
        handleClose() {

        },
        queryClassData() {
            let url ='/queryClassData';
            let param = {};
            let succFn = res => {
                if (res.retcode ==0) {
                    this.classData = res.data.list;
                }
            };
            
            this.$axios.get(url, param, succFn);
        },
        queryConversation() {
            let url ='/queryConversation';
            let param = {};
            let succFn = res => {
                if (res.retcode ==0) {
                    this.converData = res.data.list;
                }
            };
            
            this.$axios.get(url, param, succFn);
        },
        queryUserData() {
            let url ='/queryUserData';
            let param = {};
            let succFn = res => {
                if (res.retcode ==0) {
                    this.userData = res.data.list;
                }
            };
            
            this.$axios.get(url, param, succFn);
        },
        handleSelect(index) {
            console.log(index);
            this.$router.push({
                name: index
            });
        },
        downLoad() {

        }
    },
    created() {
        this.queryConversation();
        this.queryUserData();
        this.queryClassData();
    }
}
</script>
<style lang="css" scoped>
.statistic-page {
    width: 1200px;
    margin: 50px auto;
}

.statistic-content {
    
}

.basic-data, .class-data {
    margin: 20px 0;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px #c1c1c1;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
}

.toolbar-title {
    font-size: 16px;
    font-weight: 600;
}

.button-group {
    margin: 0 20px;
}

.button-group .el-button {
    margin: 0 10px;
}

.date-pick {
    margin: 0 10px;
}

.date-pick>span {
    font-weight: 600;
}

.table-wrap {
    margin-top: 10px;
}

.table-wrap .table-title {
    padding: 20px;
    font-weight: 600;
}
</style>


