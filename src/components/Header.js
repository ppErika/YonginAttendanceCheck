import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Header = ({navigation, title}) => {
  return (
    <Container>
      <Text
        style={{
          color: Colors.activeGreen,
          fontFamily: Fonts.spoqaBold,
          fontSize: 22,
          margin: 15,
        }}>
        {title}
      </Text>
    </Container>
  );
};

export default Header;
