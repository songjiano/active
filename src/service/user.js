
import axios from '../utils/axios'

export function getUserInfo(params) {
  return axios.get('/Api/Other/BaseCommon.ashx?Action=getopenid', {WXCode:params}) ;
}

export function getOpenId(params) {
  return axios.get('/v1/list',params);
}

export function getCityList() {
  return axios.get('/Api/Other/BaseCommon.ashx?Action=provincecity');
}

export function subMite(params) {
  return axios.post('/Api/Other/CustomerRecommended.ashx?Action=insertrecommend', params);
}

export function getcards(params) {
  return axios.post('/Api/Other/CustomerRecommended.ashx?Action=receivevoucher', params);
}

export function getOpenIds(openId) {
  return axios.get('Api/Other/CustomerRecommended.ashx?Action=getrecommendlist&ReferencesOpenId='+openId+'&pageIndex=1&pageSize=50')
}
//获取推荐人统计数据
export function getRecommends(params) {
  return axios.post('/Api/Other/CustomerRecommended.ashx?Action=getstatistics&ReferencesOpenId='+params);
}
//添加推荐人
export function addRef(params) { 
  return axios.post('/Api/Other/CustomerRecommended.ashx?Action=addrecommendmain', params);
}
//添加被推荐人
// export function addOpen(params) {
//   return axios.post('/Api/Other/CustomerRecommended.ashx?Action=insertrecommend', params);
// }
//增加浏览次数
export function addRed(params) {
  return axios.get('Api/Other/CustomerRecommended.ashx?Action=updateViewCount&ReferencesOpenId='+params);
}
