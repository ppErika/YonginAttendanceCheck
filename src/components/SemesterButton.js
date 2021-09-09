import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

// 학기 활성 버튼 (초록색)
const ActiveContainer = styled.View`
  background-color: ${Colors.activeGreen};
  padding: 5px 13px;
  margin-right: 7px;
  border-radius: 25px;
`;

const ActiveTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.backgroundGray};
  font-family: ${Fonts.spoqaMedium};
  text-align: center;
`;

// 학기 비활성 버튼 (회색)
const InactiveContainer = styled.View`
  background-color: ${Colors.filterGray};
  padding: 5px 13px;
  margin-right: 7px;
  border-radius: 25px;
`;

const InActiveTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.activeGreen};
  font-family: ${Fonts.spoqaMedium};
  text-align: center;
`;

const SemesterButton = ({activeSemesterButton, title, onPress}) => {
  return activeSemesterButton === true ? (
    <TouchableOpacity onPress={onPress}>
      <ActiveContainer>
        <ActiveTitle>{title}</ActiveTitle>
      </ActiveContainer>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <InactiveContainer>
        <InActiveTitle>{title}</InActiveTitle>
      </InactiveContainer>
    </TouchableOpacity>
  );
};

export default SemesterButton;
