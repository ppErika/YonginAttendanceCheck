import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import Input from '../components/Input';
import GreenButton from '../components/GreenButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {CheckBox} from 'react-native-elements';
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
  margin-bottom: 8px;
`;

const Box2 = styled.View`
  width: ${({width}) => width - 40}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-bottom: 42px;
`;

const styles = StyleSheet.create({
  logo: {
    width: 103,
    height: 98,
    marginTop: 65,
    marginBottom: 42,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    backgroundColor: Colors.backgroundColor,
    padding: 0,
  },
  checkboxText: {
    color: Colors.activeGreen,
  },
});

const Login = ({navigation}) => {
  const width = useWindowDimensions().width;
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [checked, setChecked] = useState(false);
  //로그인 실패 했을 때 화면 테스트를 위한 변수 (실패가 false)
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
          <Box width={width}>
            <Text
              style={{color: Colors.absentRed, fontFamily: Fonts.spoqaRegular}}>
              올바른 아이디 혹은 비밀번호가 아닙니다.
            </Text>
          </Box>

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
        </>
      ) : (
        <>
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
        </>
      )}
      <Box2 width={width}>
        <CheckBox
          title="로그인 유지"
          checked={checked ? true : false}
          onPress={() => {
            setChecked(!checked);
          }}
          checkedColor={Colors.activeGreen}
          uncheckedColor={Colors.activeGreen}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          fontFamily={Fonts.spoqaRegular}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />
      </Box2>
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
