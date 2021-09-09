import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import Input from '../components/Input';
import GreenButton from '../components/GreenButton';
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

const Box = styled.View`
  width: ${({width}) => width - 40}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-bottom: 41px;
`;

const Box2 = styled.View`
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
    };
    // LoginApi()
    //   .post(info.apiList.login, data)
    //   .then((res) => {
    //     storeToken(res.data);
    //     navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setPwd('');
    //     setPermissionState(false);
    //   });
    navigation.navigate('Home');
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
          <Box width={width}>
            <Text
              style={{color: Colors.absentRed, fontFamily: Fonts.spoqaRegular}}>
              올바른 아이디 혹은 비밀번호가 아닙니다.
            </Text>
          </Box>
        </>
      ) : (
        <Box2>
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
        </Box2>
      )}
      {id.length > 0 && pwd.length > 0 ? (
        <GreenButton
          title="로그인"
          style={{backgroundColor: Colors.activeGreen}}
          onPress={login}
        />
      ) : (
        <GreenButton
          title="로그인"
          style={{backgroundColor: Colors.inactiveGray}}
        />
      )}
    </Container>
  );
};

export default Login;
