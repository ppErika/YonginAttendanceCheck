import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Text, ScrollView, useWindowDimensions} from 'react-native';
import Lecture from '../components/Lecture';
import SemesterButton from '../components/SemesterButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';
import {info, Api} from '../api/BaseApi';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;

const SemesterTab = styled.View`
  width: ${({width}) => width - 40}px;
  height: 35px;
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px 0;
`;

const classItems = [
  {
    id: 1,
    name: '운영체제',
    time: '월 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 2,
    name: '데이터베이스',
    time: '화 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 3,
    name: '알고리즘',
    time: '화 13:35 - 16:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 4,
    name: '운영체제',
    time: '수 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 5,
    name: '데이터베이스',
    time: '목 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 6,
    name: '알고리즘',
    time: '목 13:35 - 16:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 7,
    name: '운영체제',
    time: '금 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 8,
    name: '데이터베이스',
    time: '금 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 9,
    name: '알고리즘',
    time: '금 13:35 - 16:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
];

const classItems2 = [
  {
    id: 1,
    name: '데이터 통신',
    time: '월 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 2,
    name: '컴퓨터 보안',
    time: '화 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 3,
    name: '인공지능',
    time: '화 13:35 - 16:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 4,
    name: '데이터 통신',
    time: '수 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 5,
    name: '컴퓨터 보안',
    time: '목 09:25 - 12:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
  {
    id: 6,
    name: '인공지능',
    time: '목 13:35 - 16:30',
    professor: '이완주 교수',
    lectureRoom: '7202호',
  },
];

const SemesterItems = ['1학기', '여름학기'];

const Home = ({navigation}) => {
  const width = useWindowDimensions().width;
  const _height = useWindowDimensions().height;
  const [semesterBtnState, setSemesterBtnState] = useState([true, false]);
  const [selectedSemester, setSelectedSemester] = useState(classItems);

  function changeSemesterBtn() {
    var arrayCopy = [...semesterBtnState];
    arrayCopy[0] = !arrayCopy[0];
    arrayCopy[1] = !arrayCopy[1];
    if (arrayCopy[0] === true) {
      setSelectedSemester(classItems);
    } else {
      setSelectedSemester(classItems2);
    }
    setSemesterBtnState(arrayCopy);
  }

  async function getLecture() {
    let api = await Api();
    api
      .get(info.apiList.getLecture)
      .then((res) => {
        console.log(res.data);
        //스테이트에 강의정보를 저장하여 사용
        //지금은 백엔드로부터 return오는 데이터가 프론트 양식과 맞지 않아서 적용 안함
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    getLecture();
  }, []);

  return (
    <Container>
      {/* <Text
        style={{
          color: Colors.activeGreen,
          fontFamily: Fonts.spoqaBold,
          fontSize: 22,
          margin: 15,
        }}>
        강의 목록
      </Text> */}
      <SemesterTab width={width}>
        {SemesterItems.map((item, i) => (
          <SemesterButton
            key={item}
            activeSemesterButton={semesterBtnState[i]}
            title={item}
            onPress={() => changeSemesterBtn()}
          />
        ))}
      </SemesterTab>
      <ScrollView style={{height: _height - 130}}>
        {selectedSemester.map((item) => (
          <Lecture
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('Detail', {item})}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Home;
