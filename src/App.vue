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
