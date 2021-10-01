import React from 'react';
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
import {Table, Row} from 'react-native-table-component';
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
  text: {
    fontSize: 16,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaRegular,
    textAlign: 'center',
  },
  absetText: {
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  const requestList = route.params.states;
  const requestStd = route.params.studentItems;

  const table = {
    tableHead: ['학과/이름(학번)', '출결', ''],
    widthArr: [width / 2, width / 6, width / 3],
  };

  const element = (value) => (
    <TouchableOpacity onPress={() => Alert.alert('#' + value)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>정정하기</Text>
      </View>
    </TouchableOpacity>
  );

  const tableData = [];

  // 백 연결해서 length와 학생데이터 부분 수정해야 함 (현재는 List 단독페이지 들어갔을 때 에러)
  for (let i = 0; i < requestList.length; i += 1) {
    const rowData = [];
    for (let j = 0; j < 3; j += 1) {
      if (j === 0) {
        rowData.push(
          requestStd[i].departmentId.departmentName +
            '\n' +
            requestStd[i].userName +
            '(' +
            requestStd[i].userId +
            ')',
        );
      } else if (j === 1) {
        switch (requestList[i]) {
          case 0:
            rowData.push('결석');
            break;
          case 1:
            rowData.push('출석');
            break;
          default:
            rowData.pust('');
        }
      } else {
        rowData.push(element(i));
      }
    }
    tableData.push(rowData);
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
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: Colors.backgroundGray,
              }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={table.widthArr}
                  style={styles.row}
                  textStyle={
                    rowData[1] === '결석' ? styles.absetText : styles.text
                  }
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </Container>
      <SaveButton
        title="완료하기"
        style={{backgroundColor: Colors.activeGreen}}
        onPress={() => {
          Alert.alert('저장완료');
        }}
      />
    </>
  );
};

export default List;
