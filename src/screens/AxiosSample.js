import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';
import axios from 'axios';
import {info, LoginApi, Api, Refresh} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';
import {storeToken, getToken} from '../store/EncryptedStorage';
import EncryptedStorage from 'react-native-encrypted-storage';
import styled from 'styled-components/native';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import {TouchableOpacity, useWindowDimensions} from 'react-native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  width: ${({width}) => (width - 60) / 3}px;
  background-color: ${Colors.activeGreen};
  height: 100px;
  margin: 30px 5px 5px 5px;
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.backgroundGray};
  text-align: center;
  font-family: ${Fonts.spoqaMedium};
`;

const AxiosSample = ({navigation}) => {
  const width = useWindowDimensions().width;
  async function getLecture() {
    let api = await Api();
    api
      .get(info.apiList.getLecture)
      .then((res) => {
        console.log('get lecture\n');
        console.log(res.data);
        console.log('get lecture end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, getLecture);
      });
  }

  async function createClass() {
    let data = {
      courseId: '20212550033F72',
    };
    let api = await Api();
    api
      .post('/api/class', data)
      .then((res) => {
        console.log('create class\n');
        console.log(res.data);
        console.log('create class end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, createClass);
      });
  }

  async function attUpdate() {
    let data = [
      {
        attendanceId: 208,
        status: '0',
      },
      {
        attendanceId: 209,
        status: '1',
      },
    ];
    let api = await Api();
    api
      .patch('/api/attendance/updates', data)
      .then((res) => {
        console.log('att update\n');
        console.log(res.status);
        console.log('att update end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attUpdate);
      });
  }

  async function attGetClass() {
    let api = await Api();
    api
      .get('/api/class/20212550033F72')
      .then((res) => {
        console.log('att get class\n');
        console.log(res.data);
        console.log('att get class end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attGetClass);
      });
  }

  async function attUser() {
    let api = await Api();
    api
      .get('/api/attendance/user/20212550033F72')
      .then((res) => {
        console.log('att user\n');
        console.log(res.data);
        console.log('att user end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attUser);
      });
  }

  async function attByClass() {
    let api = await Api();
    api
      .get('/api/attendance/byclass/207')
      .then((res) => {
        console.log('att by class\n');
        console.log(res.data);
        console.log('att by class end\n');
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attByClass);
      });
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={getLecture}>
          <ButtonContainer width={width}>
            <Title>get lecture</Title>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={createClass}>
          <ButtonContainer width={width}>
            <Title>create class</Title>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={attUpdate}>
          <ButtonContainer width={width}>
            <Title>att update</Title>
          </ButtonContainer>
        </TouchableOpacity>
      </Container>
      <Container>
        <TouchableOpacity onPress={attGetClass}>
          <ButtonContainer width={width}>
            <Title>att get class</Title>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={attUser}>
          <ButtonContainer width={width}>
            <Title>att user</Title>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={attByClass}>
          <ButtonContainer width={width}>
            <Title>att by class</Title>
          </ButtonContainer>
        </TouchableOpacity>
      </Container>
    </>
  );
};

export default AxiosSample;
