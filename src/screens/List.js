import React from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';
import styled from 'styled-components/native';
import SaveButton from '../components/SaveButton';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
`;

const List = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Container>
        <Searchbar
          placeholder="검색하기"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{width: width - 40, height: 40, borderRadius: 25}}
          inputStyle={{fontSize: 14, fontFamily: Fonts.spoqaRegular}}
          iconColor={Colors.activeGreen}
        />
      </Container>
      <SaveButton
        title="완료하기"
        style={{backgroundColor: Colors.activeGreen}}
        onPress={() => {
          Alert.alert('출석이 저장되었습니다.');
        }}
      />
    </>
  );
};

export default List;
