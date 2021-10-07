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
import {Searchbar} from 'react-native-paper';
import {Table, Row, Col, TableWrapper} from 'react-native-table-component';
import styled from 'styled-components/native';
import SaveButton from '../components/SaveButton';
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
    paddingTop: 15,
  },
  btnText: {
    fontSize: 16,
    fontFamily: Fonts.spoqaRegular,
    textAlign: 'center',
    color: Colors.backgroundGray,
  },
});

const List = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  //const requestList = route.params.states;
  const [studentList, setStudentList] = useState([]);

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    //파라미터로 studentList를 받아올 때와 아닐 때 구분
    if (route.params.studentList) {
      setStudentList(route.params.studentList);
    } else {
      attByClass();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 정정하기 버튼, 그 버튼을 눌렀을 때
  const element = (seq) => (
    <>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            '정정하기',
            table.tableTitle[seq] + '\n\n[' + table.tableData[seq][0] + ']',
            table.tableData[seq][0] === '결석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '지각';
                      setStatus(seq, false);
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '출석';
                      setStatus(seq, true);
                      Alert.alert('출석 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                ]
              : table.tableData[seq][0] === '출석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '지각';
                      setStatus(seq, false);
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '결석';
                      setStatus(seq, false);
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                ]
              : [
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '결석';
                      setStatus(seq, false);
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData[seq][0] = '출석';
                      setStatus(seq, true);
                      Alert.alert('출석 처리 완료');
                    },
                    style: 'cancel',
                  },
                ],
          )
        }>
        <View style={styles.btn}>
          <Text style={styles.btnText}>정정하기</Text>
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

  //출결정보를 수정할 때 백엔드에 보낼 데이터 수정
  function setStatus(seq, bool) {
    var arrayCopy = [...studentList];
    bool ? (arrayCopy[seq].status = '1') : (arrayCopy[seq].status = '0');
    setStudentList(arrayCopy);
  }

  // 출석, 결석, 지각 인원 체크
  function count() {
    var countArr = [0, 0, 0];
    table.tableData.map((data, i) => {
      data[0] === '결석'
        ? (countArr[0] += 1)
        : data[0] === '출석'
        ? (countArr[1] += 1)
        : (countArr[2] += 1);
    });

    Alert.alert(
      '저장완료',
      '총원: ' +
        table.tableData.length +
        '\n출석: ' +
        countArr[1] +
        ' 결석: ' +
        countArr[0] +
        ' 지각: ' +
        countArr[2],
    );
  }

  async function attUpdate(data) {
    let api = await Api();
    api
      .patch(info.apiList.attUpdate, data)
      .then((res) => {
        console.log('att update\n');
        console.log(res.status);
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attUpdate);
      });
  }

  async function saveChanges() {
    let changes = [];
    for (let i = 0; i < studentList.length; i += 1) {
      let change = {
        attendanceId: `${studentList[i].atdId}`,
        status: `${studentList[i].status}`,
      };
      changes.push(change);
    }
    await attUpdate(changes);
    count();
  }

  const titleData = [];
  const rowData = [];
  for (let i = 0; i < studentList.length; i += 1) {
    const tempStatusData = [];

    for (let j = 0; j < 3; j += 1) {
      if (j === 0) {
        titleData.push(
          studentList[i].user.departmentId.departmentName +
            '\n' +
            studentList[i].user.userName +
            '(' +
            studentList[i].user.userId +
            ')',
        );
      } else if (j === 1) {
        switch (studentList[i].status) {
          case '0':
            tempStatusData.push('결석');
            break;
          case '1':
            tempStatusData.push('출석');
            break;
          case '2':
            tempStatusData.push('지각');
            break;
          default:
            tempStatusData.push('');
        }
      } else {
        tempStatusData.push(element(i));
      }
    }
    rowData.push(tempStatusData);
  }

  // height 길이 조절하는 부분
  const heightArr0 = [];
  const heightArr1 = [];

  for (let i = 0; i < studentList.length; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      heightArr0.push(15); // 학과 높이
      heightArr0.push(35); // 이름(학번) 높이
    }
    heightArr1.push(50); // 기본 높이
  }

  const table = {
    tableHead: ['학과/이름(학번)', '출결', ''], // 0번째 row
    tableTitle: titleData, // 학과/이름(학번)
    tableData: rowData, // 출결과 버튼
  };

  return (
    <>
      <Container>
        <Searchbar
          placeholder="검색하기"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            width: width - 40,
            height: 40,
            borderRadius: 25,
            marginBottom: 10,
          }}
          inputStyle={{fontSize: 14, fontFamily: Fonts.spoqaRegular}}
          iconColor={Colors.activeGreen}
        />
        <View style={{height: height - 190, backgroundColor: '#fff'}}>
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor: Colors.backgroundGray,
            }}>
            <Row
              data={table.tableHead}
              widthArr={[width / 2, width / 6, width / 3]}
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
                <Col
                  data={table.tableTitle}
                  style={styles.title}
                  heightArr={heightArr1}
                  width={width / 2}
                  textStyle={styles.infoText}
                />
                <Table>
                  {table.tableData.map((data, index) => (
                    <Row
                      key={index}
                      data={data}
                      widthArr={[width / 6, width / 3]}
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
      <SaveButton
        title="완료하기"
        style={{backgroundColor: Colors.activeGreen}}
        onPress={() => {
          saveChanges();
        }}
      />
    </>
  );
};

export default List;
