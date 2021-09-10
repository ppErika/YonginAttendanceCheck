import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import SelectedLecture from '../components/SelectedLecture';
import GreenButton from '../components/GreenButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;
const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;

const Detail = ({navigation, route, item}) => {
  const lectureName = route.params.item.name;
  return (
    <Container>
      <SelectedLecture item={route.params.item} />
      <ButtonBox>
        <GreenButton
          title="한명씩 출석"
          onPress={() => navigation.navigate('CheckOneByOne', {lectureName})}
        />
        <GreenButton
          title="리스트 출석"
          onPress={() => navigation.navigate('Home')}
        />
        <GreenButton
          title="출석 OTP 생성"
          onPress={() => navigation.navigate('AxiosSample')}
        />
      </ButtonBox>
    </Container>
  );
};

export default Detail;
