import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {info, LoginApi} from '../api/BaseApi';
import {storeToken} from '../store/EncryptedStorage';
import {CheckBox} from 'react-native-elements';

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
  // 로그인 실패 했을 때 화면 테스트를 위한 변수 (실패가 false)
  const [permissionState, setPermissionState] = useState(true);
  const [checked, setChecked] = useState(false);

  function login() {
    let type = 1;
    if (checked) {
      type = 2;
    }
    const data = {
      userId: id,
      password: pwd,
      userType: type, //학생 1, 교수 2
    };
    LoginApi()
      .post(info.apiList.login, data)
      .then((res) => {
        storeToken(res.data);
        setPwd('');
        setPermissionState(true);
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
        <InputBundleBox>
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
          <CheckBox
            title="교수자 로그인"
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
          <CautionBox width={width}>
            <Text
              style={{color: Colors.absentRed, fontFamily: Fonts.spoqaRegular}}>
              올바른 아이디 혹은 비밀번호가 아닙니다.
            </Text>
          </CautionBox>
        </InputBundleBox>
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
          <CheckBox
            title="교수자 로그인"
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
