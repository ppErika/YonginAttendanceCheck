import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  width: ${({width}) => width - 40}px;
  background-color: #ffffff;
  padding: 25px 20px 13px 20px;
  margin-top: 40px;
  border-radius: 5px;
`;

const InfoBox = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
`;

const TabBox = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  padding-vertical: 3px;
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

const styles = StyleSheet.create({
  iconStyle: {
    width: 18,
    height: 18,
    margin: 0,
    resizeMode: 'contain',
  },
  lineStyle: {
    borderBottomColor: Colors.inactiveGray,
    borderBottomWidth: 1,
    marginHorizontal: 3,
    marginVertical: 10,
  },
});

const SelectedLecture = ({navigation, item, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <Container width={width}>
      <InfoBox onPress={onPress}>
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
      </InfoBox>
      <View style={styles.lineStyle} />
      <TouchableOpacity
        onPress={() => navigation.navigate('AttendanceWeek', {item})}>
        <TabBox>
          <TitleText>주차별 출석현황</TitleText>
          <Image
            source={require('../assets/icons/next-thin.png')}
            style={styles.iconStyle}
          />
        </TabBox>
      </TouchableOpacity>
      <View style={styles.lineStyle} />
      <TouchableOpacity
        onPress={() => navigation.navigate('AttendanceUser', {item})}>
        <TabBox>
          <TitleText>학생별 출석현황</TitleText>
          <Image
            source={require('../assets/icons/next-thin.png')}
            style={styles.iconStyle}
          />
        </TabBox>
      </TouchableOpacity>
    </Container>
  );
};

export default SelectedLecture;
