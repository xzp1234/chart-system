<template>
    <div class="advanced-skill">
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
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" label="技能名称"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="modifySKill(scope.row)">修改</el-button>
                    <el-button type="text" @click="deleteSkill(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增字典 -->
        <el-dialog title="新增高级技能" :visible.sync="showDictDlg">
            <el-form :model="form">
                <el-form-item label="技能名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="取消操作意图" :label-width="formLabelWidth">
                    <el-switch v-model="form.intention"></el-switch>
                </el-form-item>
                <el-form-item label="设置技能热词" :label-width="formLabelWidth">
                    <el-switch v-model="form.hotWord"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDictDlg = false">取 消</el-button>
                <el-button type="primary" @click="addSkill">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            key: '',
            tableData: [],
            showDictDlg: false,
            form: {
                name: '',
                intention: true,
                hotWord: true
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
        addSkill() {
            this.$prompt('请输入技能名称', '新增技能', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '名称不能为空'
            }).then(({ value }) => {
                let url = '/addSkill';
                let param = {
                    skillName: value,
                    bid: ''
                };
                let succFn = res => {
                    if (res.retcode == 0) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                    }
                };
                let errFn = err => {
                    this.$message({
                        type: 'error',
                        message: '新增失败'
                    });
                };
                
                this.$axios.post(url, param, succFn, errFn);
            })
        },
        modifySKill(item) {
            this.$prompt('请输入技能名称', '新增技能', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '名称不能为空',
                inputValue: item.name
            }).then(({ value }) => {
                let url = '/updateSkill';
                let param = {
                    skillName: value,
                    id: item.id
                };
                let succFn = res => {
                    if (res.retcode == 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                };
                let errFn = err => {
                    this.$message({
                        type: 'error',
                        message: '修改失败'
                    });
                };
                
                this.$axios.post(url, param, succFn, errFn);
            })
        },
        deleteSkill(item) {
            let url = '/deleteSkill';
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
            let url = '/getSkills';
            let param = {
                type: 1,
                bid: '121'
            };
            let succFn = res => {
                if (res.retcode == 0) {
                   this.tableData = res.data.list;
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
.el-table thead {
    color: #909399;
    font-weight: 500;
}
</style>
