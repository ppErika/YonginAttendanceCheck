import React from 'react';
import {View, TouchableOpacity, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  width: ${({width}) => width}px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.backgroundGray};
  text-align: center;
  font-family: ${Fonts.spoqaMedium};
`;

const SaveButton = ({title, style, onPress}) => {
  const width = useWindowDimensions().width;
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', left: 0, bottom: 0}}>
        <TouchableOpacity onPress={onPress}>
          <Container width={width} style={style}>
            <Title>{title}</Title>
          </Container>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveButton;
