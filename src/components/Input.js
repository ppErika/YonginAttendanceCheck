import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useWindowDimensions} from 'react-native';
import PropTypes from 'prop-types';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: Colors.inactiveGray,
})`
  width: ${({width}) => width - 40}px;
  height: 54px;
  margin-bottom: 8px;
  padding: 10px;
  background-color: #ffffff;
  border: 2px
    ${({isFocused}) =>
      isFocused ? Colors.boxBorderGreen : Colors.backgroundGray};
  border-radius: 5px;
  font-family: ${Fonts.spoqaMedium};
  color: ${Colors.activeGreen};
`;

const Input = ({
  placeholder,
  returnkeyType,
  value,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  onBlur,
  style,
}) => {
  const width = useWindowDimensions().width;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry} // 비밀번호 ***
      onSubmitEditing={onSubmitEditing}
      onBlur={() => {
        setIsFocused(false);
        onBlur();
      }}
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      style={style}
      autoCapitalize="none" //  대문자로 시작 안하기
      textContentType="none" //  대문자로 시작 안하기
      autoCorrect={false} // 자동 오타수정 안하기
      returnkeyType={returnkeyType}
    />
  );
};

Input.defaultProps = {
  onBlur: () => {},
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  secureTextEntry: PropTypes.bool.isRequired,
};

export default Input;
