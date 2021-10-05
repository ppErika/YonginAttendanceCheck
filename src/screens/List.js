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
  row: {height: 50, flexDirection: 'row'},
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
  const requestList = route.params.states;
  const requestStd = route.params.studentItems;

  const table = {
    tableHead: ['학과/이름(학번)', '출결', ''],
    widthArr: [width / 2, width / 6, width / 3],
  };

  // 정정하기 버튼, 그 버튼을 눌렀을 때
  const element = (value) => (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          '정정하기',
          tableData.stdInfo[value * 2] +
            '\n' +
            tableData.stdInfo[value * 2 + 1] +
            '\n\n[' +
            tableData.stateInfo[value] +
            ']',
          [
            {
              text: '지각으로 변경',
              onPress: () => {
                tableData.stateInfo[value] = '지각';
                Alert.alert('지각 처리 완료');
              },
              style: 'cancel',
            },
            {
              text: '출석으로 변경',
              onPress: () => {
                tableData.stateInfo[value] = '출석';
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
  );

  // 백 연결해서 length와 학생데이터 부분 수정해야 함 (현재는 List 단독페이지 들어갔을 때
  // row
  // for (let i = 0; i < requestList.length; i += 1) {
  //   const rowData = [];
  //   for (let j = 0; j < 3; j += 1) {
  //     if (j === 0) {
  //       rowData.push(
  //         requestStd[i].departmentId.departmentName +
  //           '\n' +
  //           requestStd[i].userName +
  //           '(' +
  //           requestStd[i].userId +
  //           ')',
  //       );
  //     } else if (j === 1) {
  //       switch (requestList[i]) {
  //         case 0:
  //           rowData.push('결석');
  //           break;
  //         case 1:
  //           rowData.push('출석');
  //           break;
  //         case 2:
  //           rowData.push('지각');
  //           break;
  //         default:
  //           rowData.pust('');
  //       }
  //     } else {
  //       rowData.push(element(i));
  //     }
  //   }
  //   tableData.push(rowData);
  // }

  // useEffect(() => {}, [tableData]);
  // eslint-disable-line react-hooks/exhaustive-deps

  const colData0 = []; // 학과/이름(학번)
  const colData1 = []; // 출결
  const colData2 = []; // 버튼이 들어가는 부분

  // column
  for (let i = 0; i < 3; i += 1) {
    if (i === 0) {
      for (let j = 0; j < requestList.length; j += 1) {
        colData0.push(requestStd[j].departmentId.departmentName);
        colData0.push(
          requestStd[j].userName + '(' + requestStd[j].userId + ')',
        );
      }
    } else {
      for (let j = 0; j < requestList.length; j += 1) {
        if (i === 1) {
          switch (requestList[j]) {
            case 0:
              colData1.push('결석');
              break;
            case 1:
              colData1.push('출석');
              break;
            default:
              colData1.pust(''); // 입력값이 없을 경우
          }
        } else {
          colData2.push(element(j));
        }
      }
    }
  }

  const tableData = {
    stdInfo: colData0, // 학과/이름(학번)
    stateInfo: colData1, // 출결
    btnInfo: colData2, // 버튼
  };

  // height 길이 조절하는 부분
  const heightArr0 = [];
  const heightArr1 = [];

  for (let i = 0; i < requestList.length; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      heightArr0.push(15); // 학과 높이
      heightArr0.push(35); // 이름(학번) 높이
    }
    heightArr1.push(50); // 기본 높이
  }

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
              widthArr={table.widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView>
            {/* <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: Colors.backgroundGray,
              }}>
              {tableData
                .filter((rowData) => {
                  if (searchQuery.length === 0) {
                    return rowData;
                  } else if (
                    rowData[0].toLowerCase().includes(searchQuery.toLowerCase())
                  ) {
                    return rowData;
                  }
                })
                .map((rowData, index) => {
                  return (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={table.widthArr}
                      style={styles.row}
                      textStyle={
                        rowData[1] === '결석' ? styles.absetText : styles.text
                      }
                    />
                  );
                })}
            </Table> */}
            <Table
              style={{flexDirection: 'row'}}
              borderStyle={{
                borderWidth: 1,
                borderColor: Colors.backgroundGray,
              }}>
              <TableWrapper style={{width: width, flexDirection: 'row'}}>
                <Col
                  data={tableData.stdInfo}
                  heightArr={heightArr0}
                  width={width / 2}
                  textStyle={
                    // 수정해야할 부분 - 전공, 이름(학번) 스타일 각각 적용하기
                    heightArr0 % 2 === 0 ? styles.majorText : styles.stdText
                  }
                />
                <Col
                  data={tableData.stateInfo}
                  heightArr={heightArr1}
                  width={width / 6}
                  textStyle={
                    // 수정해야할 부분 - 결석 textStyle 적용하기
                    tableData.stateInfo === '결석'
                      ? styles.absentText
                      : styles.text
                  }
                />
                <Col
                  data={tableData.btnInfo}
                  heightArr={heightArr1}
                  width={width / 3}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </Container>
      <SaveButton
        title="완료하기"
        style={{backgroundColor: Colors.activeGreen}}
        onPress={() => {
          Alert.alert('저장완료', '총원: ' + tableData.length);
        }}
      />
    </>
  );
};

export default List;
