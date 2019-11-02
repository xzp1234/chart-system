<template>
  <div id="app">
    <el-scrollbar style="height: 100%">
        <el-container class="app-container">
          <el-header class="header-container">
              <c-header></c-header>
          </el-header>
          <el-main class="main-container"><router-view></router-view></el-main>
          <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
import cHeader from './components/Header';
export default {
  name: 'App',
  components: {
    cHeader
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
.header-container {
  width: 100%;
  background: #000000;
}
.main-container {
  padding: 0;
}
</style>
