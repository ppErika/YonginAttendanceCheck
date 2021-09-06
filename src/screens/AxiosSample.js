import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';
import axios from 'axios';
import {info, LoginApi, Api} from '../api/BaseApi';
import {storeToken, getToken} from '../store/EncryptedStorage';
import EncryptedStorage from 'react-native-encrypted-storage';

const AxiosSample = ({navigation}) => {
  function testc() {
    const data = {
      userId: 'admin1111',
      password: 'pass',
    };
    LoginApi()
      .post(info.apiList.login, data)
      .then((res) => {
        storeToken(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function teste() {
    let api = await Api();
    api
      .get(info.apiList.getLecture)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function testd() {
    try {
      let data = await EncryptedStorage.getItem('user_token');
      if (data !== undefined) {
        //console.log(JSON.parse(data).token.accessToken);
        const api = axios.create({
          //baseURL: info.backendUrl,
          headers: {
            Authorization: `Bearer ${JSON.parse(data).token.accessToken}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        api
          .get('http://13.124.146.201:8080/api/course')
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error.code);
    }
  }

  function testa() {
    LoginApi()
      .get('https://codingapple1.github.io/shop/data2.json')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function testb() {
    const token = '..token..';
    axios({
      method: 'post',
      url: 'http://13.124.146.201:8080/api/auth/login',
      headers: {
        //Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: {
        userId: 'admin1111', // This is the body part
        password: 'pass',
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button title="Press me" onPress={() => testc()} />
        <Button title="course" onPress={() => teste()} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AxiosSample;
