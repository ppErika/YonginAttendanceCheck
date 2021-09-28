import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import SelectedLecture from '../components/SelectedLecture';
import GreenButton from '../components/GreenButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;
const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;

const List = ({navigation, route}) => {
  return <Container />;
};

export default List;
