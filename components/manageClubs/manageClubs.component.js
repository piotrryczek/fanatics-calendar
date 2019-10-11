import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, Icon, List } from 'native-base';

import AppHeader from 'root/components/appHeader/appHeader.component';
import YourClub from 'root/common/yourClub/yourClub.component';

function ManageClubs(props) {
  const { navigation } = props;
  const { navigate } = navigation;

  const dispatch = useDispatch();
  const clubs = useSelector(state => state.clubs);

  const [isRemovingLoading, setIsRemovingLoading] = useState(null);

  const handleGoToAddClub = useCallback(() => {
    navigate('AddClub');
  }, [navigate]);

  const handleRemove = useCallback(async (clubId) => {
    if (isRemovingLoading) return false;

    setIsRemovingLoading(clubId);
    const filteredClubs = clubs.filter(club => club._id !== clubId);

    await AsyncStorage.setItem('CLUBS', JSON.stringify(filteredClubs.map(({ _id }) => _id)));

    dispatch({
      type: 'SET_CLUBS',
      payload: filteredClubs,
    });

    setIsRemovingLoading(null);
  }, [clubs, isRemovingLoading]);

  return (
    <Container>
      <AppHeader navigation={navigation} title="Zarządzaj" goBack={true} goBackScreen="YourClubs">
        <TouchableOpacity onPress={handleGoToAddClub}>
          <View style={styles.radiusButton}>
            <Icon
              type="MaterialIcons"
              name="add"
              color="white"
              style={styles.radiusIcon}
            />
            <Text style={styles.radiusText}>Dodaj</Text>
          </View>
        </TouchableOpacity>
      </AppHeader>
      {clubs.length > 0 && (
        <ScrollView>
          <List>
            {clubs.map(({ name, transliterationName, logo, _id: clubId}) => (
              <YourClub
                key={clubId}
                onAction={handleRemove}
                onActionType="remove"
                isLoading={isRemovingLoading === clubId}
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
  radiusButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radiusText: {
    textTransform: 'lowercase',
    color: 'white'
  },
  radiusIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 5
  },
});

export default ManageClubs;
