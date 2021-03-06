import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

// 출석부르는 3가지 방식 Button
const ButtonContainer = styled.View`
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
  font-size: 18px;
  color: ${Colors.backgroundGray};
  text-align: center;
  font-family: ${Fonts.spoqaMedium};
`;

const GreenButton = ({title, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer width={width}>
        <Title>{title}</Title>
      </ButtonContainer>
    </TouchableOpacity>
  );
};

export default GreenButton;
