<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="filter">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <!-- <FormItem prop="company">
                        <div style="position:relative;" @mouseover="highlightText" @mouseout="normalText">
                            <Input type="text" v-model="formInline.company" size="large" @on-focus="highlightText" @on-blur="normalText" id="company">

                            </Input>
                            <span class="sp-company" :class="{'highlight-on':h_company}">所在企业</span>
                        </div>
          </FormItem>-->
          <FormItem prop="name">
            <Input
              type="text"
              v-model="formInline.name"
              size="large"
              placeholder="姓名"
              style="width:130px;"
            ></Input>
          </FormItem>
          <FormItem prop="id">
            <Input type="text" v-model="formInline.id" size="large" placeholder="身份证号"></Input>
          </FormItem>
          <FormItem prop="tel">
            <Input
              type="text"
              v-model="formInline.tel"
              size="large"
              placeholder="联系电话"
              style="width:130px;"
            ></Input>
          </FormItem>
          <FormItem prop="type">
            <Select
              v-model="formInline.type"
              size="large"
              placeholder="外防输入类型"
              style="width:150px;"
            >
              <Option value>全部</Option>
              <Option value="重点地区">重点地区</Option>
              <Option value="一般重点地区">一般重点地区</Option>
              <Option value="一般地区">一般地区</Option>
              <Option value="其他">其他</Option>
            </Select>
          </FormItem>
          <FormItem prop="heat">
            <Select v-model="formInline.heat" size="large" placeholder="体温" style="width:150px;">
              <Option value>全部</Option>
              <Option value="小于等于37.3">小于等于37.3</Option>
              <Option value="大于37.3">大于37.3</Option>
            </Select>
          </FormItem>
          <FormItem prop="date">
            <DatePicker
              type="daterange"
              size="large"
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="changeDate"
              style="width: 250px"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" class="btn-search" @click="searchFunc">查询</Button>
            <Button type="warning" size="large" class="btn-reset" @click="resetFunc">重置</Button>
          </FormItem>
        </Form>
      </div>
      <div class="controls">
        <!-- <div class="tabs clearfix">
                    <div :class="{'on':tab=='全部'}" @click="changeTab('全部')">全部</div>
                    <div :class="{'on':tab=='高危'}" @click="changeTab('高危')">高危</div>
                    <div :class="{'on':tab=='中危'}" @click="changeTab('中危')">中危</div>
                    <div :class="{'on':tab=='低危'}" @click="changeTab('低危')">低危</div>
        </div>-->
        <div class="data-handle">
          <a
            href="http://58.221.154.38:8099/模板.xls"
            download="模板.xls"
            class="export"
            @click="downloadTomplate"
          >下载模板</a>
          <Upload
            :action="uploadUrl"
            class="fl"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :show-upload-list="false"
            :data="params"
            :format="['xls','xlsx']"
          >
            <a href="javascript:void(0);" class="import">
              导入数据
              <span style="color:red">(请使用2003版本excel上传)</span>
            </a>
          </Upload>
        </div>
      </div>
      <div class="list">
        <Table
          :columns="columns"
          :data="list"
          @on-selection-change="selectChange"
          :loading="loading"
        ></Table>
        <div class="page">
          <Page :total="total" :page-size="pageSize" :current="pageIndex" @on-change="changePage" />
        </div>
      </div>
      <div class="copyright">2020&copy南通市测绘院有限公司</div>
      <Modal v-model="modal" width="840">
        <div slot="header">
          <p class="m-title">详细信息</p>
        </div>
        <div class="info">
          <div class="info-item">
            <div class="info-row">
              <label>姓名：</label>
              <span>{{info.Name}}</span>
            </div>
            <div class="info-row">
              <label>联系电话：</label>
              <span>{{info.Mobile}}</span>
            </div>
            <div class="info-row">
              <label>身份证号：</label>
              <span>{{info.IdCard}}</span>
            </div>
            <div class="info-row">
              <label>所在企业：</label>
              <span>{{info.EnterpriseName}}</span>
            </div>
            <div class="info-row">
              <label>年龄：</label>
              <span>{{info.Age}}</span>
            </div>
            <div class="info-row">
              <label>有无咳嗽等症状：</label>
              <span>{{info.Cough?"有":"无"}}</span>
            </div>
            <div class="info-row">
              <label>1月23日至今是否离开过南通：</label>
              <span>{{info.LeaveNT?"是":"否"}}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-row">
              <label>体温：</label>
              <span>{{info.Temp}}℃</span>
            </div>
            <div class="info-row">
              <label>返通前地址：</label>
              <span>{{info.BeforeReturnNtAddress}}</span>
            </div>
            <div class="info-row">
              <label>返通日期：</label>
              <span>{{info.ReturnNTDate}}</span>
            </div>
            <div class="info-row">
              <label>返通居住地：</label>
              <span>{{info.NtAddress}}</span>
            </div>
            <div class="info-row">
              <label>是否复工：</label>
              <span>{{info.RecoveryWork?"是":"否"}}</span>
            </div>
            <div class="info-row">
              <label>复工日期：</label>
              <span>{{info.RecoveryWorkDate||""}}</span>
            </div>
            <div class="info-row">
              <label>目前状态：</label>
              <span>{{info.CurrStatus}}</span>
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
import axios from "axios";
import { getURL } from "../../common/tool.js";
export default {
  name: "index",
  data() {
    return {
      formInline: {
        company: "",
        name: "",
        id: "",
        tel: "",
        type: "",
        heat: "",
        startDate: "",
        endDate: ""
      },
      uploadUrl: getURL("UploadHandler.ashx"),
      uploadUrlMJ: getURL("ImportCloseContact.ashx"),
      ids: [],
      ruleInline: {},
      h_company: false,
      tab: "全部",
      loading: false,
      columns: [
        {
          title: "序号",
          key: "rowIndex",
          align: "center",
          width: 80
        },
        {
          title: "姓名",
          key: "Name",
          align: "center",
          width: 100
        },
        {
          title: "身份证号",
          key: "IdCard",
          align: "center"
        },
        {
          title: "联系电话",
          key: "Mobile",
          align: "center"
        },
        {
          title: "所在企业",
          key: "EnterpriseName",
          align: "center"
        },
        {
          title: "体温",
          key: "Temp",
          align: "center",
          width: 150
        },
        {
          title: "上报时间",
          key: "PeriodPlaceTime",
          align: "center"
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
                    color: "#3282CE"
                  },
                  on: {
                    click: () => {
                      this.showDetails(params.row.ID);
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
      info: {},
      params: {
        enterpriseid: this.$route.query.id,
        enterprisename: this.$route.query.name,
        loginname: this.$route.query.loginname,
        password: this.$route.query.password
      }
    };
  },
  components: {
    Header
  },
  mounted() {
    this.getList();
  },
  methods: {
    highlightText() {
      this.h_company = true;
    },
    normalText() {
      if (
        $("#company")
          .find("input")
          .is(":focus")
      )
        return;
      this.h_company = false;
    },
    downloadTomplate() {},
    changeTab(tab) {
      this.tab = tab;
      this.searchFunc();
    },
    getList() {
      let type = "";
      let vm = this;
      switch (this.tab) {
        case "全部":
          type = "";
          break;
        case "高危":
          type = 0;
          break;
        case "中危":
          type = 1;
          break;
        case "低危":
          type = 2;
          break;
      }
      // if (!this.$route.query.name || !this.$route.query.id) {
      //   return;
      // }
      vm.loading = true;
      // let username = window.localStorage.getItem("username");
      // let password = window.localStorage.getItem("password");
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseData1",
            company: this.$route.query.name,
            name: this.formInline.name,
            idCard: this.formInline.id,
            phone: this.formInline.tel,
            inputType: this.formInline.type,
            temp: this.formInline.heat,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            type: type,
            startdate: this.formInline.startDate,
            enddate: this.formInline.endDate
            // loginname: username,
            // password: password
          }
        })
        .then(function(res) {
          vm.loading = false;
          vm.list = res.data.list || [];
          vm.total = res.data.recordCount;
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
    showDetails(id) {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseDetail",
            id: id
          }
        })
        .then(function(res) {
          console.log(res.data);
          vm.info = res.data[0];
          vm.modal = true;
        });
    },
    selectChange(selection) {
      this.ids = [];
      if (!selection.length) return;
      for (var i = 0; i < selection.length; i++) {
        this.ids.push(selection[i].ID);
      }
    },
    changeDate(date) {
      this.formInline.startDate = date[0];
      this.formInline.endDate = date[1];
    },
    exportData() {
      // if(!this.ids.length){
      //     this.$Message.error("请选择要导出的项！");
      //     return false;
      // }
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "ExportQueryData",
            company: this.formInline.company,
            name: this.formInline.name,
            idCard: this.formInline.id,
            phone: this.formInline.tel,
            inputType: this.formInline.type,
            temp: this.formInline.heat,
            startdate: this.formInline.startDate,
            enddate: this.formInline.endDate
          }
        })
        .then(function(res) {
          window.location.href = getURL(res.data);
          console.log(res);
        });
    },
    handleSuccess(res) {
      console.log(res);
      if (res.result === "failure") {
        this.$Message.error({
          content: res.message
        });
      } else {
        this.$Message.success({
          content: "上传成功！"
        });
      }
    },
    handleError(res) {
      this.$Message.error({
        content: "上传失败，请联系管理员！",
        duration: 3
      });
    },
    handleFormatError(res) {
      this.$Message.error({
        content: "格式错误，请上传.xls或者.xlsx文件！",
        duration: 3
      });
    },
    resetFunc() {
      this.$refs["formInline"].resetFields();
    }
  }
};
</script>

<style lang="less">
.container {
  height: 100%;
  .main {
    height: calc(~"100% - 60px");
    display: flex;
    flex-direction: column;
  }
  .filter {
    padding: 10px 40px;
    border-bottom: 1px solid #e2e9f1;
    .ivu-form-item {
      margin-bottom: 0;
    }
  }
  .sp-company {
    background-color: #fff;
    position: absolute;
    left: 30px;
    padding: 0 10px;
    top: -5px;
    font-size: 10px;
    line-height: 1;
    color: #ccd4df;
  }
  .sp-company.highlight-on {
    color: #57a3f3;
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
      color: #3282ce;
      margin-right: 20px;
      padding-left: 20px;
    }
    a.export {
      background: url(../../assets/images/up.png) 0 center no-repeat;
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
      background-color: #3282ce;
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
    background: #e2e9f1 url(../../assets/images/ch.png) left bottom no-repeat;
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
</style>