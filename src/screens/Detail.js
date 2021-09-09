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
const Box = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;

const Detail = ({navigation, route, item}) => {
  return (
    <Container>
      <Text
        style={{
          color: Colors.activeGreen,
          fontFamily: Fonts.spoqaBold,
          fontSize: 22,
          margin: 15,
        }}>
        {route.params.item.name}
      </Text>
      <SelectedLecture item={route.params.item} />
      <Box>
        <GreenButton
          title="한명씩 출석"
          onPress={() => navigation.navigate('CheckOneByOne', {item})}
        />
        <GreenButton
          title="리스트 출석"
          onPress={() => navigation.navigate('Home')}
        />
        <GreenButton
          title="출석 OTP 생성"
          onPress={() => navigation.navigate('Home')}
        />
      </Box>
    </Container>
  );
};

export default Detail;
