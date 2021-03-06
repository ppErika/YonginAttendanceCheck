import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView, useWindowDimensions} from 'react-native';
import Lecture from '../components/Lecture';
import SemesterButton from '../components/SemesterButton';
import {info, Api} from '../api/BaseApi';
import {ErrorHandler} from '../api/ErrorHandler';

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

const classItems1 = [
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

const Home = ({navigation}) => {
  const width = useWindowDimensions().width;
  const _height = useWindowDimensions().height;
  const [semesterBtnState, setSemesterBtnState] = useState([true, false]);
  const [selectedSemester, setSelectedSemester] = useState(classItems1);
  const [classItems, setClassItems] = useState([]);
  const [semesterItems, setSemesterItems] = useState([]);
  let seq = 1; //lecture에 보내는 배열의 순서

  function changeSemesterBtn() {
    var arrayCopy = [...semesterBtnState];
    arrayCopy[0] = !arrayCopy[0];
    arrayCopy[1] = !arrayCopy[1];
    if (arrayCopy[0] === true) {
      setSelectedSemester(classItems1);
    } else {
      setSelectedSemester(classItems2);
    }
    setSemesterBtnState(arrayCopy);
  }

  function setSemester(data) {
    let termId = '';
    let termArr = [];
    data.forEach(function (item, index, arr) {
      if (termId !== item.courses.courseTerm.courseTermId) {
        termId = item.courses.courseTerm.courseTermId;
        termArr.push(item.courses.courseTerm.courseTermName);
      }
    });
    setSemesterItems(termArr);
  }

  async function getLecture() {
    let api = await Api();
    api
      .get(info.apiList.getLecture)
      .then((res) => {
        setClassItems(res.data);
        setSemester(res.data);
      })
      .catch((error) => {
        ErrorHandler(error, getLecture);
      });
  }

  //컴포넌트를 처음 로딩할 때 호출
  useEffect(() => {
    getLecture();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <SemesterTab width={width}>
        {semesterItems.map((item, i) => (
          <SemesterButton
            key={item}
            activeSemesterButton={semesterBtnState[i]}
            title={item}
            onPress={() => changeSemesterBtn()}
          />
        ))}
      </SemesterTab>
      <ScrollView style={{height: _height - 130}}>
        {classItems.map((item) => (
          <Lecture
            key={item.courses.courseId}
            item={item}
            seq={seq++}
            onPress={() => navigation.navigate('Detail', {item})}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Home;
