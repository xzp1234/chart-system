<template>
    <div class="my-bat">
        <div class="header">
            <span>我的机器人</span>
            <el-button type="text" class="float-right" @click="handleDelete">删除机器人</el-button>
        </div>
        <el-divider></el-divider>
        <h3>机器人信息</h3>
        <div>
            <el-button type="text" class="float-right edit-button" @click="handleEditClick">编辑</el-button>
            <div class="clear"></div>
        </div>
        <div class="form-wrap">
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="机器人账号名称">
                    <el-input v-model="form.batName" :disabled="!enEdit"></el-input>
                </el-form-item>
                <el-form-item label="闲聊昵称">
                    <el-input v-model="form.chartName" :disabled="!enEdit"></el-input>
                </el-form-item>
                <el-form-item label="机器人ID">
                    <el-input v-model="form.batId" disabled></el-input>
                </el-form-item>
                <el-form-item label="未命中技能默认回答">
                    <el-input v-model="form.defaultAns"></el-input>
                </el-form-item>
                <el-form-item label="默认回答是否开启">
                    <el-switch v-model="form.autoAns" :disabled="!enEdit"></el-switch>
                </el-form-item>
                <el-form-item label="语言相识度阀值">
                    <el-slider v-model="form.likeValue" :step="0.5" :max="1" :min="0" show-input :disabled="!enEdit"></el-slider>
                </el-form-item>
                <el-form-item label="相似问题推荐">
                    <el-switch v-model="form.recommend" :disabled="!enEdit"></el-switch>
                </el-form-item>
                <el-form-item v-if="enEdit">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="cancleFn">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            enEdit: false,
            form: {
                defaultAns:"你好，请问有什么可以帮助您的",
                batName: "无问东西",
                chartName: "小微",
                batId: "1123kfmdf",
                autoAns: false,
                likeValue: 1,
                recommend: true
            }
        };
    },
    methods: {
        handleDelete() {
            let url = "deleteBat";
            let succFn = res => {
                if (res.retcode ==0) {
                    this.enEdit = false;
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                }
            };
            let errFn = err => {
                this.$message({
                    type: "error",
                    message: "删除失败"
                })
            };

            this.$axios.post(url, this.form, succFn, errFn);
        },
        handleEditClick() {
            this.enEdit = true;
        },
        onSubmit() {
            let url = "saveBatInfo";
            let succFn = res => {
                if (res.retcode ==0) {
                    this.enEdit = false;
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

            this.$axios.post(url, this.form, succFn, errFn);
        },
        cancleFn() {
            this.enEdit = false;
        }
    }
}
</script>
<style scoped>
.header span {
    font-size: 16px;
}
.edit-button {
    margin-right: 30px;
}
.form-wrap {
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px #ebeef5;
}

form {
    /* width: 80%; */
} 
</style>
