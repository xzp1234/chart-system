<template>
    <div class="chart-page">
        <el-page-header @back="goBack" content="消息记录"></el-page-header>
        <div class="chart-content">
            <div class="chart-toolbar">
                <span>时间过滤</span>
                <el-select v-model="day" size="small">
                    <el-option value="null" label="默认"></el-option>
                    <el-option value="5" label="最近五天"></el-option>
                    <el-option value="3" label="最近三天"></el-option>
                    <el-option value="1" label="最近一天"></el-option>
                </el-select>
            </div>
            <el-table :data="tableData" style="width: 100%" class="chart-table">
                <el-table-column>
                    <template slot-scope="scope">
                        <div class="question">
                            <div class="icon">Q</div>
                            <div class="query">{{scope.row.query}}</div>
                        </div>
                        <div class="result">
                            <div class="icon">A</div>
                            <div class="answer">
                                <template v-if="scope.row.answer.type == 1">
                                    {{scope.row.answer.message}}
                                </template>
                                <template v-if="scope.row.answer.type == 2">
                                    {{scope.row.answer.message}}
                                </template>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="chart-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="pageNum" :page-sizes="[100, 200, 300, 400]" :page-size="pageSize" 
                layout="sizes, prev, pager, next, jumper, total" :total="count">
            </el-pagination>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            day: '',
            tableData: [],
            pageNum: 1,
            pageSize: 100,
            count: 0
        };
    },
    methods: {
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        goBack() {
            this.$router.push(
                {
                    name: 'config'
                }
            );
        },
        queryList() {
            let url ='/queryChartList';
            let param = {};
            let succFn = res => {
                if (res.retcode ==0) {
                    this.tableData = res.data.list;
                }
            };
            
            this.$axios.get(url, param, succFn);
        }
    },
    created() {
        this.queryList();
    }
}
</script>
<style lang="css" scoped>
.chart-page {
    width: 1200px;
    margin: 50px auto;
}
.chart-content {
    margin: 20px 0;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px #c1c1c1;
}
.question {
    display: flex;
    margin-bottom: 10px;
}
.question .icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    text-align: center;
    border-radius: 50%;
    background: #f56c6c;
}
.result {
    display: flex;
}

.result .icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    text-align: center;
    border-radius: 50%;
    background: #12ca31;
}

.chart-table {
    border: 1px solid #c1c1c1c1;
    margin-top: 20px;
}
.chart-pagination {
    float: right;
    margin: 20px 0;
}
</style>


