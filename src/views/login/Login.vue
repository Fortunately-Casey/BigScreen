<template>
  <div class="login">
    <Spin fix size="large" v-show="isShowLoading"></Spin>
    <div class="left">
      <div class="circle-top"></div>
      <div class="circle-left"></div>
      <div class="circle-bottom"></div>
      <div class="title">
        <div class="logo"></div>
        <div class="text"></div>
      </div>
      <div class="login-box">
        <div class="user">
          <div class="name">用户名：</div>
          <input type="text" v-model="userID" />
        </div>
        <div class="password">
          <div class="name">密码：</div>
          <input type="password" v-model="password" />
        </div>
        <div class="login-button" @click="login">登录</div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script>
import { login } from "@/api/manage.js";
export default {
  data() {
    return {
      userID: "",
      password: "",
      isShowLoading:false
    };
  },
  created() {
    let userID = window.localStorage.getItem("userID");
    let password = window.localStorage.getItem("password");
    if(userID) {
      this.userID = userID;
      this.password = password;
    }
  },
  methods: {
    login() {
      let vm = this;
      vm.isShowLoading = true;
      login({
        userID: vm.userID,
        password: vm.password
      }).then(resp => {
        vm.isShowLoading = false;
        if(resp.data.success) {
          vm.$Message.success("登录成功!");
          window.localStorage.setItem("userID",vm.userID);
          window.localStorage.setItem("password",vm.password);
          vm.$router.push({
            path:"/index",
            query:{
              enterpriseID:resp.data.data.enterprise.enterpriseID,
              level:resp.data.data.enterprise.level
            }
          })
        }else {
          vm.$Message.error(resp.data.data);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  min-width: 1650px;
  display: flex;
  .left {
    flex: 1;
    position: relative;
    .title {
      width: 484px;
      height: 50px;
      margin: 0 auto;
      margin-top: 350px;
      display: flex;
      align-items: center;
      .logo {
        width: 44px;
        height: 38px;
        background: url("../../assets/images/school-logo.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 10px;
      }
      .text {
        width: 422px;
        height: 23px;
        background: url("../../assets/images/title-text.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .login-box {
      width: 280px;
      height: 200px;
      margin: 0 auto;
      margin-top: 50px;
      .user,
      .password {
        height: 40px;
        margin-top: 15px;
        display: flex;
        .name {
          height: 40px;
          line-height: 40px;
          width: 60px;
          color: #a0aec0;
        }
        input {
          border-radius: 5px;
          width: 200px;
          height: 40px;
          border: none;
          background-color: #edf2f7;
          padding-left: 10px;
          color: #a0aec0;
        }
        input[type="text"]:focus {
          outline: none;
        }
        input[type="password"]:focus {
          outline: none;
        }
      }
      .login-button {
        border-radius: 5px;
        width: 265px;
        height: 40px;
        background-color: #16d0a0;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-top: 40px;
        letter-spacing: 18px;
        text-indent: 15px;
        cursor: pointer;
      }
    }
    .circle-top {
      width: 300px;
      height: 337px;
      background: url("../../assets/images/login-top-circle.png") no-repeat;
      background-size: cover;
      position: absolute;
      right: 0;
      top: 0;
    }
    .circle-left {
      width: 192px;
      height: 253px;
      background: url("../../assets/images/login-left-circle.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      bottom: 150px;
    }
    .circle-bottom {
      width: 135px;
      height: 135px;
      background: url("../../assets/images/login-bottom-circle.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 100px;
      bottom: 100px;
    }
  }
  .right {
    width: 900px;
    background: url("../../assets/images/login-bg.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>