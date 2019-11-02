<template>
    <div class="permition">
        <div class="header">
            <span>权限管理</span>
        </div>
        <el-divider></el-divider>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>权限分类:</span>
            </div>
            <div class="text item">
                创建者：拥有除删除外的所有权限
                <br> 管理员：可以设置以下两种人员权限，并且拥有测试、编辑以及发布的权限
                <br> 编辑员：拥有测试和编辑权限
                <br> 测试员：拥有测试权限
            </div>
        </el-card>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="userId" label="用户ID" width="180">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="180">
            </el-table-column>
            <el-table-column prop="role" label="角色">
                <template slot-scope="scope">
                    <el-tag type="danger">{{ENUM_ROLE[scope.row.role]}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            </el-table-column>
        </el-table>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户ID">
                <el-select v-model="formInline.userId" placeholder="请选择" @select="handleSelect">
                    <el-option v-for="user in userOpts" :key="user.userId" :label="user.userName" :value="user.userId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formInline.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="formInline.role" placeholder="请选择">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="测试员" value="2"></el-option>
                    <el-option label="编辑员" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addUser">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            userOpts: [
                {
                    userId: "213131",
                    userName: "无问东西"
                },
                {
                    userId: "25131",
                    userName: "大王"
                }
            ],
            formInline: {
                userId: "",
                remark: "",
                role: ""
            },
            ENUM_ROLE: {
                1: "管理员",
                2: "测试员",
                3: "编辑员"
            }
        };
    },
    methods: {
        handleSelect(val) {
            this.formInline.remark;
        },
        queryUserList() {
            let url = "queryUserList";
            let succFn = res => {
                if (res.retcode == 0) {
                    this.tableData = res.data.list;
                    this.count = res.data.count;
                }
            };
            let errFn = err => {
                
            };

            this.$axios.get(url, {}, succFn, errFn);
        },
        addUser() {
            let url = "/addUser";
            let succFn = res => {
                if (res.retcode == 0) {
                    this.$message({
                        type: "success",
                        message: "添加成功"
                    });
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "添加失败"
                });
            };

            this.$axios.post(url, {}, succFn, errFn);
        }
    },
    created() {
        this.queryUserList();
    }
}
</script>
<style scoped>
.header span {
    font-size: 16px;
}

.box-card {
    width: 80%;
}
.el-table {
    margin-top: 20px;
}
.demo-form-inline {
    margin: 20px;
}
</style>
