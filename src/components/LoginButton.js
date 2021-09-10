import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

// 로그인 Button
const LoginContainer = styled.View`
  width: ${({width}) => width - 40}px;
  height: 55px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.backgroundGray};
  text-align: center;
  font-family: ${Fonts.spoqaMedium};
`;

const LoginButton = ({style, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <TouchableOpacity onPress={onPress}>
      <LoginContainer width={width} style={style}>
        <Title>로그인</Title>
      </LoginContainer>
    </TouchableOpacity>
  );
};

export default LoginButton;
