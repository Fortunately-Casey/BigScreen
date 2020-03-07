<template>
  <div class="bigscreen">
    <div class="top">
      <p>南通开发区新冠肺炎疫情防控综合平台</p>
    </div>
    <div class="main">
      <div class="left-part">
        <h3>企业防疫概况</h3>
        <div class="gk">
          <h4>企业填报概况</h4>
          <div class="btn">
            <a href="javascript:void(0);" class="btn1">填报企业数（{{company.number}}）</a>
            <a href="javascript:void(0);" class="btn2">填报人员数（{{company.peopleNumber}}）</a>
          </div>
        </div>
        <div class="gk">
          <h4>防控措施（人数）</h4>
          <div class="btn">
            <a href="javascript:void(0);" class="btn3">集中隔离人数（{{monitor.IsolationPoint}}）</a>
            <a href="javascript:void(0);" class="btn4">企业隔离人数（{{monitor.EnterprisePoint}}）</a>
          </div>
        </div>
        <div class="gk">
          <h4>疫情监控</h4>
          <div class="btn">
            <a href="javascript:void(0);" class="btn6">病例人数（{{monitor.PatientNumber}}）</a>
            <a href="javascript:void(0);" class="btn8">定点医院（{{monitor.AdmittedHospital}}）</a>
            <a href="javascript:void(0);" class="btn7">密接人数（{{monitor.CloseContactNumber}}）</a>
            <a href="javascript:void(0);" class="btn5">发热门诊（{{monitor.FeverClinics}}）</a>
          </div>
        </div>
        <div class="sub-mid" style="flex: 1;display: flex;flex-direction: column;">
          <div class="sub-title pie-bg mb15">
            <p>申报人员分类</p>
          </div>
          <div class="pie-chart" id="pie-chart" style="height:90%"></div>
        </div>
        <div class="left-foot">
          <div class="sub-title col-bg mb15">
            <p>企业填报动态</p>
          </div>
          <div class="list-wrap">
            <div class="list-flex">
              <div id="col-chart1"></div>
            </div>
            <div class="list-flex">
              <div id="col-chart2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="mid-part">
        <div class="mid-part-top">
          <div class="mid-tt">
            <p>截止{{date}}开发区企业复工统计数据</p>
            <span class="time">{{time}}</span>
          </div>
          <div class="mid-data">
            <div class="mid-data-item">
              <div class="mid-data-c1">较昨日 +{{stat.JZRQYFGS || 0}}</div>
              <div class="mid-data-c2">{{stat.QYFGS || 0}}</div>
              <div class="mid-data-c3">
                复工企业数
                <br />
                <!-- <span>复工率：{{stat.FGL || '0%'}}</span> -->
              </div>
            </div>
            <div class="mid-data-item">
              <div class="mid-data-c1">较昨日 +{{stat.JZRFGRS || 0}}</div>
              <div class="mid-data-c2">{{stat.FGRS || 0}}</div>
              <div class="mid-data-c3">
                复工人数
                <br />
                <!-- <span>在岗率：{{stat.ZGL || 0}}</span> -->
              </div>
            </div>
            <div class="mid-data-item">
              <div class="mid-data-c1">较昨日 {{stat.JZRWFTRS || 0}}</div>
              <div class="mid-data-c2">{{stat.WFTRS || 0}}</div>
              <div class="mid-data-c3">未返通人数</div>
            </div>
            <div class="mid-data-item">
              <div class="mid-data-c1">较昨日 +{{stat.JZRGLRS || 0}}</div>
              <div class="mid-data-c2">{{stat.GLRS || 0}}</div>
              <div class="mid-data-c3">隔离人数</div>
            </div>
            <div class="mid-data-item">
              <div class="mid-data-c1">较昨日 +{{stat.JZRYCZZRS || 0}}</div>
              <div class="mid-data-c2">{{stat.YCZZRS || 0}}</div>
              <div class="mid-data-c3">异常转诊</div>
            </div>
          </div>
        </div>
        <div class="mid-part-bottom">
          <div class="map" id="map"></div>
        </div>
      </div>
      <div class="right-part">
        <h3>员工健康申报信息统计</h3>
        <div class="sub-mid">
          <div class="sub-title col-bg mb15">
            <p>企业人员动态</p>
          </div>
          <div class="col-chart" id="line-chart" style="height:80%"></div>
        </div>
        <div class="sub-mid">
          <div class="sub-title col-bg mb15">
            <p>隔离观察信息</p>
          </div>
          <div class="col-chart" id="col-chart3" style="height:80%"></div>
        </div>
        <div class="sub-mid">
          <div class="sub-title col-bg mb15">
            <p>隔离期人员统计</p>
          </div>
          <div class="col-chart" id="col-chart4" style="height:80%"></div>
        </div>
        <div class="right-foot">
          <div class="sub-title list-bg mb15">
            <p>异常预警</p>
          </div>
          <div class="list-row list-row-head">
            <div class="list-item-one">序号</div>
            <div class="list-item" >企业名称</div>
            <div class="list-item-three">发热</div>
            <div class="list-item-four">不适症状</div>
            <div class="list-item-three">留观</div>
            <div class="list-item-three">就诊</div>
          </div>
          <div class="list-panel">
            <div class="loading" v-if="isLoading">
              <Spin size="large"></Spin>
            </div>
            <div
              class="list-row"
              v-for="(item,index) in cwxx"
              @click="showDetail(item.EnterpriseID)"
            >
              <div class="list-item-one">{{index + 1}}</div>
              <div class="list-item" :title="item.EnterpriseName"> {{item.EnterpriseName}}</div>
              <div class="list-item-three"> {{item.TempCount}}</div>
              <div class="list-item-four"> {{item.CoughCount}}</div>
              <div class="list-item-three"> {{item.ObserveCount}}</div>
              <div class="list-item-three"> {{item.SeekCount}}</div>
            </div>
          </div>
          <!-- <div class="list-row">
                         <div class="list-item-one">1</div>
                         <div class="list-item">南通市祥和商务贸易有限公司</div>
                         <div class="list-item-three">23</div>
                     </div>
                     <div class="list-row">
                         <div class="list-item-one">2</div>
                         <div class="list-item">南通市祥和商务贸易有限公司</div>
                         <div class="list-item-three">23</div>
                     </div>
                     <div class="list-row">
                         <div class="list-item-one">3</div>
                         <div class="list-item">南通市祥和商务贸易有限公司</div>
                         <div class="list-item-three">23</div>
                     </div>
                     <div class="list-row">
                         <div class="list-item-one">4</div>
                         <div class="list-item">南通市祥和商务贸易有限公司</div>
                         <div class="list-item-three">23</div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="copyright">
      <span style="margin-right:40px;">数据来源：南通市疾病预防控制中心开发区分中心</span>
      <span>技术支持：南通市测绘院有限公司</span>
    </div>
    <Modal v-model="modal" width="1200" :footer-hide="true" class="dark-blue-modal">
      <div slot="header">
        <p class="m-title"></p>
      </div>
      <div class="name-list">
        <Table :columns="columns" :data="list" :height="500"></Table>
        <!-- <div class="name-item" v-for="(item,index) in nameList">
                    {{item.Name}}
        </div>-->
      </div>
      <!--  <div slot="footer">
                <div style="text-align:center;">
                    <Button @click="modal=false">关闭</Button>
                </div>
      </div>-->
    </Modal>
    <div class="login">
      <template v-if="!isLogin">
        <a href="javascript:void(0);" class="login-btn" @click="loginFormShow=true">请登录</a>
      </template>
      <template v-else>
        <div class="logined">
          <a href="javascript:void(0);" class="logined-btn" @click="isOpenSys = !isOpenSys">管理员</a>
          <ul class="sys-link" v-show="isOpenSys">
            <li>
              <a href="javascript:void(0);" class="backend" @click="navigate('index')">后台管理</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="backend" @click="navigate('manage')">企业管理</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="logout" @click="logoutFunc">退出</a>
            </li>
          </ul>
        </div>
      </template>
      <div class="login-form" v-if="loginFormShow">
        <div class="login-wrap">
          <a href="javascript:void(0);" class="form-close" @click="loginFormShow=false"></a>
          <Form
            ref="loginForm"
            :model="form"
            class="login-content"
            label-position="top"
            @keydown.enter.native="handleSubmit"
          >
            <h3>企业复工辅助决策系统</h3>
            <FormItem label="用户名">
              <Input v-model="form.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码">
              <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import { getURL } from "../../common/tool.js";

