<template>
    <div class="logger">
        <div class="header">
            <span>操作日志</span>
        </div>
        <el-divider></el-divider>
        <div class="toolbar">
            <el-date-picker v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" class="float-right" icon="el-icon-search" @click="searchFn">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%; margin:20px 0;">
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作人">
                <template slot-scope="scope">
                    {{scope.row.userName + '(' + scope.row.userId + ')'}}
                </template>
            </el-table-column>
            <el-table-column label="操作描述" prop="description">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dateRange: "",
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableData: []
        };
    },
    methods: {
        searchFn() {
            let url = "queryLoggerList";
            let succFn = res => {
                if (res.retcode == 0) {
                    this.tableData = res.data.list;
                    this.count = res.data.count;
                    this.$message({
                        type: "success",
                        message: "保存成功"
                    });
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "保存失败"
                })
            };

            this.$axios.get(url, {}, succFn, errFn);
        }
    },
    created() {
        this.searchFn();
    }
}
</script>
<style scoped>
.header span {
    font-size: 16px;
}
</style>

