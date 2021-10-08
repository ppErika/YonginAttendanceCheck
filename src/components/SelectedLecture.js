import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {info, Api} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';

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
  let classList = [];
  let classDetailList = [];
  let userList = [];

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    attUser(item.courses.courseId);
    attGetClass(item.courses.courseId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function attUser(attId) {
    let api = await Api();
    api
      .get(info.apiList.attUser + '/' + attId)
      .then((res) => {
        userList = res.data;
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attUser(attId));
      });
  }

  async function attGetClass(attId) {
    let api = await Api();
    api
      .get(info.apiList.attGetClass + '/' + attId)
      .then(async (res) => {
        classList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          await attByClass(i, res.data[i].classId);
        }
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attGetClass(attId));
      });
  }

  async function attByClass(seq, classId) {
    let api = await Api();
    api
      .get(info.apiList.attByClass + '/' + classId)
      .then((res) => {
        classDetailList[seq] = res.data;
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attByClass(seq, classId));
      });
  }

  async function attToWeek() {
    //주차별 출석 현황 데이터 로딩이 끝나지 않은 상태라면 Alert창을 띄움
    if (classList.length === classDetailList.length) {
      navigation.navigate('AttendanceWeek', {classList, classDetailList});
    } else {
      Alert.alert('데이터를 불러오는 중입니다.');
    }
  }

  async function attToUser() {
    //주차별 출석 현황 데이터 로딩이 끝나지 않은 상태라면 Alert창을 띄움
    if (userList.length !== 0 && classList.length !== 0) {
      //console.log(userList);
      //console.log(classList.length);
      let arr = create2DArray(classList.length, classDetailList[0].length);
      let seq = 0;
      for (let i = 0; i < classList.length; i++) {
        for (let j = 0; j < classDetailList[0].length; j++) {
          arr[i][j] = userList[seq++];
        }
      }

      navigation.navigate('AttendanceUser', {
        userList,
        classNum: classList.length,
        userNum: classDetailList[0].length,
        sortedList: arr,
      });
    } else {
      Alert.alert('데이터를 불러오는 중입니다.');
    }
  }

  function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
      arr[i] = new Array(columns);
    }
    return arr;
  }

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
      <TouchableOpacity onPress={() => attToWeek()}>
        <TabBox>
          <TitleText>주차별 출석현황</TitleText>
          <Image
            source={require('../assets/icons/next-thin.png')}
            style={styles.iconStyle}
          />
        </TabBox>
      </TouchableOpacity>
      <View style={styles.lineStyle} />
      <TouchableOpacity onPress={() => attToUser()}>
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
