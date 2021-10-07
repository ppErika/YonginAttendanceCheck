import axios from 'axios';
import {getToken, storeToken} from '../store/EncryptedStorage';

export const info = {
  //backend url
  backendUrl: 'http://13.124.146.201:8080',

  apiList: {
    login: '/api/auth/login',
    getLecture: '/api/course',
    refresh: '/api/auth/token',
    logout: '/api/auth/logout',
    getAttendance: '/api/attendance',
    createClass: '/api/class',
    attUpdate: '/api/attendance/updates',
    attGetClass: '/api/class',
    attUser: '/api/attendance/user',
    attByClass: '/api/attendance/byclass',
  },
};

/**
 * 백엔드와 기본적인 통신 시 사용하는 함수
 * 헤더에 accessToken을 같이 전달한다.
 * @return {object} backend와 통신할 수 있는 Axios 객체
 */
export async function Api() {
  let data = await getToken();
  const api = axios.create({
    baseURL: info.backendUrl,
    headers: {
      Authorization: `Bearer ${JSON.parse(data).token.accessToken}`,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return api;
  // 토큰 읽어서 오브젝트화 하고 리턴
}

/**
 * 백엔드와 통신하여 로그인관련 작업을 처리하는 함수
 * @return {object} backend와 통신하여 로그인 할 수 있는 Axios 객체
 */
export function LoginApi() {
  const api = axios.create({
    baseURL: info.backendUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return api;
}

/**
 * 백엔드와 통신하여 새로운 토큰을 받아오는 함수
 * 토큰을 받아서 저장한 뒤 리프레시 전에 호출했던 함수를 다시 호출한다.
 */
export async function Refresh(func) {
  let data = await getToken();
  const api = axios.create({
    baseURL: info.backendUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  api
    .post(info.apiList.refresh, JSON.parse(data).token)
    .then(async (res) => {
      await storeToken(res.data);
      func();
    })
    .catch((error) => {
      console.error(error);
    });
}
