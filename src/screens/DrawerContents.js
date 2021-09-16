import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  padding-top: 20px;
  flex: 1;
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

export function DrawerContents(props) {
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
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>로그아웃</ItemText>
            </MenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MenuItem>
              <ItemText>환경설정</ItemText>
            </MenuItem>
          </TouchableOpacity>
        </MenuContainer2>
      </DrawerContentScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    fontFamily: Fonts.spoqaMedium,
  },
});
