import React from 'react';
import {TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {getToken, removeToken} from '../store/EncryptedStorage';
import {info, LoginApi} from '../api/BaseApi';

const Container = styled.View`
  padding-top: 20px;
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

const Profile = styled.View`
  padding-top: 70px;
  padding-bottom: 16px;
`;

const ProfileText = styled.Text`
  font-family: ${Fonts.spoqaBold};
  color: ${Colors.activeGreen};
  font-size: 25px;
  margin-left: 40px;
`;

const MenuItem = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 12px;
  padding-vertical: 3px;
`;

const ItemText = styled.Text`
  font-family: ${Fonts.spoqaRegular};
  color: ${Colors.activeGreen};
  font-size: 18px;
  margin-left: 40px;
`;

const MenuContainer1 = styled.View`
  margin-top: 20px;
`;

const MenuContainer2 = styled.View`
  margin-top: 60px;
`;

export function DrawerContents({navigation}) {
  async function logout() {
    console.log('logout');
    let data = await getToken();
    let token = JSON.parse(data).token;
    LoginApi()
      .delete(info.apiList.logout, {data: token})
      .then(async (res) => {
        //로그아웃 성공시 백엔드에서 204코드 반환
        if (res.status === 204) {
          removeToken();
          navigation.navigate('Login');
        } else {
          console.log(res.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Container>
      <Profile>
        <ProfileText>이완주 교수</ProfileText>
      </Profile>
      <DrawerContentScrollView>
        <MenuContainer1>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>강의목록</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>주차별 출석현황</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>학생별 출석현황</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>알림</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>건의사항</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>출석시간설정</ItemText>
            </MenuItem>
          </TouchableOpacity>
        </MenuContainer1>
        <MenuContainer2>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <MenuItem>
              <ItemText>로그아웃</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>환경설정</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AxiosSample');
            }}>
            <MenuItem>
              <ItemText>테스트 페이지</ItemText>
            </MenuItem>
          </TouchableOpacity>
        </MenuContainer2>
      </DrawerContentScrollView>
    </Container>
  );
}
