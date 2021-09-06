import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  width: ${({width}) => width - 40}px;
  background-color: #ffffff;
  padding: 26px 20px;
  margin: 7px;
  border-radius: 5px;
`;

const TimeText = styled.Text`
  font-family: ${Fonts.spoqaMedium};
  color: ${Colors.activeGreen};
  font-size: 18px;
  margin-bottom: 4px;
`;

const TitleText = styled.Text`
  font-family: ${Fonts.spoqaBold};
  color: ${Colors.activeGreen};
  font-size: 20px;
`;

const Lecture = ({item, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <TouchableOpacity onPress={onPress}>
      <Container width={width}>
        <TimeText>{item.time}</TimeText>
        <TitleText>{item.name}</TitleText>
      </Container>
    </TouchableOpacity>
  );
};

export default Lecture;
