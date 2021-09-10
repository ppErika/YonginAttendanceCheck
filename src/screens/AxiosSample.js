import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';
import axios from 'axios';
import {info, LoginApi, Api, Refresh} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';
import {storeToken, getToken} from '../store/EncryptedStorage';
import EncryptedStorage from 'react-native-encrypted-storage';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const AxiosSample = ({navigation}) => {
  async function getLecture() {
    let api = await Api();
    api
      .get(info.apiList.getLecture)
      .then((res) => {
        console.log(res.data);
        //스테이트에 강의정보를 저장하여 사용
        //지금은 백엔드로부터 return오는 데이터가 프론트 양식과 맞지 않아서 적용 안함
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, getLecture);
      });
  }

  return (
    <Container>
      <Button title="get course" onPress={() => getLecture()} />
    </Container>
  );
};

export default AxiosSample;
