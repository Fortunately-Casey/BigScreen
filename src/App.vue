<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  min-width: 1680px;
}
/*滚动条样式 */
::-webkit-scrollbar-track-piece {
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  -webkit-border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #878987;
  -webkit-border-radius: 6px;
}
.ivu-input:hover {
  border-color: #16d0a0 !important;
}
.ivu-input:focus {
  border-color: #16d0a0 !important;
}
.ivu-select-selection-focused,
.ivu-select-selection:hover {
  border-color: #16d0a0 !important;
}
.ivu-page-item-active {
  background-color: #16d0a0 !important;
  border-color: #16d0a0 !important;
  a {
    color: #fff !important;
  }
}
.ivu-page-item:hover {
  border-color: #16d0a0 !important;
  a {
    color: #16d0a0 !important;
  }
}
.ivu-btn-primary {
  background-color: #16d0a0 !important;
  border-color: #16d0a0 !important;
}
.ivu-btn-default:hover {
  border-color: #16d0a0 !important;
  span {
    color: #16d0a0 !important;
  }
}
.ivu-form-item {
  margin-top: 10px;
}
</style>
