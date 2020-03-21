<template>
  <div class="header">
    南通开发区健康在线后台管理系统
    <div class="user">
      <div class="name">{{userName}}</div>
      <div class="logo"></div>
      <div class="drop-down" @click="isShowLogout = !isShowLogout"></div>
      <div class="logout" v-if="isShowLogout" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props:["userName"],
  data() {
    return {
      isShowLogout: false
    };
  },
  methods:{
      logout() {
          this.$router.push({
              path:"/login"
          })
      }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  width: 100%;
  border-bottom: 1px solid #e2e9f1;
  padding-left: 90px;
  background: url(../assets/images/school-logo.png) 40px center no-repeat;
  background-size: 40px 40px;
  font-size: 20px;
  position: fixed;
  z-index: 999;
  .user {
    width: 180px;
    height: 40px;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    .name {
      width: 90px;
      height: 40px;
      font-size: 12px;
    }
    .logo {
      width: 40px;
      height: 40px;
      background: url("../assets/images/user-logo.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
    }
    .drop-down {
      width: 20px;
      height: 40px;
      background: url("../assets/images/drop-down.png") no-repeat;
      background-size: 12px 7px;
      background-position: center center;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    .logout {
      width: 100px;
      height: 40px;
      line-height: 40px;
      transition: all 1s;
      text-align: center;
      position: absolute;
      z-index: 999;
      bottom: -49px;
      right: 0px;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #e2e9f1;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>