import { setToken, getToken } from "../../libs/utils";
import { loadModules, loadCss } from "esri-loader";

import icon11 from "../../assets/images/bigscreen/icon11.gif"
import icon6 from "../../assets/images/bigscreen/icon6.png";
import icon5 from "../../assets/images/bigscreen/icon5.png";
import icon3 from "../../assets/images/bigscreen/icon3.png";
import red from "../../assets/images/bigscreen/red.png";
import green from "../../assets/images/bigscreen/green.png";
import blue from "../../assets/images/bigscreen/blue.png";

let echarts = require("echarts");

loadCss(
  "http://223.113.1.77:8010/arcgis_js_api/library/3.19/3.19/esri/css/esri.css"
);

export default {
  name: "bigscreen",
  data() {
    return {
      map: null,
      frmzlyr: null,
      jzgldlyr: null,
      qzrylyr: null,
      ycqylyr: null,
      date: "",
      time: "",
      isLoading:true,
      company: {
        number: 0,
        peopleNumber: 0
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "姓名",
          key: "Name",
          align: "center",
          width: 70
        },
        {
          title: "体温",
          key: "Temp",
          align: "center",
          width: 100
        },
        {
          title: "是否咳嗽",
          key: "Cough",
          align: "center",
          width: 100,
          render: (h, params) => {
            var s = "";
            if (!params.row.Cough) {
              s = "否";
            } else {
              s = "是";
            }
            return h("div", [h("span", {}, s)]);
          }
        },
        {
          title: "不适症状",
          key: "SymptomsDetail",
          align: "center"
        },
        {
          title: "管理员电话号码",
          key: "ManageMobile",
          align: "center"
        },
        {
          title: "当前状态",
          key: "CurrStatus",
          align: "center"
        },
        {
          title: "是否复工",
          key: "RecoveryWork",
          align: "center",
          width:70,
          render: (h, params) => {
            var s = "";
            if (!params.row.RecoveryWork) {
              s = "否";
            } else {
              s = "是";
            }
            return h("div", [h("span", {}, s)]);
          }
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
          title: "是否返通",
          key: "LeaveNT",
          align: "center",
          width: 70,
          render: (h, params) => {
            var s = "";
            if (!params.row.LeaveNT) {
              s = "否";
            } else {
              s = "是";
            }
            return h("div", [h("span", {}, s)]);
          }
        },
        {
          title: "返通前地址",
          key: "BeforeReturnNtAddress",
          align: "center",
          width:150
        }
      ],
      list: [],
      stat: {},
      monitor: {
        IsolationPoint: 0,
        EnterprisePoint: 0,
        FeverClinics: 0,
        Patient: 0,
        SuspectedCase: 0
      },
      cwxx: [],
      modal: false,
      nameList: [],
      isLogin: false,
      loginFormShow: false,
      form: {
        userName: "",
        password: ""
      },
      isOpenSys: false
    };
  },
  mounted: function() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var Hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var Min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    this.date = year + "-" + month + "-" + day;
    this.time = Hour + ":" + Min + ":" + sec;
    var vm = this;
    setInterval(function() {
      var d = new Date();
      var Hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var Min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      vm.time = Hour + ":" + Min + ":" + sec;
    }, 1000);
    this.isLogin = getToken();
    this.$nextTick(function() {
      vm.init();
    });
    setInterval(() => {
      this.$nextTick(function() {
        vm.init();
      });
    }, 1000 * 60 * 10);
    const options = {
      // tell Dojo where to load other packages
      dojoConfig: {
        async: true,
        packages: [
          {
            name: "custom",
            location: "/custom"
          }
        ]
      },
      url: "http://223.113.1.77:8010/arcgis_js_api/library/3.19/3.19/init.js"
    };
    loadModules(
      [
        "esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/geometry/Extent",
        "esri/renderers/HeatmapRenderer",
        "esri/config",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/TextSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "custom/ClusterLayer"
      ],
      options
    )
      .then(
        ([
          Map,
          ArcGISTiledMapServiceLayer,
          ArcGISDynamicMapServiceLayer,
          FeatureLayer,
          Extent,
          HeatmapRenderer,
          esriConfig,
          PictureMarkerSymbol,
          SimpleMarkerSymbol,
          TextSymbol,
          ClassBreaksRenderer,
          SimpleFillSymbol,
          SimpleLineSymbol,
          ClusterLayer
        ]) => {
          var initialExtent = new Extent(
            120.893798,
            31.793207,
            121.084289,
            31.987909,
            new esri.SpatialReference({ wkid: 4490 })
          );
          vm.map = new Map("map", {
            extent: initialExtent,
            logo: false,
            slider: false
          });
          var dynamicLayer = new ArcGISDynamicMapServiceLayer(
            "http://223.113.1.77:6080/arcgis/rest/services/NTJKZX/NTKFQMapService/MapServer"
          );
          vm.map.addLayer(dynamicLayer);

          var frmzSymbol = new PictureMarkerSymbol(icon5, 12, 22);
          var jzgldSymbol = new PictureMarkerSymbol(icon3, 24, 16);
          var qzrySymbol = new PictureMarkerSymbol(icon6, 20, 22);
          var ycqySymbol = new PictureMarkerSymbol(icon11, 23, 20);

          //发热门诊
          if (vm.frmzlyr == null) {
            var layerDefinition = {
              geometryType: "esriGeometryPoint",
              fields: [
                {
                  name: "Name",
                  type: "esriFieldTypeString",
                  alias: "名称"
                },
                {
                  name: "Address",
                  type: "esriFieldTypeString",
                  alias: "地址"
                }
              ]
            };
            var featureCollection = {
              layerDefinition: layerDefinition,
              featureSet: null
            };
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("${Name}");
            infoTemplate.setContent("${Address}<br/>");
            //创建发热门诊图层
            vm.frmzlyr = new FeatureLayer(featureCollection, {
              infoTemplate: infoTemplate,
              outFields: ["*"],
              opacity: 1
            });
            vm.map.addLayer(vm.frmzlyr);

            axios
              .get(getURL("CommandHandler.ashx"), {
                params: {
                  method: "GetOpenZoneFeverClinics"
                }
              })
              .then(function(res) {
                for (var i = 0; i < res.data.length; i++) {
                  var info = {};
                  var x = Number(res.data[i].XZB);
                  var y = Number(res.data[i].YZB);
                  var point = new esri.geometry.Point(
                    x,
                    y,
                    new esri.SpatialReference({ wkid: 4490 })
                  ); //初始化起点
                  var graphic = new esri.Graphic(point);
                  graphic.setAttributes({
                    Name: res.data[i].Name,
                    Address: res.data[i].Address
                  });
                  graphic.setSymbol(frmzSymbol);
                  vm.frmzlyr.add(graphic);
                }
              });
          }

          //集中隔离点
          if (vm.jzgldlyr == null) {
            var layerDefinition = {
              geometryType: "esriGeometryPoint",
              fields: [
                {
                  name: "Name",
                  type: "esriFieldTypeString",
                  alias: "名称"
                },
                {
                  name: "Address",
                  type: "esriFieldTypeString",
                  alias: "地址"
                }
              ]
            };
            var featureCollection = {
              layerDefinition: layerDefinition,
              featureSet: null
            };
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("${Name}");
            infoTemplate.setContent("${Address}<br/>");
            //创建集中隔离点图层
            vm.jzgldlyr = new FeatureLayer(featureCollection, {
              mode: FeatureLayer.MODE_SNAPSHOT,
              infoTemplate: infoTemplate,
              outFields: ["*"],
              opacity: 1
            });
            vm.map.addLayer(vm.jzgldlyr);

            axios
              .get(getURL("CommandHandler.ashx"), {
                params: {
                  method: "GetOpenZoneIsolationPoint"
                }
              })
              .then(function(res) {
                for (var i = 0; i < res.data.length; i++) {
                  var info = {};
                  var x = Number(res.data[i].XZB);
                  var y = Number(res.data[i].YZB);
                  var point = new esri.geometry.Point(
                    x,
                    y,
                    new esri.SpatialReference({ wkid: 4490 })
                  ); //初始化起点
                  var graphic = new esri.Graphic(point);
                  graphic.setAttributes({
                    Name: res.data[i].Name,
                    Address: res.data[i].Address
                  });
                  graphic.setSymbol(jzgldSymbol);
                  vm.jzgldlyr.add(graphic);
                }
              });
          }

          //异常企业
          if (vm.ycqylyr == null) {
            var layerDefinition = {
              "geometryType": "esriGeometryPoint",
              "fields": [{
                "name": "EnterpriseName",
                "type": "esriFieldTypeString",
                "alias": "名称"
              }, {
                "name": "Address",
                "type": "esriFieldTypeString",
                "alias": "地址"
              }]
            }
            var featureCollection = {
              layerDefinition: layerDefinition,
              featureSet: null
            };
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("${EnterpriseName}");
            infoTemplate.setContent("${Address}<br/>");
                   //创建集中隔离点图层
                   vm.ycqylyr = new FeatureLayer(featureCollection, {
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    infoTemplate: infoTemplate,
                    outFields: ["*"],
                    opacity: 1
                  });
                   vm.map.addLayer(vm.ycqylyr);

                   axios.get(getURL('CommandHandler.ashx'),{
                    params: {
                      method: "GetUnusualEnterprise"
                    }
                  }).then(function (res) {

                   for (var i = 0; i < res.data.length; i++) {
                    var info = {};
                    var x = Number(res.data[i].BDX);
                    var y = Number(res.data[i].BDY);
                          var point = new esri.geometry.Point(x, y, new esri.SpatialReference({ wkid: 4490 }));//初始化起点
                          var graphic = new esri.Graphic(point);
                          graphic.setAttributes({ "EnterpriseName": res.data[i].EnterpriseName, "Address": res.data[i].Address});
                          graphic.setSymbol(ycqySymbol);
                          vm.ycqylyr.add(graphic);
                        }
                      });
                }

 
        }
      )
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  },
  methods: {
    init: function() {
      this.getLeftTopData1();
      this.getLeftTopData2();
      this.createPieChart();
      this.createColumnChart1();
      this.getStat();
              this.createColumnChart3();
            this.createColumnChart4();
            this.createLineChart();
      this.getCWInfo();
    },
    createPieChart: function() {
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetResumerData"
          }
        })
        .then(function(res) {
          var myChart = echarts.init(document.getElementById("pie-chart"));
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)"
            },
            color: ["#DA3031", "#D7610D", "#CDCC3C", "#55D16E"],
            legend: {
              orient: "vertical",
              left: "right",
              top: "middle",
              data: ["重点地区", "一般重点地区", "一般地区", "其他"],
              textStyle: {
                color: "#fff"
              },
              itemWidth: 10,
              itemHeight: 2
            },
            series: [
              {
                name: "复工人员分类",
                type: "pie",
                radius: ["30%", "70%"],
                center: ["40%", "50%"],
                data: [
                  { value: res.data[0].ZDDQCount, name: "重点地区" },
                  { value: res.data[0].YBZDDQCount, name: "一般重点地区" },
                  { value: res.data[0].YBDQCount, name: "一般地区" },
                  { value: res.data[0].QTDQCount, name: "其他" }
                ],
                label: {
                  formatter: "{b}({c})",
                  fontSize: 12,
                  color: "#fff"
                },
                labelLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        });
    },
    createLineChart: function() {
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseTrends"
          }
        })
        .then(function(res) {
          var data = res.data;
          var xaxis = [],
            ys = [],
            bl = [],
            wft = [],
            yfg = [],
            zgl = [];
          var tempDate = "";
          for (var i = 0; i < data.length; i++) {
            if (tempDate != data[i].Date) {
              xaxis.push(data[i].Date);
              tempDate = data[i].Date;
            }
            if (data[i].Type == "疑似") {
              ys.push(data[i].Number);
            }
            if (data[i].Type == "病例") {
              bl.push(data[i].Number);
            }
            if (data[i].Type == "未返通") {
              wft.push(data[i].Number);
            }
            if (data[i].Type == "已复工") {
              yfg.push(data[i].Number);
            }
            if (data[i].Type == "在隔离") {
              zgl.push(data[i].Number);
            }
          }
          var myChart = echarts.init(document.getElementById("line-chart"));
          var option = {
            legend: {
              data: ["留观", "就诊", "未返通", "已复工", "在隔离"],
              textStyle: {
                color: "#fff"
              },
              right: "50"
            },
            tooltip: {
              trigger: "axis"
            },
            grid: {
              top: "30",
              left: "3%",
              right: "50",
              bottom: "3%",
              containLabel: true
            },
            color: ["#DE3AE3", "#E33A39", "#D5E223", "#3AE3AC", "#5C91FB"],
            xAxis: {
              type: "category",
              data: xaxis,
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            yAxis: {
              type: "value",
              name: "人数",
              nameTextStyle: {
                color: "#fff"
              },
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                name: "留观",
                type: "line",
                data: ys
              },
              {
                name: "就诊",
                type: "line",
                data: bl
              },
              {
                name: "未返通",
                type: "line",
                data: wft
              },
              {
                name: "已复工",
                type: "line",
                data: yfg
              },
              {
                name: "在隔离",
                type: "line",
                data: zgl
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        });
    },
    createColumnChart1: function() {
      var vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetReportData"
          }
        })
        .then(function(res) {
          var data = res.data[0];
          console.log(data);
          var myChart = echarts.init(document.getElementById("col-chart1"));
          var option = {
            legend: {
              data: ["昨日累计", "今日新增", "异常数量"],
              textStyle: {
                color: "#fff"
              },
              itemWidth: 10,
              itemHeight: 2,
              left: "0"
            },
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                if (params[0].name == "申报企业") {
                  return (
                    "申报企业" +
                    "<br/>" +
                    params[0].marker +
                    params[0].seriesName +
                    "：" +
                    params[0].value +
                    "<br/>" +
                    params[1].marker +
                    params[1].seriesName +
                    "：" +
                    params[1].value
                  );
                } else {
                  return (
                    "异常企业" +
                    "<br/>" +
                    params[2].marker +
                    params[2].seriesName +
                    "：" +
                    params[2].value
                  );
                }
              }
            },
            grid: {
              left: "3%",
              right: "10%",
              bottom: "3%",
              containLabel: true
            },
            color: ["#4D7FD8", "#4EBA90", "#D88C15"],
            xAxis: {
              type: "category",
              data: ["申报企业", "异常企业"],
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            yAxis: [
              {
                type: "value",
                name: "申报数量",
                nameTextStyle: {
                  color: "#fff"
                },
                axisLabel: {
                  color: "#fff"
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              },
              {
                type: "value",
                name: "异常数量",
                nameTextStyle: {
                  color: "#fff"
                },
                axisLabel: {
                  color: "#fff"
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: "昨日累计",
                type: "bar",
                stack: "人数",
                barWidth: 20,
                data: [data.EnterpriseNumber, 0]
              },
              {
                name: "今日新增",
                type: "bar",
                stack: "人数",
                barWidth: 20,
                data: [data.TodayAddEnterpriseNumber, 0]
              },
              {
                name: "异常数量",
                type: "bar",
                stack: "人数",
                barWidth: 20,
                yAxisIndex: 1,
                data: [0, data.UnusualEnterpriseNumber]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          vm.createColumnChart2(data);
        });
    },
    createColumnChart2: function(data) {
      var vm = this;
      var myChart = echarts.init(document.getElementById("col-chart2"));
      var option = {
        legend: {
          data: ["昨日累计", "今日新增", "异常数量"],
          textStyle: {
            color: "#fff"
          },
          itemWidth: 10,
          itemHeight: 2,
          left: "right"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            if (params[0].name == "申报人员") {
              return (
                "申报人员" +
                "<br/>" +
                params[0].marker +
                params[0].seriesName +
                "：" +
                params[0].value +
                "<br/>" +
                params[1].marker +
                params[1].seriesName +
                "：" +
                params[1].value
              );
            } else {
              return (
                "异常人员" +
                "<br/>" +
                params[2].marker +
                params[2].seriesName +
                "：" +
                params[2].value
              );
            }
          }
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        color: ["#4D7FD8", "#4EBA90", "#D88C15"],
        xAxis: {
          type: "category",
          data: ["申报人员", "异常人员"],
          axisLabel: {
            color: "#fff",
            interval:0
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            name: "申报人数",
            nameTextStyle: {
              color: "#fff"
            },
            max:35000,      // 计算最大值
            interval: Math.ceil(35000 / 5),
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "value",
            name: "异常人数",
            nameTextStyle: {
              color: "#fff"
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
              show: false
            },
            max:500,      // 计算最大值
            interval: Math.ceil(500 / 5),
            axisTick: {
              show: false
            },
          }
        ],
        series: [
          {
            name: "昨日累计",
            type: "bar",
            stack: "人数",
            barWidth: 20,
            data: [data.EmployeeNumber, 0]
          },
          {
            name: "今日新增",
            type: "bar",
            stack: "人数",
            barWidth: 20,
            data: [data.TodayAddEmployeeNumber, 0]
          },
          {
            name: "异常数量",
            type: "bar",
            stack: "人数",
            barWidth: 20,
            yAxisIndex: 1,
            data: [0, data.UnusualEmployeeNumber]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createColumnChart3: function() {
      var vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetIsolateData"
          }
        })
        .then(function(res) {
          var myChart = echarts.init(document.getElementById("col-chart3"));
          console.log(res)
          var option = {
            legend: {
              data: ["剩余容量", "隔离人数"],
              textStyle: {
                color: "#fff"
              },
              itemWidth: 10,
              itemHeight: 2,
              right: "50"
            },
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                if (
                  params[0].name == "企业隔离" ||
                  params[0].name == "居家隔离"
                ) {
                  return (
                    params[0].name +
                    "<br/>" +
                    params[0].marker +
                    params[0].seriesName +
                    "：" +
                    params[0].value
                  );
                } else {
                  return (
                    params[0].name +
                    "<br/>" +
                    params[0].marker +
                    params[0].seriesName +
                    "：" +
                    params[0].value +
                    "<br/>" +
                    params[1].marker +
                    params[1].seriesName +
                    "：" +
                    params[1].value
                  );
                }
              }
            },
            grid: {
              top: "30",
              left: "3%",
              right: "50",
              bottom: "3%",
              containLabel: true
            },
            color: ["#E2E33A", "#3AE3AC"],
            xAxis: {
              type: "category",
              data: [
                "金桥公寓",
                "嘉福宾馆",
                "丽枫酒店",
                "格林豪泰",
                "企业隔离",
                "居家隔离"
              ],
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            yAxis: {
              type: "value",
              name: "人数",
              nameTextStyle: {
                color: "#fff"
              },
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                name: "隔离人数",
                type: "bar",
                stack: "人数",
                barWidth: 20,
                data: [
                  res.data[0].JQGY,
                  res.data[0].JFBG,
                  res.data[0].LFJD,
                  res.data[0].GLHT,
                  res.data[0].QYGL,
                  res.data[0].JJGL
                ]
              },
              {
                name: "剩余容量",
                type: "bar",
                stack: "人数",
                barWidth: 20,
                data: [
                  res.data[0].JQGYSY,
                  res.data[0].JFBGSY,
                  res.data[0].LFJDSY,
                  res.data[0].GLHTSY,
                  0,
                  0
                ]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        });
    },
    createColumnChart4: function() {
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetIsolateStatistic"
          }
        })
        .then(function(res) {
          var myChart = echarts.init(document.getElementById("col-chart4"));
          var option = {
            tooltip: {
              trigger: "axis"
            },
            grid: {
              top: "30",
              left: "3%",
              right: "50",
              bottom: "3%",
              containLabel: true
            },
            color: ["#46C1DA"],
            xAxis: {
              type: "category",
              name: "天数",
              data: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14"
              ],
              nameTextStyle: {
                color: "#fff"
              },
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            yAxis: {
              type: "value",
              name: "人数",
              nameTextStyle: {
                color: "#fff"
              },
              axisLabel: {
                color: "#fff"
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                name: "人数",
                barWidth: 20,
                type: "bar",
                data: res.data.split(",")
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        });
    },
    getLeftTopData1() {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseProfile"
          }
        })
        .then(function(res) {
          vm.company.number = res.data[0].EnterpriseNumber;
          vm.company.peopleNumber = res.data[0].EmployeeNumber;
        });
    },
    getLeftTopData2() {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetControlMeasure"
          }
        })
        .then(function(res) {
          vm.monitor = res.data[0];
        });
    },
    getCWInfo() {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseHighTemp"
          }
        })
        .then(function(res) {
          vm.cwxx = res.data;
          vm.isLoading = false;
          vm.$nextTick(function() {
            // vm.createColumnChart3();
            // vm.createColumnChart4();
            // vm.createLineChart();
          });
        });
    },
    showDetail(id) {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseHighTempDetail",
            enterpriseID: id
          }
        })
        .then(function(res) {
          vm.list = res.data || [];
          vm.modal = true;
        });
    },
    handleSubmit() {
      if (this.form.userName != "super_admin") {
        this.$Message.error("用户名不存在！");
        return;
      }
      if (!this.form.password) {
        this.$Message.error("请输入密码！");
        return;
      }
      setToken("super_admin");
      this.isLogin = true;
      this.loginFormShow = false;
    },
    logoutFunc() {
      setToken("");
      this.isLogin = false;
    },
    navigate(name) {
      this.$router.push({
        name: name
      });
    },
    getStat: function() {
      let vm = this;
      axios
        .get(getURL("CommandHandler.ashx"), {
          params: {
            method: "GetEnterpriseWorkData"
          }
        })
        .then(function(res) {
          vm.stat = Object.assign({}, res.data[0]);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.bigscreen {
  height: 100%;
  min-width: 1780px;
  background: url(../../assets/images/bigscreen/bg.png) center center no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  padding: 20px 20px 30px;
  box-sizing: border-box;
  .top {
    height: 58px;
    background: url(../../assets/images/bigscreen/top.png) center top no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .top p {
    font-size: 22px;
    color: #88dbd5;
    font-weight: bold;
    line-height: 58px;
    text-align: center;
  }
  .main {
    display: flex;
    height: calc(100% - 58px);
  }
  .left-part,
  .right-part {
    width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .left-part h3,
  .right-part h3 {
    margin: 10px 0 10px 0;
    line-height: 1;
    color: #88dbd5;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 2px;
  }
  .left-part h4 {
    line-height: 1;
    color: #88dbd5;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
  .mid-part {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .gk {
    width: 440px;
    margin: 0 auto;
  }
  .btn {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .btn a {
    display: block;
    width: 200px;
    height: 50px;
    background: url(../../assets/images/bigscreen/btn.png) 0 0 no-repeat;
    border: 1px solid #88dbd5;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 35px;
    color: #88dbd5;
    position: relative;
    white-space: nowrap;
    left: 0;
    top: 0;
  }
  .login {
    position: absolute;
    right: 67px;
    top: 55px;
  }
  .login-btn,
  .logined-btn {
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: url(../../assets/images/bigscreen/btn.png) 0 0 no-repeat;
    border: 1px solid #88dbd5;
    color: #88dbd5;
    text-align: center;
  }
  .sys-link {
    position: absolute;
    left: 0;
    top: 40px;
    width: 120px;
    background-color: #00090e;
    border: 1px solid #88dbd5;
    border-top: none;
    a {
      width: 120px;
      height: 36px;
      display: block;
      padding-left: 30px;
      line-height: 36px;
      color: #88dbd5;
    }
    a.backend {
      background: url(../../assets/images/i4.png) 6px center no-repeat;
    }
    a.logout {
      background: url(../../assets/images/i3.png) 6px center no-repeat;
    }
  }
  .logined-btn {
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    position: relative;
    &:before {
      content: "";
      width: 18px;
      height: 18px;
      background: url(../../assets/images/i2.png) 0 0 no-repeat;
      position: absolute;
      left: 6px;
      top: 50%;
      margin-top: -9px;
    }
    &:after {
      content: "";
      width: 16px;
      height: 10px;
      background: url(../../assets/images/i1.png) 0 0 no-repeat;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -5px;
    }
  }
  .btn a.btn-on {
    background: url(../../assets/images/bigscreen/btn-h.png) 0 0 no-repeat;
  }
  .btn a:before {
    width: 2px;
    height: 30px;
    background: #88dbd5;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -15px;
    content: "";
  }
  .btn a.btn1:after,
  .btn a.btn2:after,
  .btn a.btn3:after,
  .btn a.btn4:after,
  .btn a.btn5:after,
  .btn a.btn6:after,
  .btn a.btn7:after,
  .btn a.btn8:after {
    content: "";
    width: 25px;
    height: 25px;
    background: url(../../assets/images/bigscreen/icon1.png) center center
      no-repeat;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -12px;
  }
  .btn a.btn2:after {
    background: url(../../assets/images/bigscreen/icon2.png) center center
      no-repeat;
  }
  .btn a.btn3:after {
    background: url(../../assets/images/bigscreen/icon3.png) center center
      no-repeat;
  }
  .btn a.btn4:after {
    background: url(../../assets/images/bigscreen/icon4.png) center center
      no-repeat;
  }
  .btn a.btn5:after {
    background: url(../../assets/images/bigscreen/icon5.png) center center
      no-repeat;
  }
  .btn a.btn6:after {
    background: url(../../assets/images/bigscreen/icon6.png) center center
      no-repeat;
  }
  .btn a.btn7:after {
    background: url(../../assets/images/bigscreen/icon7.png) center center
      no-repeat;
  }
  .btn a.btn8:after {
    background: url(../../assets/images/bigscreen/icon9.png) center center
      no-repeat;
  }
  .sub-mid {
    // flex: 1;
    // display: flex;
    // flex-direction: column;
    height: 23%;
  }
  .sub-title {
    height: 32px;
    padding-left: 38px;
    position: relative;
  }
  .sub-title p {
    font-size: 16px;
    color: #88dbd5;
    line-height: 32px;
    letter-spacing: 2px;
  }
  .sub-title .dpk,
  .sub-title .area-sel {
    position: absolute;
    right: 0;
    top: 0;
  }
  .list-bg {
    background: url(../../assets/images/bigscreen/list.png) 0 center no-repeat;
  }
  .pie-bg {
    background: url(../../assets/images/bigscreen/pie.png) 0 center no-repeat;
  }
  .col-bg {
    background: url(../../assets/images/bigscreen/column.png) 0 center no-repeat;
  }
  .pie-chart,
  .col-chart {
    flex: 1;
  }
  .list-panel {
    max-height: 130px;
    overflow: auto;
    .loading {
      width: 30px;
      margin: 0 auto;
      margin-top: 50px;
    }
  }
  .list-row {
    height: 34px;
    display: flex;
    line-height: 34px;
    background-color: rgba(149, 205, 242, 0.2);
    margin-bottom: 4px;
    cursor: pointer;
  }
  .list-row:last-child {
    margin-bottom: 0;
  }
  .list-row-head {
    background-color: rgba(136, 219, 213, 0.5);
  }
  .list-item-one {
    width: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .list-item-three,
  .list-item-four {
    width: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .list-item-four {
    width: 120px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .list-item {
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .list-wrap {
    display: flex;
    justify-content: space-between;
  }
  .list-flex {
    width: 230px;
    height: 230px;
    > div {
      height: 100%;
    }
  }
  .mid-part-top {
    padding: 0 68px;
    margin-top: 63px;
  }
  .mid-tt {
    position: relative;
  }
  .mid-tt p {
    font-size: 18px;
    color: #fff;
    line-height: 22px;
  }
  .mid-tt .time {
    color: #fff;
    font-size: 18px;
    line-height: 22px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .mid-data {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
  .mid-data-item {
    width: 140px;
    text-align: center;
  }
  .mid-data-c1 {
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: rgba(62, 98, 159, 0.5);
    font-size: 16px;
  }
  .mid-data-c2 {
    height: 80px;
    border: 1px solid #1e61d2;
    background: url(../../assets/images/bigscreen/bg1.png) 0 0 no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 12px 0 16px 0;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #88dbd5;
    letter-spacing: 5px;
    font-weight: bold;
  }
  .mid-data-c3 {
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 1;
  }
  .copyright {
    position: absolute;
    height: 30px;
    line-height: 30px;
    color: #fff;
    width: 100%;
    text-align: center;
    font-size: 16px;
    left: 0;
    bottom: 0;
  }
  .mid-part-bottom {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
  .map {
    height: 100%;
  }

  @keyframes Warning {
    0% {
      opacity: 1;
    }
    50% {
      r: 8;
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
<style lang="less">
.login-form {
  position: fixed;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .login-wrap {
    width: 340px;
    height: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -160px 0 0 -170px;
    background-color: #001a31;
    border: 1px solid #568d89;
    .login-content {
      width: 220px;
      margin: 0 auto;
      h3 {
        color: #fff;
        padding-left: 40px;
        background: url(../../assets/images/logo.png) 0 center no-repeat;
        margin: 35px 0 25px 0;
        font-size: 18px;
      }
    }
    .ivu-form .ivu-form-item-label {
      color: #568d89;
    }
    .ivu-input {
      background-color: transparent;
      border: 1px solid #568d89;
      color: #fff;
    }
    .ivu-btn-primary {
      background-color: #88dbd5;
      border-color: #88dbd5;
      color: #568d89;
    }
    .form-close {
      width: 16px;
      height: 16px;
      display: block;
      background: url(../../assets/images/i5.png) 0 0 no-repeat;
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }
}
.dark-blue-modal {
  .ivu-modal-content {
    background-color: #001a31;
  }
  .ivu-modal-header {
    border: none;
  }
  .ivu-table {
    background-color: transparent;
    th,
    td {
      background-color: transparent;
      color: #fff;
      border-color: #568d89;
    }
  }
  .ivu-table:before {
    background-color: #001a31;
  }
  .ivu-table-wrapper-with-border {
    border: none;
  }
}
</style>