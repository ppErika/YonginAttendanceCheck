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

const AttendanceUserDetail = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [studentList, setStudentList] = useState([]);
  const sortedList = route.params.sortedList;
  const userNum = route.params.userNum;
  const classNum = route.params.classNum;
  const seq = route.params.seq;

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    //파라미터로 studentList를 받아올 때와 아닐 때 구분
    if (route.params.studentList) {
      setStudentList(route.params.studentList);
    } else {
      attByClass();
    }
    console.log(sortedList[0][seq].attendance.user.userName);
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

  async function attByClass() {
    let api = await Api();
    api
      .get(info.apiList.attByClass + '/207')
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attByClass);
      });
  }

  const rowData1 = [];
  const rowData2 = [];
  for (let i = 0; i < studentList.length; i += 1) {
    let tempData1 = [];
    let tempData2 = [];

    tempData1.push('0');
    tempData1.push('0');
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

  for (let i = 0; i < studentList.length; i += 1) {
    heightArr.push(50); // 기본 높이
  }

  const table = {
    tableHead: ['주차', '차시', '총원', '출석', '지각', '결석', ''],
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
                width / 7,
                width / 7,
                width / 7,
                width / 7,
                width / 7,
                width / 7,
                width / 7,
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
                        width / 7,
                        width / 7,
                        width / 7,
                        width / 7,
                        width / 7,
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
                      widthArr={[width / 7, width / 7]}
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
