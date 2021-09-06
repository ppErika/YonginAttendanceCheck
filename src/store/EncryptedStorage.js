/**
 * 이 저장소에서는 토큰 관련 정보만 관리
 */
import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeToken(token) {
  try {
    await EncryptedStorage.setItem('user_token', JSON.stringify({token}));
    console.log('token stored');
  } catch (error) {
    console.log(error.code);
  }
}

export async function getToken() {
  let token = '';
  try {
    let data = await EncryptedStorage.getItem('user_token');
    if (data !== undefined) {
      token = data;
    }
  } catch (error) {
    console.log(error.code);
  } finally {
    return token;
  }
}

export async function removeToken() {
  try {
    await EncryptedStorage.removeItem('user_token');
    console.log('token removed');
  } catch (error) {
    console.log(error.code);
  }
}

export async function clearStorage() {
  try {
    await EncryptedStorage.clear();
    console.log('storage cleared');
  } catch (error) {
    console.log(error.code);
  }
}
