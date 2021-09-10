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

const studentItems = [
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

const CheckOneByOne = ({navigation, route, lectureName}) => {
  const width = useWindowDimensions().width;
  const [seq, setSeq] = useState(1); // 현재 번호
  const [quota, setQuota] = useState(studentItems.length); // 총 인원
  const progress = seq / quota;
  const [states, setStates] = useState([0, 0, 0, 0, 0, 0]);

  // 출석으로 체크 (1)
  function ChangeAttendanceStates(i) {
    var arrayCopy = [...states];
    arrayCopy[i] = 1;
    setStates(arrayCopy);
  }

  // 결석으로 체크 (0)
  function ChangeAbsentStates(i) {
    var arrayCopy = [...states];
    arrayCopy[i] = 0;
    setStates(arrayCopy);
  }

  // quota 만큼 states 배열길이 늘려주기
  function AddStates() {
    var arrayCopy = [...states];
    studentItems.map(arrayCopy.unshift(0));
    setStates(arrayCopy);
  }

  // 마운트 시에 AddStates부르기 (미동작)
  // useEffect(() => {
  //   AddStates();
  // }, []);

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
            marginBottom: 32,
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
              marginBottom: 49,
            }}>
            <Card.Image
              source={studentItems[seq - 1].photo}
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
                {studentItems[seq - 1].name}
              </Text>
              <Text
                style={{
                  color: Colors.activeGreen,
                  fontFamily: Fonts.spoqaMedium,
                  fontSize: 16,
                  marginBottom: 12,
                }}>
                {studentItems[seq - 1].code}
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
          <AttendanceButton
            title="결석"
            style={{marginRight: 8}}
            onPress={() => {
              seq === quota ? null : setSeq(seq + 1);
              ChangeAbsentStates(seq - 1);
            }}
          />
          <AttendanceButton
            title="출석"
            onPress={() => {
              seq === quota ? null : setSeq(seq + 1);
              ChangeAttendanceStates(seq - 1);
            }}
          />
        </ButtonBox>
      </Container>
      {seq === quota ? (
        <SaveButton
          style={{backgroundColor: Colors.activeGreen}}
          onPress={() => {
            Alert.alert('출석이 저장되었습니다.' + states);
          }}
        />
      ) : (
        <SaveButton style={{backgroundColor: Colors.inactiveGray}} />
      )}
    </>
  );
};

export default CheckOneByOne;
