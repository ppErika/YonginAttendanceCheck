import React from 'react';
import {useWindowDimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  width: ${({width}) => width - 40}px;
  background-color: #ffffff;
  padding: 25px 20px;
  margin: 7px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${Colors.boxBorderGreen};
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
  margin-bottom: 7px;
`;

const EtcText = styled.Text`
  font-family: ${Fonts.spoqaRegular};
  color: ${Colors.activeGreen};
  font-size: 16px;
`;

const DetailedLecture = ({item, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <TouchableOpacity onPress={onPress}>
      <Container width={width}>
        <TimeText>{item.time}</TimeText>
        <TitleText>{item.name}</TitleText>
        <EtcText>{item.professor}</EtcText>
        <EtcText>{item.lectureRoom}</EtcText>
      </Container>
    </TouchableOpacity>
  );
};

export default DetailedLecture;
