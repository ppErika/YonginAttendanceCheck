import React from 'react';
import styled from 'styled-components/native';
import SelectedLecture from '../components/SelectedLecture';
import GreenButton from '../components/GreenButton';

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

const Detail = ({navigation, route}) => {
  const item = route.params.item;
  return (
    <Container>
      <SelectedLecture navigation={navigation} item={route.params.item} />
      <ButtonBox>
        <GreenButton
          title="한명씩 출석"
          onPress={() => navigation.navigate('CheckOneByOne', {item})}
        />
        <GreenButton
          title="리스트 출석"
          onPress={() => navigation.navigate('List', {item})}
        />
        <GreenButton title="출석 OTP 생성" />
      </ButtonBox>
    </Container>
  );
};

export default Detail;
