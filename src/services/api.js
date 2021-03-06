import axios from 'axios';
import { getToken } from './auth'


export const api = axios.create({
  baseURL: 'http://localhost:3333/'
});

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiStates = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
}); 