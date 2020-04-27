<template>
  <div class="container">
    <Spin fix size="large" v-show="isShowLoading"></Spin>
    <Header :userName="userName"></Header>
    <div class="main">
      <div class="filter">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem v-if="isSuperAdmin" prop="school">
            <Select
              v-model="formInline.school"
              size="large"
              placeholder="学校"
              @on-change="choseSchool"
              style="width:250px;"
            >
              <Option value="全部">全部</Option>
              <Option
                v-for="(item,index) in schoolList"
                :key="index"
                :value="item.enterpriseName"
              >{{item.enterpriseName}}</Option>
            </Select>
          </FormItem>
          <FormItem prop="school" v-else>
            <div style="position:relative;" @mouseover="highlightText" @mouseout="normalText">
              <Input
                type="text"
                v-model="formInline.school"
                size="large"
                @on-focus="highlightText"
                @on-blur="normalText"
                id="school"
                disabled
                style="width:250px;"
              />
              <span class="sp-school" :class="{'highlight-on':h_school}">学校名字</span>
            </div>
          </FormItem>
          <FormItem prop="class">
            <Select
              v-model="formInline.class"
              size="large"
              placeholder="班级"
              style="width:150px;"
              :disabled="isDisabledClass"
              @on-change="classChange"
            >
              <Option value="全部">全部</Option>
              <Option
                v-for="(item,index) in classList"
                :key="index"
                :value="item.enterpriseName"
              >{{item.enterpriseName}}</Option>
            </Select>
          </FormItem>
          <FormItem prop="name">
            <Input
              type="text"
              v-model="formInline.name"
              size="large"
              placeholder="姓名"
              style="width:130px;"
            />
          </FormItem>
          <!-- <FormItem prop="id">
            <Input type="text" v-model="formInline.id" size="large" placeholder="身份证号"></Input>
          </FormItem>-->
          <FormItem prop="tel">
            <Input
              type="text"
              v-model="formInline.tel"
              size="large"
              placeholder="联系电话"
              style="width:130px;"
            />
          </FormItem>
          <FormItem prop="heat">
            <Select v-model="formInline.heat" size="large" placeholder="体温段查询" style="width:120px;">
              <Option value>全部</Option>
              <Option value="0">小于37.3</Option>
              <Option value="1">大于等于37.3</Option>
            </Select>
          </FormItem>
          <FormItem prop="discomfort">
            <Select
              v-model="formInline.discomfort"
              size="large"
              placeholder="是否不适"
              style="width:150px;"
            >
              <Option value>全部</Option>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>
          </FormItem>
          <FormItem prop="isInNanTong">
            <Select
              v-model="formInline.isInNanTong"
              size="large"
              placeholder="当前是否在南通"
              style="width:150px;"
            >
              <Option value>全部</Option>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>
          </FormItem>
          <FormItem prop="punchStatus">
            <Select
              v-model="formInline.punchStatus"
              size="large"
              placeholder="打卡状态"
              style="width:150px;"
            >
              <Option value="3">全部</Option>
              <Option value="4">未审核</Option>
              <Option value="5">已审核</Option>
              <Option value="6">异常</Option>
              <Option value="0">未打卡</Option>
              <Option value="1">已打卡</Option>
            </Select>
          </FormItem>
          <FormItem prop="date">
            <DatePicker
              type="date"
              size="large"
              v-model="formInline.date"
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="changeDate"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="status">
            <Select
              v-model="formInline.status"
              size="large"
              placeholder="当前状态"
              style="width:150px;"
            >
              <Option value>全部</Option>
              <Option value="正常">正常</Option>
              <Option value="隔离中">隔离中</Option>
              <Option value="发热门诊留观">发热门诊留观</Option>
              <Option value="定点医院就诊">定点医院就诊</Option>
              <Option value="其他">其他</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" class="btn-search" @click="searchFunc">查询</Button>
          </FormItem>
        </Form>
      </div>
      <div class="controls">
        <div class="data-handle">
          <a href="javascript:void(0);" class="export" @click="exportData">导出筛选</a>
          <a href="javascript:void(0);" class="export" @click="exportInformation">导出异常</a>
          <a href="javascript:void(0);" class="export" @click="exportSummary">导出汇总</a>
          <a href="javascript:void(0);" class="export" @click="exportNew">导出最新</a>
          <a
            href="javascript:void(0);"
            class="export"
            @click="exportMiss"
            v-if="isShowExportMiss"
          >导出缺课</a>
        </div>
      </div>
      <div class="list">
        <Table :columns="columns" :data="list" :loading="loading"></Table>
        <div class="page">
          <Page :total="total" :page-size="pageSize" :current="pageIndex" @on-change="changePage" />
        </div>
      </div>
      <div class="copyright">2020{{"&"}}copy南通市测绘院有限公司</div>
      <Modal v-model="modal" width="840">
        <div slot="header" :style="'display:flex;'">
          <div class="detail-logo"></div>
          <p class="m-title">详细信息</p>
        </div>
        <div class="info">
          <div class="info-item">
            <div class="info-row">
              <label>姓名：</label>
              <span>{{info.name}}</span>
            </div>
            <div class="info-row">
              <label>联系电话：</label>
              <span>{{info.sysUserID}}</span>
            </div>
            <div class="info-row">
              <label>身份证号：</label>
              <span>{{info.idCard}}</span>
            </div>
            <div class="info-row">
              <label>性别：</label>
              <span>{{info.sex}}</span>
            </div>
            <div class="info-row">
              <label>学校：</label>
              <span>{{info.parentEnterpriseName}}</span>
            </div>
            <div class="info-row">
              <label>班级：</label>
              <span>{{info.enterpriseName}}</span>
            </div>
            <div class="info-row">
              <label>现居住地：</label>
              <span>{{ info.currCounty + info.currStreet + info.currCommunity + info.currAddress }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-row">
              <label>体温：</label>
              <span>{{info.temp}}℃</span>
            </div>
            <div class="info-row">
              <label>有无咳嗽等症状：</label>
              <span>{{info.cough?'是':'否'}}</span>
            </div>
            <div class="info-row">
              <label>3月10日至今是否离开过南通：</label>
              <span>{{info.leaveNT?'是':'否'}}</span>
            </div>
            <div class="info-row">
              <label>在外地址：</label>
              <span>{{(info.beforeReturnNtProvince + info.beforeReturnNtCity + info.beforeReturnNtCounty + info.beforeReturnNtAddress)|| info.overseasAddress }}</span>
            </div>
            <div class="info-row">
              <label>返通日期：</label>
              <span>{{info.returnNTDate}}</span>
            </div>
            <div class="info-row">
              <label>目前状态：</label>
              <span>{{info.currStatus}}</span>
            </div>
            <div class="info-row">
              <label>开始隔离日期：</label>
              <span>{{info.isolationStartDate}}</span>
            </div>
          </div>
        </div>
        <div slot="footer">
          <div style="text-align:center;">
            <Button @click="modal=false">关闭</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import $ from "jquery";
import { getURL, debounce, Todate } from "../../common/tool.js";
import {
  getPermissionEnterprises,
  getEnterprisePeriodPlaceList,
  exportEnterprisePeriodPlaceList,
  exportEnterpriseGroupList,
  exportEnterpriseBaseList,
  exportEnterprisePeriodPlaceListlast,
  exportAbsentTotal
} from "@/api/manage.js";
export default {
  name: "index",
  data() {
    return {
      isShowExportMiss: false,
      isDisabledClass: false,
      isShowLoading: false,
      isSuperAdmin: false,
      userName: "",
      formInline: {
        school: "全部",
        class: "全部",
        name: "",
        id: "",
        tel: "",
        heat: "",
        discomfort: "",
        isInNanTong: "",
        date: new Date(),
        status: "",
        parentEnterpriseID: "",
        enterpriseID: "",
        punchStatus: "3"
      },
      schoolList: [],
      classList: [],
      allClass: [],
      loading: false,
      ids: [],
      ruleInline: {},
      h_school: false,
      columns: [
        // {
        //   title: "序号",
        //   key: "id",
        //   align: "center",
        //   width: 80
        // },
        {
          title: "姓名",
          key: "name",
          align: "center",
          width: 100
        },
        {
          title: "身份证号",
          key: "idCard",
          align: "center"
        },
        {
          title: "联系电话",
          key: "sysUserID",
          align: "center"
        },
        {
          title: "学校",
          key: "parentEnterpriseName",
          align: "center"
        },
        {
          title: "班级",
          key: "enterpriseName",
          align: "center"
        },
        {
          title: "体温",
          key: "temp",
          align: "center",
          width: 150
        },
        {
          title: "是否不适",
          key: "cough",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("div", {}, params.row.cough == true ? "是" : "否")
            ]);
          }
        },
        {
          title: "操作",
          key: "ID",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  style: {
                    color: "#16d0a0"
                  },
                  on: {
                    click: () => {
                      this.showDetails(params);
                    }
                  }
                },
                "详细"
              )
            ]);
          }
        }
      ],
      list: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      modal: false,
      info: {}
    };
  },
  components: {
    Header
  },
  created() {
    let vm = this;
    // 获取学校跟班级
    vm.getPermissionEnterprises();
    document.getElementsByTagName("title")[0].innerText =
      "南通开发区教育健康在线后台管理系统";
    if (vm.$route.query.level === "Root") {
      vm.isShowExportMiss = true;
    } else {
      vm.isShowExportMiss = false;
    }
    let userID = window.localStorage.getItem("userID");
    if (!userID) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  mounted() {},
  methods: {
    getPermissionEnterprises() {
      let vm = this;
      vm.isShowLoading = true;
      getPermissionEnterprises({
        enterpriseID: vm.$route.query.enterpriseID
      }).then(resp => {
        vm.isShowLoading = false;
        if (vm.$route.query.level === "Root") {
          vm.isSuperAdmin = true;
          vm.userName = "KFQSHSYJ";
          vm.schoolList = resp.data.data.groupPermissionList;
          vm.allClass = resp.data.data.basePermissionList;
          vm.getList();
        } else if (vm.$route.query.level === "Group") {
          vm.userName = window.localStorage.getItem("userID");
          vm.isSuperAdmin = false;
          vm.classList = resp.data.data.basePermissionList;
          vm.formInline.school =
            resp.data.data.groupPermissionList[0].enterpriseName;
          vm.formInline.parentEnterpriseID =
            resp.data.data.groupPermissionList[0].enterpriseID;
          vm.formInline.class =
            resp.data.data.basePermissionList[0].enterpriseName;
          vm.formInline.enterpriseID = vm.classList[0].enterpriseID;
          vm.getList();
        } else {
          vm.isDisabledClass = true;
          vm.userName = window.localStorage.getItem("userID");
          vm.isSuperAdmin = false;
          vm.classList = resp.data.data.basePermissionList;
          vm.formInline.school =
            resp.data.data.groupPermissionList[0].enterpriseName;
          vm.formInline.parentEnterpriseID =
            resp.data.data.groupPermissionList[0].enterpriseID;
          vm.formInline.class =
            resp.data.data.basePermissionList[0].enterpriseName;
          vm.formInline.enterpriseID = vm.classList[0].enterpriseID;
          vm.getList();
        }
      });
    },
    choseSchool(item) {
      if (item === "全部") {
        this.formInline.parentEnterpriseID = "";
        this.formInline.enterpriseID = "";
        this.formInline.school = "全部";
        this.formInline.class = "全部";
        return;
      }
      let chosedSchool = this.schoolList.filter(v => v.enterpriseName === item);
      this.formInline.parentEnterpriseID = chosedSchool[0].enterpriseID;
      this.classList = this.allClass.filter(item => {
        return item.parentEnterpriseID == chosedSchool[0].enterpriseID;
      });
      this.formInline.class = this.classList[0].enterpriseName;
      this.formInline.enterpriseID = this.classList[0].enterpriseID;
    },
    classChange(item) {
      if (item === "全部") {
        this.formInline.class = "全部";
        this.formInline.enterpriseID = "";
        return;
      }
      let chosedClass = this.classList.filter(v => v.enterpriseName === item);
      this.formInline.enterpriseID = chosedClass[0].enterpriseID;
    },
    highlightText() {
      this.h_school = true;
    },
    normalText() {
      if (
        $("#school")
          .find("input")
          .is(":focus")
      )
        return;
      this.h_school = false;
    },
    getList() {
      var vm = this;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      let params = {
        enterpriseID: vm.formInline.enterpriseID, //班级编号
        parentEnterpriseID: vm.formInline.parentEnterpriseID, //学校编号
        periodPlaceDate: Todate(vm.formInline.date), //打卡日期
        status: vm.formInline.punchStatus, //状态，3:全部，4:未审核，5已审核，6:异常，0:未打卡，1:已打卡
        name: vm.formInline.name, //姓名
        mobile: vm.formInline.tel, //手机号
        // idCard: vm.formInline.id, //身份证号码
        inNT: vm.formInline.isInNanTong,
        tempFlag: vm.formInline.heat, //体温范围，1:大于等于37.3,0:小于37.3
        cough: vm.formInline.discomfort, //是否不适，true,false
        currStatus: vm.formInline.status, //当前状态，正常、隔离中、发热门诊留观、定点医院就诊、其他
        page: vm.pageIndex,
        pageSize: vm.pageSize,
        userAdminID: userID,
        password: password
      };
      this.loading = true;
      getEnterprisePeriodPlaceList(params).then(resp => {
        this.loading = false;
        vm.list = resp.data.data || [];
        vm.total = resp.data.page.totalCount;
      });
    },
    changePage(pageIndex) {
      this.pageIndex = pageIndex;
      this.getList();
    },
    searchFunc: function() {
      this.pageIndex = 1;
      this.getList();
    },
    showDetails(params) {
      let vm = this;
      vm.info = params.row;
      vm.modal = true;
    },
    changeDate(date) {
      console.log(date);
    },
    exportData() {
      var vm = this;
      let params;
      vm.isShowLoading = true;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      params = {
        enterpriseID: vm.formInline.enterpriseID, //班级编号
        parentEnterpriseID: vm.formInline.parentEnterpriseID, //学校编号
        periodPlaceDate: Todate(vm.formInline.date), //打卡日期
        status: vm.formInline.punchStatus, //状态，3:全部，4:未审核，5已审核，6:异常，0:未打卡，1:已打卡
        name: vm.formInline.name, //姓名
        mobile: vm.formInline.tel, //手机号
        // idCard: vm.formInline.id, //身份证号码
        inNT: vm.formInline.isInNanTong,
        tempFlag: vm.formInline.heat, //体温范围，1:大于等于37.3,0:小于37.3
        cough: vm.formInline.discomfort, //是否不适，true,false
        currStatus: vm.formInline.status, //当前状态，正常、隔离中、发热门诊留观、定点医院就诊、其他
        userAdminID: userID,
        password: password
      };
      exportEnterprisePeriodPlaceList(params).then(resp => {
        vm.isShowLoading = false;
        if (resp.data.success) {
          window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
        }
      });
    },
    //导出异常信息
    exportInformation() {
      var vm = this;
      vm.isShowLoading = true;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      let params;
      if (vm.$route.query.level === "Root") {
        params = {
          periodPlaceDate: Todate(vm.formInline.date), //打卡日期
          status: "6", //状态，3:全部，4:未审核，5已审核，6:异常，0:未打卡，1:已打卡
          userAdminID: userID,
          password: password
        };
      } else {
        params = {
          parentEnterpriseID: vm.$route.query.enterpriseID,
          periodPlaceDate: Todate(vm.formInline.date), //打卡日期
          status: "6", //状态，3:全部，4:未审核，5已审核，6:异常，0:未打卡，1:已打卡
          userAdminID: userID,
          password: password
        };
      }
      exportEnterprisePeriodPlaceList(params).then(resp => {
        vm.isShowLoading = false;
        if (resp.data.success) {
          window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
        }
      });
    },
    // 导出汇总
    exportSummary() {
      let vm = this;
      vm.isShowLoading = true;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      if (vm.$route.query.level === "Root") {
        exportEnterpriseGroupList({
          enterpriseID: vm.$route.query.enterpriseID,
          periodPlaceDate: Todate(vm.formInline.date),
          userAdminID: userID,
          password: password
        }).then(resp => {
          vm.isShowLoading = false;
          if (resp.data.success) {
            window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
          }
        });
      } else {
        exportEnterpriseBaseList({
          enterpriseID: vm.$route.query.enterpriseID,
          periodPlaceDate: Todate(vm.formInline.date),
          userAdminID: userID,
          password: password
        }).then(resp => {
          vm.isShowLoading = false;
          if (resp.data.success) {
            window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
          }
        });
      }
    },
    // 导出最新
    exportNew() {
      let vm = this;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      vm.isShowLoading = true;
      exportEnterprisePeriodPlaceListlast({
        enterpriseID: vm.$route.query.enterpriseID,
        status: "1",
        userAdminID: userID,
        password: password
      }).then(resp => {
        vm.isShowLoading = false;
        if (resp.data.success) {
          window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
        }
      });
    },
    exportMiss() {
      let vm = this;
      vm.isShowLoading = true;
      let userID = window.localStorage.getItem("userID");
      let password = window.localStorage.getItem("password");
      exportAbsentTotal({
        enterpriseID: vm.$route.query.enterpriseID,
        absentDate: Todate(vm.formInline.date),
        userAdminID: userID,
        password: password
      }).then(resp => {
        vm.isShowLoading = false;
        if (resp.data.success) {
          window.location.href = `https://yqfk.ntkfqjy.com:20000${resp.data.data}`;
        }
      });
    },
    resetFunc() {
      this.$refs["formInline"].resetFields();
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .main {
    padding-top: 60px;
    // height: calc(~"100% - 60px");
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .filter {
    padding: 10px 40px;
    border-bottom: 1px solid #e2e9f1;
    position: relative;
    .ivu-form-item {
      margin-bottom: 0;
    }
    .search-list {
      width: 300px;
      height: 250px;
      background-color: #fff;
      border: 1px solid rgb(226, 223, 223);
      position: absolute;
      left: 40px;
      top: 50px;
      z-index: 999;
      border-radius: 3px;
      overflow-y: auto;
      .item {
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
      }
    }
  }
  .sp-school {
    background-color: #fff;
    position: absolute;
    left: 30px;
    padding: 0 10px;
    top: -5px;
    font-size: 10px;
    line-height: 1;
    color: #ccd4df;
  }
  .sp-school.highlight-on {
    color: #16d0a0;
  }
  .controls {
    height: 36px;
    position: relative;
  }
  .data-handle {
    position: absolute;
    right: 40px;
    top: 0;
    height: 36px;
    a {
      float: left;
      display: block;
      height: 35px;
      line-height: 36px;
      color: #16d0a0;
      margin-right: 20px;
      padding-left: 20px;
    }
    a.export {
      background: url(../../assets/images/up1.png) 0 center no-repeat;
      background-size: 15px 15px;
      padding-right: 20px;
      position: relative;
    }
    a.import,
    a.export-new {
      background: url(../../assets/images/down.png) 0 center no-repeat;
    }
    a.export:after {
      content: "";
      width: 1px;
      height: 12px;
      background-color: #16d0a0;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -6px;
    }
  }
  .tabs {
    padding: 0 40px 0 64px;
    div {
      float: left;
      height: 100%;
      line-height: 36px;
      font-size: 14px;
      padding: 0 10px;
      letter-spacing: 3px;
      margin-right: 20px;
      color: #2d3748;
      cursor: pointer;
    }
    div.on {
      position: relative;
      color: #3282ce;
      background-color: rgba(50, 130, 206, 0.3);
    }
    div.on:after {
      height: 4px;
      background-color: #3282ce;
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 100%;
    }
  }
  .list {
    flex: 1;
    // background: #e2e9f1 url(../../assets/images/ch.png) left bottom no-repeat;
    background: #e2f1ea;
    -webkit-background-size: 100%;
    background-size: 100%;
    padding: 10px 40px 40px;
    position: relative;
  }
  .copyright {
    position: absolute;
    height: 40px;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    color: #728096;
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
  .btn-search {
    width: 100px;
    background-color: #3282ce;
  }
  .btn-reset {
    width: 100px;
    margin-left: 20px;
  }
  .ivu-table {
    background-color: transparent;
    th {
      background-color: #fff;
    }
    .ivu-table-body table {
      border-collapse: separate;
      border-spacing: 0px 5px;
    }
  }

  .m-title {
    padding-left: 20px;
    background: url(../../assets/images/text.png) left center no-repeat;
  }
}
.info {
  display: flex;
  .info-item {
    flex: 1;
    padding: 0 20px;
    flex-direction: column;
    .info-row {
      margin-bottom: 20px;
      display: flex;
    }
    label {
      color: #aaaaaa;
      font-size: 14px;
      display: block;
    }
    span {
      flex: 1;
    }
  }
}
.detail-logo {
  width: 16px;
  height: 16px;
  background: url("../../assets/images/detail-logo.png") no-repeat;
  background-size: 100% 100%;
  float: left;
  transform: translateY(2px);
  margin-right: 8px;
}
</style>