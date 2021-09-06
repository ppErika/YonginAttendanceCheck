import axios from 'axios';
import {getToken} from '../store/EncryptedStorage';

export const info = {
  //backend url
  backendUrl: 'http://13.124.146.201:8080',

  apiList: {
    login: '/api/auth/login',
    getLecture: '/api/course',
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
 * 백엔드와 통신하여 로그인하는 함수
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
