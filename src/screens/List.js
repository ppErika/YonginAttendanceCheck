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
  const requestList = route.params.states;
  const requestStd = route.params.studentItems;
  const [personnel, setPersonnel] = useState([0, 0, 0]); // 결석(0), 출석(1), 지각(2) 순

  // 정정하기 버튼, 그 버튼을 눌렀을 때
  const element = (value) => (
    <>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            '정정하기',
            table.tableTitle[value] + '\n\n[' + table.tableData[value][0] + ']',
            table.tableData[value][0] === '결석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '지각';
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '출석';
                      Alert.alert('출석 처리 완료');
                    },
                    style: 'cancel', // ios only
                  },
                ]
              : table.tableData[value][0] === '출석'
              ? [
                  {
                    text: '지각으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '지각';
                      Alert.alert('지각 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '결석';
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                ]
              : [
                  {
                    text: '결석으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '결석';
                      Alert.alert('결석 처리 완료');
                    },
                    style: 'cancel',
                  },
                  {
                    text: '출석으로 변경',
                    onPress: () => {
                      table.tableData[value][0] = '출석';
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

  // 출석, 결석, 지각 인원 체크
  function CountPersonnel() {
    var tempArr = [0, 0, 0];
    table.tableData.map((data, i) => {
      data[0] === '결석'
        ? (tempArr[0] += 1)
        : data[0] === '출석'
        ? (tempArr[1] += 1)
        : (tempArr[2] += 1);
    });
    setPersonnel(tempArr);
  }

  // 백 연결해서 length와 학생데이터 부분 수정해야 함 (현재는 List 단독페이지 들어갔을 때
  // row
  const titleData = [];
  const rowData = [];
  for (let i = 0; i < requestList.length; i += 1) {
    const tempStateData = [];

    for (let j = 0; j < 3; j += 1) {
      if (j === 0) {
        titleData.push(
          requestStd[i].user.departmentId.departmentName +
            '\n' +
            requestStd[i].user.userName +
            '(' +
            requestStd[i].user.userId +
            ')',
        );
      } else if (j === 1) {
        switch (requestList[i]) {
          case 0:
            tempStateData.push('결석');
            break;
          case 1:
            tempStateData.push('출석');
            break;
          case 2:
            tempStateData.push('지각');
            break;
          default:
            tempStateData.push('');
        }
      } else {
        tempStateData.push(element(i));
      }
    }
    rowData.push(tempStateData);
  }

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
                  textStyle={
                    // 수정해야할 부분 (학과/이름(학번) style)
                    styles.infoText
                  }
                />
                <Table>
                  {table.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={[width / 6, width / 3]}
                      style={styles.row}
                      textStyle={
                        rowData[0] === '결석' ? styles.absentText : styles.text
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
          CountPersonnel();
          Alert.alert(
            '저장완료',
            '총원: ' +
              table.tableData.length +
              '\n출석: ' +
              personnel[1] +
              ' 결석: ' +
              personnel[0] +
              ' 지각: ' +
              personnel[2],
          );
        }}
      />
    </>
  );
};

export default List;
