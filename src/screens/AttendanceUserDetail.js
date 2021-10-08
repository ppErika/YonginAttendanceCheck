import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Table, Row, TableWrapper} from 'react-native-table-component';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {info, Api} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;

const styles = StyleSheet.create({
  head: {height: 45},
  majorText: {
    fontSize: 12,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaRegular,
    marginLeft: 20,
  },
  stdText: {
    fontSize: 18,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaMedium,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 16,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaMedium,
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaRegular,
    textAlign: 'center',
  },
  absentText: {
    fontSize: 16,
    color: Colors.absentRed,
    fontFamily: Fonts.spoqaBold,
    textAlign: 'center',
  },
  wrapper: {flexDirection: 'row'},
  row: {height: 50},
  btn: {
    height: 50,
    backgroundColor: Colors.activeGreen,
    paddingTop: 14,
  },
  btnText: {
    fontSize: 16,
    fontFamily: Fonts.spoqaRegular,
    textAlign: 'center',
    color: Colors.backgroundGray,
  },
});

const AttendanceUserDetail = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const sortedList = route.params.sortedList;
  const userNum = route.params.userNum;
  const classNum = route.params.classNum;
  const seq = route.params.seq;

  // 정정하기 버튼, 그 버튼을 눌렀을 때
  const element = (seq) => (
    <>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            '정정하기',
            table.tableData1[seq][0] +
              ' ' +
              table.tableData1[seq][1] +
              ' ' +
              table.tableData1[seq][2] +
              '\n\n[' +
              table.tableData2[seq][0] +
              ']',
            table.tableData2[seq][0] === '결석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '지각';
                      //setStatus(seq, false);
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '출석';
                      //setStatus(seq, true);
                      Alert.alert('출석 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                ]
              : table.tableData2[seq][0] === '출석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '지각';
                      //setStatus(seq, false);
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '결석';
                      //setStatus(seq, false);
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                ]
              : [
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '결석';
                      //setStatus(seq, false);
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData2[seq][0] = '출석';
                      //setStatus(seq, true);
                      Alert.alert('출석 처리 완료');
                    },
                    style: 'cancel',
                  },
                ],
          )
        }>
        <View style={styles.btn}>
          <Text style={styles.btnText}>정정</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  const rowData1 = [];
  const rowData2 = [];
  for (let i = 0; i < classNum; i += 1) {
    let tempData1 = [];
    let tempData2 = [];
    console.log(sortedList[i][seq]);
    tempData1.push(sortedList[i][seq].attendance.corClass.week + '주차');
    tempData1.push(sortedList[i][seq].attendance.corClass.round + '차시');

    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var dayOfWeek =
      week[
        new Date(
          sortedList[i][seq].attendance.corClass.sessionDate.substring(0, 10),
        ).getDay()
      ];
    tempData1.push(
      sortedList[i][seq].attendance.corClass.sessionDate.substring(0, 10) +
        '(' +
        dayOfWeek +
        ')',
    );

    switch (sortedList[i][seq].status) {
      case '0':
        tempData2.push('결석');
        break;
      case '1':
        tempData2.push('출석');
        break;
      case '2':
        tempData2.push('지각');
        break;
      default:
        tempData2.push('');
    }
    tempData2.push(element(i));

    rowData1.push(tempData1);
    rowData2.push(tempData2);
  }

  // height 길이 조절하는 부분
  const heightArr = [];

  for (let i = 0; i < classNum; i += 1) {
    heightArr.push(50); // 기본 높이
  }

  const table = {
    tableHead: ['주차', '차시', '강의 일자(요일)', '출결', ''],
    tableData1: rowData1,
    tableData2: rowData2,
  };

  return (
    <>
      <Container>
        <View style={{height: height - 76, backgroundColor: '#fff'}}>
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor: Colors.backgroundGray,
            }}>
            <Row
              data={table.tableHead}
              widthArr={[
                (width * 3) / 21,
                (width * 3) / 21,
                (width * 8) / 21,
                (width * 3) / 21,
                (width * 4) / 21,
              ]}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: Colors.backgroundGray,
              }}>
              <TableWrapper style={styles.wrapper}>
                <Table>
                  {table.tableData1.map((data, index) => (
                    <Row
                      key={index}
                      data={data}
                      widthArr={[
                        (width * 3) / 21,
                        (width * 3) / 21,
                        (width * 8) / 21,
                      ]}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
                <Table>
                  {table.tableData2.map((data, index) => (
                    <Row
                      key={index}
                      data={data}
                      widthArr={[(width * 3) / 21, (width * 4) / 21]}
                      style={styles.row}
                      textStyle={
                        data[0] === '결석' ? styles.absentText : styles.text
                      }
                    />
                  ))}
                </Table>
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </Container>
    </>
  );
};

export default AttendanceUserDetail;
