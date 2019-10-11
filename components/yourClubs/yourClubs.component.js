import React, { memo, useMemo, useCallback, useEffect, useState } from 'react';
import { AsyncStorage, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Container, Text, Icon, Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

import Api from 'root/services/api';
import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

function YourClubs(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;
  const { navigate } = navigation;

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const clubs = useSelector(state => state.clubs);

  const retrieveClubsFromStorage = useCallback(async () => {
    const clubsIdsJSON = await AsyncStorage.getItem('CLUBS') || [];
    const clubsIds = JSON.parse(clubsIdsJSON);

    const clubs = await Promise.all(clubsIds.map(clubId => new Promise(async (resolve, reject) => {
      const { data: club } = await Api.get(`/clubs/${clubId}`); 

      resolve(club);
    })));

    dispatch({
      type: 'SET_CLUBS',
      payload: clubs,
    });

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    retrieveClubsFromStorage();
  }, []);

  const queryParams = useMemo(() => ({
    filters: {
      clubs: clubs.map(({ _id: clubId}) => clubId)
    }
  }), [clubs]);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location]);

  const handleGoToManageClubs = useCallback(() => {
    navigate('ManageClubs');
  }, [navigate]);

  const handleGoToAddClub = useCallback(() => {
    navigate('AddClub');
  }, [navigate]);

  return (
    <Container>
      <AppHeader navigation={navigation} title="Twoje kluby">
        <TouchableOpacity onPress={handleGoToManageClubs}>
          <View style={styles.radiusButton}>
            <Icon
              type="MaterialIcons"
              name="edit"
              color="white"
              style={styles.radiusIcon}
            />
            <Text style={styles.radiusText}>Edytuj</Text>
          </View>
        </TouchableOpacity>
      </AppHeader>
      {clubs.length > 0 && (
        <MatchesNavigator screenProps={matchesScreenProps} />
      )}
      {(clubs.length === 0 && isLoaded) && (
        <View style={styles.noClubsWrapper}>
          <Button iconLeft  onPress={handleGoToAddClub}>
            <Icon name="add" type="MaterialIcons" />
            <Text>Dodaj kluby</Text>
          </Button>
        </View>
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
  noClubsWrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default memo(YourClubs);
