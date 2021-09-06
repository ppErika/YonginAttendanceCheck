import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

// 로그인 Button
const Container = styled.View`
  width: ${({width}) => width - 40}px;
  height: 50px;
  padding: 13px;
  border-radius: 5px;
`;

// 출석부르는 3가지 방식 Button
const Container2 = styled.View`
  width: ${({width}) => (width - 60) / 3}px;
  background-color: ${Colors.activeGreen};
  height: 140px;
  margin: 30px 5px 5px 5px;
  padding: 24px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  font-family: ${Fonts.spoqaMedium};
`;

const GreenButton = ({title, style, onPress}) => {
  const width = useWindowDimensions().width;
  return title === '로그인' ? (
    <TouchableOpacity onPress={onPress}>
      <Container width={width} style={style}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Container2 width={width}>
        <Title>{title}</Title>
      </Container2>
    </TouchableOpacity>
  );
};

export default GreenButton;
