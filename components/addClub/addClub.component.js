import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage, StyleSheet, View, ScrollView } from 'react-native';
import { Container, Spinner, Input, Item, List } from 'native-base';
import { useDebouncedCallback } from 'use-debounce';

import Api from 'root/services/api';
import AppHeader from 'root/components/appHeader/appHeader.component';
import YourClub from 'root/common/yourClub/yourClub.component';

function AddClub(props) {
  const { navigation } = props;

  const dispatch = useDispatch();
  const clubs = useSelector(state => state.clubs);

  const [state, setState] = useState({
    clubsChoices: [],
    isLoading: false,
    isAddingLoading: false,
  });

  const {
    clubsChoices,
    isLoading,
    isAddingLoading,
  } = state;

  const [handleChange] = useDebouncedCallback(async (text) => {
    if (!text) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        clubsChoices: [],
      }));

      return false;
    }

    setState(prevState => ({
      ...prevState,
      isLoading: true,
      clubsChoices: [],
    }));

    const { data: clubsChoices } = await Api.post('/clubs/possibleRelations', {
      searchName: text,
      excluded: clubs.map(({ _id: clubId }) => clubId),
    });

    setState(prevState => ({
      ...prevState,
      clubsChoices: clubsChoices,
      isLoading: false,
    }));
  }, 500);

  const handleAdd = useCallback(async (clubId) => {
    if (isAddingLoading) return false;

    setState(prevState => ({
      ...prevState,
      isAddingLoading: clubId,
    }));

    dispatch({
      type: 'SET_CLUBS',
      payload: [...clubs, clubsChoices.find(club => club._id === clubId)],
    });

    await AsyncStorage.setItem('CLUBS', JSON.stringify([...clubs.map(club => club._id), clubId]));

    setState(prevState => ({
      ...prevState,
      clubsChoices: clubsChoices.filter(club => club._id !== clubId),
      isAddingLoading: null,
    }));
  }, [clubs, clubsChoices, isAddingLoading]);

  return (
    <Container>
      <AppHeader navigation={navigation} title="Dodaj" goBack={true} goBackScreen="ManageClubs" loading={isAddingLoading} />
      <View style={styles.inputWrapper}>
        <Item regular>
          <Input
            placeholder="Szukaj klubów..."
            onChangeText={handleChange}
          />
        </Item>
      </View>

      {isLoading && (
        <Spinner color="blue" />
      )}

      {clubsChoices.length > 0 && (
        <ScrollView
          keyboardShouldPersistTaps="always"
        >
          <List>
            {clubsChoices.map(({ name, transliterationName = '', logo, _id: clubId}) => (
              <YourClub
                key={clubId}
                onAction={handleAdd}
                onActionType="add"
                isLoading={isAddingLoading === clubId}
                name={name}
                transliterationName={transliterationName}
                logo={logo}
                clubId={clubId}
              />
            ))}
          </List>
        </ScrollView>
      )}
      
    </Container>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 10,
  },
});

export default AddClub;
