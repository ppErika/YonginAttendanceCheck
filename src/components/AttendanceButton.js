import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const AttendanceContainer = styled.View`
  width: ${({width}) => ((width - 48) / 3) * 2}px;
  height: 50px;
  background-color: ${Colors.attendanceGreen};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const AbsenctContainer = styled.View`
  width: ${({width}) => (width - 48) / 3}px;
  height: 50px;
  background-color: ${Colors.absentRed};
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

const AttendanceButton = ({title, style, onPress}) => {
  const width = useWindowDimensions().width;
  return title === '출석' ? (
    <TouchableOpacity onPress={onPress}>
      <AttendanceContainer width={width} style={style}>
        <Title>{title}</Title>
      </AttendanceContainer>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <AbsenctContainer width={width} style={style}>
        <Title>{title}</Title>
      </AbsenctContainer>
    </TouchableOpacity>
  );
};

export default AttendanceButton;
