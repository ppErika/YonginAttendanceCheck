import React, {useState, useEffect} from 'react';
import {
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

const AttendanceUser = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const userList = route.params.userList;
  const userNum = route.params.userNum;
  const classNum = route.params.classNum;
  let sortedList = [];

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    sort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 정정하기 버튼, 그 버튼을 눌렀을 때
  const element = (seq) => (
    <>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>상세</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  function sort() {
    let arr = create2DArray(classNum, userNum);
    let seq = 0;
    for (let i = 0; i < classNum; i++) {
      for (let j = 0; j < userNum; j++) {
        //console.log(seq);
        //console.log(userList[seq++]);
        arr[i][j] = userList[seq++];
      }
    }
    sortedList = arr;
  }

  function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
      arr[i] = new Array(columns);
    }
    return arr;
  }

  const rowData1 = [];
  const rowData2 = [];
  for (let i = 0; i < userNum; i += 1) {
    let tempData1 = [];
    let tempData2 = [];

    tempData1.push('0');
    tempData1.push('0');
    tempData1.push('0');

    tempData2.push('0');
    tempData2.push(element(i));

    rowData1.push(tempData1);
    rowData2.push(tempData2);
  }

  // height 길이 조절하는 부분
  const heightArr = [];

  for (let i = 0; i < userNum; i += 1) {
    heightArr.push(50); // 기본 높이
  }

  const table = {
    tableHead: ['학과/이름(학번)', '출석', '지각', '결석', ''],
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
                (width * 10) / 23,
                (width * 3) / 23,
                (width * 3) / 23,
                (width * 3) / 23,
                (width * 4) / 23,
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
                        (width * 10) / 23,
                        (width * 3) / 23,
                        (width * 3) / 23,
                      ]}
                      style={styles.row}
                      textStyle={
                        data[0] === '결석' ? styles.absentText : styles.text
                      }
                    />
                  ))}
                </Table>
                <Table>
                  {table.tableData2.map((data, index) => (
                    <Row
                      key={index}
                      data={data}
                      widthArr={[(width * 3) / 23, (width * 4) / 23]}
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

export default AttendanceUser;
