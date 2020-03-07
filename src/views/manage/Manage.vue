<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="filter">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="name">
            <Input type="text" v-model="formInline.name" size="large" placeholder="企业名称"></Input>
          </FormItem>
          <FormItem prop="phone">
            <Input type="text" v-model="formInline.phone" size="large" placeholder="管理员手机"></Input>
          </FormItem>
          <FormItem style="float:right">
            <Button type="primary" size="large" class="btn-search" @click="searchFunc">查询</Button>
            <Button type="warning" size="large" class="btn-reset" @click="resetFunc">重置</Button>
          </FormItem>
        </Form>
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
      <Modal v-model="modal" width="440">
        <div slot="header">
          <p class="m-title">账号修改</p>
        </div>
        <div class="info">
          <div class="info-item">
            <div class="info-row">
              <label>企业名称：</label>
              <Input v-model="editValue.EnterpriseName" style="width: 300px" />
            </div>
            <div class="info-row">
              <label>管理员手机：</label>
              <Input v-model="editValue.Mobile" style="width: 300px" />
            </div>
          </div>
        </div>
        <div slot="footer">
          <div style="text-align:center;">
            <Button @click="modal=false">关闭</Button>
            <Button @click="edit">修改</Button>
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
        name: "",
        phone: ""
      },
      ids: [],
      ruleInline: {},
      loading: false,
      columns: [
        {
          title: "序号",
          key: "rowIndex",
          align: "center",
          width: 80
        },
        {
          title: "企业名称",
          key: "EnterpriseName",
          align: "center"
        },
        {
          title: "员工人数",
          key: "EmployeeCount",
          align: "center"
        },
        {
          title: "企业隔离床位数",
          key: "IsolatedBedCount",
          align: "center"
        },
        {
          title: "管理员手机",
          key: "Mobile",
          align: "center"
        },
        {
          title: "密码",
          key: "Password",
          align: "center",
          width: 150
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
                      this.showEdit(params);
                    }
                  }
                },
                "修改"
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
      editValue: {}
    };
  },
  components: {
    Header
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let vm = this;
      vm.loading = true;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseAccount",
            mobile: vm.formInline.phone,
            enterprisename: vm.formInline.name,
            pageIndex: vm.pageIndex,
            pageSize: 10
          }
        })
        .then(function(res) {
          vm.loading = false;
          vm.list = res.data.list;
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
    selectChange(selection) {
      this.ids = [];
      if (!selection.length) return;
      for (var i = 0; i < selection.length; i++) {
        this.ids.push(selection[i].ID);
      }
    },
    handleSuccess(res) {
      this.$Message.success({
        content: "上传成功！"
      });
    },
    handleError() {
      this.$Message.error({
        content: "上传失败，请联系管理员！",
        duration: 3
      });
    },
    showEdit(params) {
      var vm = this;
      vm.editValue = JSON.parse(JSON.stringify(params.row));
      // console.log(params.rows)
      this.modal = true;
    },
    edit() {
      var vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "ModifyEnterpriseInfo",
            mobile: vm.editValue.Mobile,
            enterpriseid: vm.editValue.EnterpriseID,
            enterprisename: vm.editValue.EnterpriseName
          }
        })
        .then(function(res) {
          if (res.data === 'success') {
            vm.$Message.success({
              content: "修改成功!"
            });
            vm.modal = false;
            vm.getList();
          } else {
            vm.$Message.error({
              content: "修改失败!"
            });
          }
        });
    },
    resetFunc() {
      this.$refs["formInline"].resetFields();
      this.getList();
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
      line-height: 32px;
      width: 90px;
    }
    span {
      flex: 1;
    }
  }
}
</style>