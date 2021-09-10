import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {info, LoginApi} from '../api/BaseApi';
import {storeToken} from '../store/EncryptedStorage';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 17px;
`;

const CautionBox = styled.View`
  width: ${({width}) => width - 40}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-bottom: 41px;
`;

const InputBundleBox = styled.View`
  margin-bottom: 61px;
`;

const styles = StyleSheet.create({
  logo: {
    width: 103,
    height: 98,
    marginVertical: 65,
    resizeMode: 'contain',
  },
});

const Login = ({navigation}) => {
  const width = useWindowDimensions().width;
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  // 로그인 실패 했을 때 화면 테스트를 위한 변수 (실패가 false)
  const [permissionState, setPermissionState] = useState(true);

  //테스트용 ID:admin1111, PWD:pass
  function login() {
    const data = {
      userId: id,
      password: pwd,
      userType: 1, //학생 1
    };
    LoginApi()
      .post(info.apiList.login, data)
      .then((res) => {
        storeToken(res.data);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error(error);
        setPwd('');
        setPermissionState(false);
      });
    //navigation.navigate('Home');
  }

  return (
    <Container>
      <Image
        source={require('../assets/yongin_logo.png')}
        style={styles.logo}
      />

      {permissionState === false ? (
        <>
          <Input
            placeholder="ID"
            returnkeyType="next"
            value={id}
            onChangeText={(text) => setId(text)}
            secureTextEntry={false}
            style={{
              borderWidth: 2,
              borderColor: Colors.absentRed,
            }}
          />
          <Input
            placeholder="Password"
            returnkeyType="done"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            secureTextEntry={true}
            style={{
              borderWidth: 2,
              borderColor: Colors.absentRed,
            }}
          />
          <CautionBox width={width}>
            <Text
              style={{color: Colors.absentRed, fontFamily: Fonts.spoqaRegular}}>
              올바른 아이디 혹은 비밀번호가 아닙니다.
            </Text>
          </CautionBox>
        </>
      ) : (
        <InputBundleBox>
          <Input
            placeholder="ID"
            returnkeyType="next"
            value={id}
            onChangeText={(text) => setId(text)}
            secureTextEntry={false}
          />
          <Input
            placeholder="Password"
            returnkeyType="done"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            secureTextEntry={true}
          />
        </InputBundleBox>
      )}
      {id.length > 0 && pwd.length > 0 ? (
        <LoginButton
          style={{backgroundColor: Colors.activeGreen}}
          onPress={login}
        />
      ) : (
        <LoginButton style={{backgroundColor: Colors.inactiveGray}} />
      )}
    </Container>
  );
};

export default Login;
