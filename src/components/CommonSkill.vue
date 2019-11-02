<template>
    <div class="common-skill">
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
            <div class="operate">
                <div class="download">
                    <div>
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="mutilUpload">批量上传</el-dropdown-item>
                                <el-dropdown-item command="mutilDownload">批量下载</el-dropdown-item>
                                <el-dropdown-item command="mutilTransfer">技能转换</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span class="example-link">
                            <a href="https://res.wx.qq.com/mmspraiweb_node/dist/static/openai/upskillsample.xls">模板示例: 猜拳</a>
                        </span>
                    </div>
                    <el-button type="primary" size="mini" @click="addSkill">
                        <i class="el-icon-plus"></i>
                        <span>创建技能</span>
                    </el-button>
                </div>
            </div>
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
        <el-dialog title="批量上传" :visible.sync="uploadDlg">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8080/uploadFile"
                :file-list="fileList"
                :on-success="handleSuccss"
                :on-error="handleErrof"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            key: '',
            tableData: [],
            uploadDlg: false,
            fileList: []
        };
    },
    methods: {
        handleSuccss(res) {
            if (res.retcode == 0) {
                this.uploadDlg = false;
                this.$message({
                    type: "success",
                    message: "上传成功"
                });
            } else {
                this.$message({
                    type: "error",
                    message: "上传失败"
                });
            }
        },
        handleErrof() {
            this.$message({
                type: "error",
                message: "上传失败"
            });
        },
        querySearch() {

        },
        handleSelect() {

        },
        handleIconClick() {

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
        deleteSkill(id) {
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
                type: 0,
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
        },
        handleCommand(com) {
            if (com == 'mutilUpload') {
                this.uploadDlg = true;
            }
            if (com == 'mutilDownload') {
                this.mutilDownload();
            }
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        mutilDownload() {
            let url = '/mutilDownload';
            let param = {
               
            };
            let succFn = res => {
                if (res.retcode == 0) {
                   this.$message({
                        type: "success",
                        message: "下载成功"
                    })
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "下载失败"
                })
            };

            this.$axios.post(url, param, succFn, errFn);
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
.operate {
    float: right;
    width: 471px;
    padding-left: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.download {
    padding: 0;
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #cccccc;
    height: 28px;
}
.example-link a {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #8B8B8B;
    text-decoration: none;
    underline: none;
}
</style>
