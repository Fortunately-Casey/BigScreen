import axios from "axios";
import {
  getURL
} from "@/common/tool";

// 登录
export function login(params) {
  const url = getURL("/manage/sys/login");
  return axios
    .post(url, params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 获取权限
export function getPermissionEnterprises(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/getPermissionEnterprises");
  return axios
    .get(url, {
      params:params,
      headers:{
        token:token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}


// 获取打卡记录
export function getEnterprisePeriodPlaceList(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/getEnterprisePeriodPlaceList");
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 导出
export function exportEnterprisePeriodPlaceList(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/exportEnterprisePeriodPlaceList");
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 导出疾控中心汇总
export function exportEnterpriseGroupList(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/exportEnterpriseGroupList");
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 导出学校汇总
export function exportEnterpriseBaseList(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/exportEnterpriseBaseList");
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 获取大屏数据
export function getMonitorData(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/monitor/getMonitorData");
  return axios
    .get(url, {
      params: params,
      headers:{
        token:token
      }
    })
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

// 导出最新数据
export function exportEnterprisePeriodPlaceListlast(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/manage/sys/exportEnterprisePeriodPlaceListlast");
  return axios
    .post(url, params, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.log(err);
    })
}

// 导出缺课记录
export function exportAbsentTotal(params) {
  let token = window.localStorage.getItem('token');
  const url = getURL("/absent/manager/exportAbsentTotal");
  return axios
    .get(url, {
      params: params,
      headers: {
        token: token
      }
    })
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.log(err);
    })
}