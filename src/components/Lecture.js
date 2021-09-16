import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const DetailInfoContainer = styled.View`
  width: ${({width}) => width - 40}px;
  background-color: #ffffff;
  padding: 25px 20px;
  margin: 7px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${Colors.boxBorderGreen};
`;

const InfoContainer = styled.View`
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

const EtcText = styled.Text`
  font-family: ${Fonts.spoqaRegular};
  color: ${Colors.activeGreen};
  font-size: 16px;
  margin-top: 7px;
`;

const Lecture = ({item, onPress}) => {
  const width = useWindowDimensions().width;
  return item.courses.starttime === '09:25' ? (
    <TouchableOpacity onPress={onPress}>
      <DetailInfoContainer width={width}>
        <TimeText>
          {item.courses.daynm} {item.courses.starttime} ~ {item.courses.endtime}
        </TimeText>
        <TitleText>{item.courses.courseName}</TitleText>
        <EtcText>
          {Object.keys(item.courseOwners).length === 0
            ? '교수 정보가 없습니다.'
            : item.courseOwners[0].userName + ' 교수'}
          {item.courseOwners.userName}
        </EtcText>
        <EtcText>
          {item.courses.roomnm}, {item.courses.grade}학점
        </EtcText>
      </DetailInfoContainer>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <InfoContainer width={width}>
        <TimeText>
          {item.courses.daynm} {item.courses.starttime} ~ {item.courses.endtime}
        </TimeText>
        <TitleText>{item.courses.courseName}</TitleText>
      </InfoContainer>
    </TouchableOpacity>
  );
};

export default Lecture;
