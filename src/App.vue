<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import 'assets/css/common.css';

  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html body{
    margin: 0;
    padding: 0;
    width:100%;
    height: 100%;
  }
</style>
