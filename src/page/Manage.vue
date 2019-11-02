<template>
    <div class="manage-page">
        <el-page-header @back="goBack"></el-page-header>
        <el-container>
            <el-aside>
                <el-menu
                    :default-active="activeMenu"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect">
                    <el-menu-item index="myBat">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的机器人</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="service">
                        <i class="el-icon-document"></i>
                        <span slot="title">服务接入</span>
                    </el-menu-item> -->
                    <el-menu-item index="permition">
                        <i class="el-icon-setting"></i>
                        <span slot="title">管理权限</span>
                    </el-menu-item>
                    <el-menu-item index="logger">
                        <i class="el-icon-setting"></i>
                        <span slot="title">操作日志</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeMenu: 'myBat'
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
        handleSelect(index) {
            console.log(index);
            this.$router.push({
                name: index
            });
        }
    },
    beforeRouteUpdate(to, from, next) {
        let path = to.path;
        if (path.indexOf('myBat') != -1) {
            this.activeMenu = 'myBat';
        }
        if (path.indexOf('service') != -1) {
            this.activeMenu = 'service';
        }
        if (path.indexOf('permition') != -1) {
            this.activeMenu = 'permition';
        }
        if (path.indexOf('logger') != -1) {
            this.activeMenu = 'logger';
        }
        next();
    },
    beforeRouteEnter(to, from, next) {
        let path = to.path;
        next(vm => {
            if (path.indexOf('myBat') != -1) {
                vm.activeMenu = 'myBat';
            }
            if (path.indexOf('service') != -1) {
                vm.activeMenu = 'service';
            }
            if (path.indexOf('permition') != -1) {
                vm.activeMenu = 'permition';
            }
            if (path.indexOf('logger') != -1) {
                vm.activeMenu = 'logger';
            }
        });
    }
}
</script>
<style lang="css" scoped>
.manage-page {
    width: 1200px;
    margin: 50px auto;
}

.el-container {
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px #ebeef5;
}
.el-aside {
    width: 190px !important;
    min-height: 500px;
    padding: 77px 0 0 31px;
    box-sizing: border-box;
    border-right: 1px solid #ebeef5;
}
</style>

