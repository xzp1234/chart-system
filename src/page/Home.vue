<template>
  <div class="home-page">
      <div class="banner-wrap">
          <div class="banner">
              <div class="content">
                  <h2 class="content-title">微信对话开放平台</h2>
                  <p class="content-text">
                        微信对话开放平台是以对话交互为核心,
                        为有客服需求的个人、企业和组织提供智能业务服务与用户管理能力的技能配置平台,
                        技能开发者可利用我们提供的工具自主完成客服机器人的搭建.
                  </p>
                  <div class="link"></div>
                  <div>
                      <el-button type="primary" class="start" @click="clickHandle">开始使用</el-button>
                  </div>
              </div>
              <div class="banner-imgs">
                  <img src="../static/img/bannerImg.png" alt="" class="banner-img">
                  <img src="../static/img/iphoneDialogOne.png" alt="" class="iphoneDialogOne">
                  <img src="data:image/png;base64,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" alt="" class="iphoneDialogTwo">
                  
                  <img src="../static/img/iphoneDialogThree.png" alt="" class="iphoneDialogThree">
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        clickHandle() {
            this.$router.push({
                name: 'config'
            })
        }
    }
}
</script>
<style scoped>
.home-page {
    width: 100%;
}
.banner-wrap {
    width: 100%;
    height: 683px;;
    background: url('../static/img/background.png') no-repeat;
    background-size: 100% 100%;
}
.banner {
    width: 1200px;
    height: 100%;
    margin: auto;
}
.content {
    box-sizing: border-box;
    float: left;
    padding-top: 140px;
    padding-right: 74px;
}
.content-title {
    padding: 0;
    margin: 0;
    font-size: 36px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
}
.content-text {
    padding: 0;
    margin: 0;
    width: 459px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
    margin-top: 35px;
    text-align: justify;
}
.link {
    margin-top: 26px;
}
.start {
    line-height: 0;
    margin-top: 45px;
    width: 140px;
    height: 40px;
    background-color: #1aad19;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #ffffff;
    border-radius: 10px;
    border-color: none;
}
.banner-imgs {
    float: left;
    margin-top: 40px;
    position: relative;
}
.banner-img {
    width: 671px;
    height: 506px;
    display: block;
    margin-left: -20px;
}
.iphoneDialogOne {
    position: absolute;
    top: 100px;
    left: 235px;
    width: 208px;
    height: 133px;
    display: block;
    -webkit-animation: myfirst-data-v-3793f8b3 1s linear;
    animation: myfirst-data-v-3793f8b3 1s linear;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
.iphoneDialogTwo {
    width: 241px;
    height: 147px;
    display: block;
    position: absolute;
    top: 240px;
    right: 45px;
    -webkit-animation: mysecond-data-v-3793f8b3 1s linear;
    animation: mysecond-data-v-3793f8b3 1s linear;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
.iphoneDialogThree {
    position: absolute;
    top: 136px;
    left: 66px;
    width: 264px;
    height: 179px;
    display: block;
    -webkit-animation: mythird-data-v-3793f8b3 1s linear;
    animation: mythird-data-v-3793f8b3 1s linear;
    -webkit-animation-delay: 1.5s;
    animation-delay: 1.5s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
</style>
