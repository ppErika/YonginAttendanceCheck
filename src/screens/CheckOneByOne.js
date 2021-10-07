import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Card} from 'react-native-elements';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import SaveButton from '../components/SaveButton';
import AttendanceButton from '../components/AttendanceButton';
import {info, Api} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;

const Box = styled.View`
  width: ${({width}) => width - 60}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const InfoBox = styled.View`
  align-items: center;
  flex-direction: column;
`;

const ButtonBox = styled.View`
  width: ${({width}) => width - 40}px;
  align-items: center;
  flex-direction: row;
`;

const studentItems1 = [
  {
    id: 1,
    code: 200000001,
    name: '김땡땡',
    photo: require('../assets/1.jpg'),
  },
  {
    id: 2,
    code: 200000002,
    name: '이땡땡',
    photo: require('../assets/2.jpg'),
  },
  {
    id: 3,
    code: 200000003,
    name: '박땡땡',
    photo: require('../assets/3.jpg'),
  },
  {
    id: 4,
    code: 200000004,
    name: '최땡땡',
    photo: require('../assets/1.jpg'),
  },
  {
    id: 5,
    code: 200000005,
    name: '정땡땡',
    photo: require('../assets/2.jpg'),
  },
  {
    id: 6,
    code: 200000006,
    name: '한땡땡',
    photo: require('../assets/3.jpg'),
  },
];

const styles = StyleSheet.create({
  iconStyle: {
    width: 23,
    height: 23,
    margin: 0,
    resizeMode: 'contain',
  },
  cardImageStyle: {
    width: 221,
    height: 269,
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

const CheckOneByOne = ({navigation, route}) => {
  const item = route.params.item;
  const width = useWindowDimensions().width;
  const [seq, setSeq] = useState(1); // 현재 번호
  const [quota, setQuota] = useState(0); // 총 인원
  const progress = seq / quota;
  //const [states, setStates] = useState([]);
  const [studentItems, setStudentItems] = useState([]);

  // 출결 체크 true == 출석
  function ChangeAttendanceStates(i, bool) {
    var arrayCopy = [...studentItems];
    if (bool === true) {
      arrayCopy[i].status = 1;
    } else {
      arrayCopy[i].status = 0;
    }
    setStudentItems(arrayCopy);
    console.log(studentItems[i].user.userName);
    console.log(studentItems[i].status);
  }

  async function attByClass() {
    let api = await Api();
    api
      .get(info.apiList.attByClass + '/207')
      .then((res) => {
        setStudentItems(res.data);
        setQuota(res.data.length);
      })
      .catch((error) => {
        //에러 처리, 토큰 재발급을 위해 error, function을 넘겨줌
        ErrorHandler(error, attByClass);
      });
  }

  useEffect(() => {
    attByClass();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container>
        <Progress.Bar
          progress={progress}
          width={width}
          height={7}
          borderRadius={0}
          borderWidth={0}
          unfilledColor={Colors.inactiveGray}
          color={Colors.activeGreen}
        />
        <Text
          style={{
            color: Colors.activeGreen,
            fontFamily: Fonts.spoqaMedium,
            fontSize: 16,
            marginTop: 12,
            marginBottom: 15,
          }}>
          {seq}/{quota}
        </Text>
        <Box width={width}>
          {seq === 1 ? (
            <View style={{width: 23, height: 23}} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSeq(seq - 1);
              }}
              hitSlop={{bottom: 60, top: 60, left: 15, right: 20}}>
              <Image
                source={require('../assets/icons/previous-arrow.png')}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          )}
          <Card
            containerStyle={{
              width: 221,
              heigth: 330,
              borderRadius: 5,
              padding: 0,
              marginHorizontal: 38,
              marginBottom: 30,
            }}>
            <Card.Image
              source={require('../assets/1.jpg')}
              style={styles.cardImageStyle}
            />
            <InfoBox>
              <Text
                style={{
                  color: Colors.activeGreen,
                  fontFamily: Fonts.spoqaBold,
                  fontSize: 20,
                  marginTop: 12,
                  marginBottom: 5,
                }}>
                {Object.keys(studentItems).length === 0
                  ? '학생 데이터가 없습니다.'
                  : studentItems[seq - 1].user.userName}
              </Text>
              <Text
                style={{
                  color: Colors.activeGreen,
                  fontFamily: Fonts.spoqaMedium,
                  fontSize: 16,
                  marginBottom: 12,
                }}>
                {Object.keys(studentItems).length === 0
                  ? '학생 데이터가 없습니다.'
                  : studentItems[seq - 1].user.userId}
              </Text>
            </InfoBox>
          </Card>

          {seq === quota ? (
            <View style={{width: 23, heigth: 23}} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSeq(seq + 1);
              }}
              hitSlop={{bottom: 60, top: 60, left: 20, right: 15}}>
              <Image
                source={require('../assets/icons/next-arrow.png')}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          )}
        </Box>
        <ButtonBox width={width}>
          {Object.keys(studentItems).length === 0 ? (
            <>
              <AttendanceButton
                title="결석"
                style={{marginRight: 8, backgroundColor: Colors.inactiveGray}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, false);
                }}
              />
              <AttendanceButton
                title="출석"
                style={{marginRight: 8, backgroundColor: Colors.inactiveGray}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, true);
                }}
              />
            </>
          ) : studentItems[seq - 1].status === 1 ? (
            <>
              <AttendanceButton
                title="결석"
                style={{marginRight: 8, backgroundColor: Colors.inactiveGray}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, false);
                }}
              />
              <AttendanceButton
                title="출석"
                style={{backgroundColor: Colors.attendanceGreen}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, true);
                }}
              />
            </>
          ) : (
            <>
              <AttendanceButton
                title="결석"
                style={{marginRight: 8, backgroundColor: Colors.absentRed}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, false);
                }}
              />
              <AttendanceButton
                title="출석"
                style={{backgroundColor: Colors.inactiveGray}}
                onPress={() => {
                  seq === quota ? null : setSeq(seq + 1);
                  ChangeAttendanceStates(seq - 1, true);
                }}
              />
            </>
          )}
        </ButtonBox>
      </Container>
      {seq === quota ? (
        <SaveButton
          title="완료하기"
          style={{backgroundColor: Colors.activeGreen}}
          onPress={() => {
            // Alert.alert('출석이 저장되었습니다.' + states);
            navigation.navigate('List', {item, studentItems});
          }}
        />
      ) : (
        <SaveButton
          title="완료하기"
          style={{backgroundColor: Colors.inactiveGray}}
        />
      )}
    </>
  );
};

export default CheckOneByOne;
