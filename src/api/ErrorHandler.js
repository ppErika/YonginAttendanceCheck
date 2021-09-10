import {Refresh} from '../api/BaseApi';

export function ErrorHandler(error, func) {
  console.log(error.response.status);
  if (error.response && error.response.status === 401) {
    // 401(Unauthorized) 에러가 발생한 경우
    console.log('Unauthorized Error');
    Refresh(func);
  } else {
    console.error(error);
  }
}
