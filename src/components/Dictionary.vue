<template>
    <div class="dictionary-skill">
        <div class="search_operate">
            <div class="search">
                <el-autocomplete
                    class="inline-input"
                    v-model="key"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入要搜索的意图名称"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    size="mini">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
                <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                    <span class="addr">{{ item.address }}</span>
                </template>
                </el-autocomplete>
            </div>
            <el-button type="primary" class="float-right" size="mini" @click="openDlg">
                <i class="el-icon-plus"></i>
                <span>创建技能</span>
            </el-button>
            <div class="clear"></div>
        </div>
        <div class="system">
            <span class="systemDict">自定义词典</span>
            <el-tooltip class="item" effect="dark" content="开发者自定义词典，可增加多个词条" placement="top-start">
                <img src="../static/img/question.png" class="system-question" alt="">>
            </el-tooltip>
        </div>
        <el-table :data="customData" style="width: 100%" border>
            <el-table-column prop="zhName" label="词典中文名"></el-table-column>
            <el-table-column prop="enName" label="词典英文标识"></el-table-column>
            <el-table-column prop="regular" label="正则"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifyDict(scope.row)">修改</el-button>
                    <el-button type="text" @click="deleteDict(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="system">
            <span class="systemDict">系统词典</span>
            <el-tooltip class="item" effect="dark" content="系统预制常用词典，开发者可直接调用，系统词典不可编辑" placement="top-start">
                <img src="../static/img/question.png" class="question" alt="">>
            </el-tooltip>
        </div>
        <el-table :data="systemData" style="width: 100%" border>
            <el-table-column prop="zhName" label="词典中文名">
                <template slot-scope="scope">
                    <el-tag type="info">{{scope.row.zhName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="enName" label="词典英文标识"></el-table-column>
            <el-table-column prop="example" label="例子"></el-table-column>
        </el-table>
        <!-- 新增字典 -->
        <el-dialog title="新增词典" :visible.sync="showDictDlg">
            <el-form :model="form">
                <el-form-item label="词典中文名" :label-width="formLabelWidth">
                    <el-input v-model="form.zhName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="词典英文标识" :label-width="formLabelWidth">
                    <el-input v-model="form.enName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDictDlg = false">取 消</el-button>
                <el-button type="primary" @click="addDic">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            key: '',
            systemData: [],
            customData: [],
            showDictDlg: false,
            form: {
                zhName: "",
                enName: ""
            },
            formLabelWidth: '100px'
        };
    },
    methods: {
        querySearch() {

        },
        handleSelect() {

        },
        handleIconClick() {

        },
        openDlg() {
            this.showDictDlg = true;
        },
        addDic() {
            this.showDictDlg = false;
            this.$message({
                type: "success",
                message: '新增成功'
            }) 
        },
        deleteDict(item) {
            let url = '/deleteDict';
            let param = {
                id: '',
                bid: ''
            };
            let succFn = res => {
                if (res.retcode == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }
            };
            let errFn = err => {
                this.$message({
                    type: 'error',
                    message: '删除失败'
                });
            };
            
            this.$axios.post(url, param, succFn, errFn);
        },
        queryList() {
            let url = '/getDicts';
            let param = {
                type: 0,
                bid: '121'
            };
            let succFn = res => {
                if (res.retcode == 0) {
                    this.systemData = res.data.list.filter(item => item.type == 1);
                    this.customData = res.data.list.filter(item => item.type == 0);
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "查询失败"
                })
            };

            this.$axios.get(url, param, succFn, errFn);
        }
    },
    created() {
        this.queryList();
    }
}
</script>
<style scoped>
.search_operate {
    margin-bottom: 25px;
}
.search {
    float: left;
}
.system {
    position: relative;
}
.systemDict {
    font-size: 14px;
    line-height: 40px;    
}
.system-question {
    position: absolute;
    top: 13px;
    left: 75px;
    width: 14px;
    height: 14px;
}
.question {
    position: absolute;
    top: 13px;
    left: 60px;
    width: 14px;
    height: 14px;
}
</style>
