<template>
  <div class="page-header">
      <div class="logo-wrap" @click="clickHandle">
          <img src="../static/img/logo.png" class="logo" alt="">
          <h3 class="logo-title">
            微信对话开放平台
          </h3>
      </div>
      <div class="user-info">
        <img src="../static/img/user.jpg" alt="">
        <span class="info">{{userInfo.userName + '(ID:' + userInfo.userId + ')'}}</span>
        <span class="info loginout" @click="loginOut">退出</span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        userInfo: {
          userName: ''
        }
    }
  },
  methods: {
    clickHandle() {
      this.$router.replace({
        name: 'home'
      })
    },
    queryUser() {
      let url = 'getWechatUser';
      let param = {};
      let succFn = res => {
        if (res.retcode == 0) {
          this.userInfo = res.data;
        }
      };
      let errFn = err => {

      };

      this.$axios.get(url, param, succFn, errFn);
    },
    loginOut() {
      this.$message({
        type: "success",
        message: "退出成功"
      })
    }
  },
  created() {
    this.queryUser();
  }
}
</script>

<style scoped>
.page-header {
    width: 1200px;
    margin: auto;
    height: 60px;
}
.logo-wrap {
  float: left;
  height: 100%;
  line-height: 60px;
  cursor: pointer;
}
.logo {
    margin-right: 5px;
    width: 28px;
    height: 23px;
    vertical-align: middle;
}
.logo-title {
    display: inline-block;
    position: relative;
    padding: 0;
    margin: 0;
    font-weight: 400;
    color: #ffffff;
    font-size: 14px;
}
.user-info {
    float: right;
    line-height: 60px;
    height: 100%;
}

.user-info img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
}
.info {
    font-size: 14px;
    color: #fff;
    margin: 0 10px;
}
.loginout {
  cursor: pointer;
}
</style>
