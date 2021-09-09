import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import {LinearProgress} from 'react-native-elements';
// import {ProgressBar} from 'react-native-paper';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;

function CheckOneByOne({navigation, route, item}) {
  return (
    <Container>
      <Text
        style={{
          color: Colors.activeGreen,
          fontFamily: Fonts.spoqaBold,
          fontSize: 22,
          margin: 15,
        }}>
        테스트
        {/* {route.params.item.name} */}
      </Text>
      <LinearProgress
        value={0.2}
        color={Colors.inactiveGray}
        trackColor={Colors.activeGreen}
      />
      {/* <ProgressBar progress={0.5} color={Colors.activeGreen} /> */}
    </Container>
  );
}

export default CheckOneByOne;
