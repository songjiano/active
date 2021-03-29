
import axios from '../utils/axios'

export function addCart(params) {
  return axios.post('/shop-cart', params);
}

export function modifyCart(params) {
  return axios.put('/shop-cart', params);
}

export function getCart(params) {
  return axios.get('/abieapi/api/WebApi/NoticeList', { ...params });
}

export function deleteCartItem(id) {
  return axios.delete(`/shop-cart/${id}`);
}

export function getByCartItemIds(params) {
  return axios.get('/shop-cart/settle', { params });
}

