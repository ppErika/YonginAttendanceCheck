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
  container: {width: 400, backgroundColor: '#fff'},
  head: {height: 45},
  text: {
    fontSize: 16,
    color: Colors.activeGreen,
    fontFamily: Fonts.spoqaRegular,
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

  const table = {
    tableHead: ['학과/이름(학번)', '출결', ''],
    widthArr: [width / 2, width / 6, width / 3],
  };
  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 3; j += 1) {
      if (j === 0) {
        rowData.push('미디어디자인학과\n김예솔(202207011)');
      } else if (j === 1) {
        rowData.push('출석');
      } else {
        rowData.push('');
      }
    }
    tableData.push(rowData);
  }

  const element = (data, index) => (
    <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={styles.btnText}>정정하기</Text>
      </View>
    </TouchableOpacity>
  );

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
        {/* <View style={styles.container}>
          <Table
            widthArr={table.widthArr}
            borderStyle={{
              borderWidth: 1,
              borderColor: Colors.backgroundGray,
            }}>
            <Row
              data={table.tableHead}
              style={styles.head}
              textStyle={styles.text}
              widthArr={table.widthArr}
            />
            <ScrollView>
              {table.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        cellIndex === 2 ? element(cellData, index) : cellData
                      }
                      textStyle={styles.text}
                      widthArr={table.widthArr}
                    />
                  ))}
                </TableWrapper>
              ))}
            </ScrollView>
          </Table>
        </View> */}
        <View style={styles.container}>
          <ScrollView horizontal={true} style={{height: height - 190}}>
            <View>
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
              <ScrollView style={styles.dataWrapper}>
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
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
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
