import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableOpacity, View  } from 'react-native';
import { Container, Icon, ActionSheet, Text } from 'native-base';

import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

const radiusOptions = [{
  value: 5,
  label: '5 km',
}, {
  value: 10,
  label: '10 km',
}, {
  value: 25,
  label: '25 km',
}, {
  value: 50,
  label: '50 km',
}, {
  value: 100,
  label: '100 km',
}, {
  value: 200,
  label: '200 km',
}];

function Around(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const aroundLocation = useSelector(state => state.aroundLocation) || location;

  const [radius, setRadius] = useState(50);

  useEffect(() => {
    dispatch({
      type: 'SET_AROUND_LOCATION',
      payload: location,
    });
  }, []);

  const queryParams = useMemo(() => ({
    filters: {
      radius: radius,
      radiusFrom: {
        longitude: aroundLocation.longitude,
        latitude: aroundLocation.latitude,
      }
    } 
  }), [radius, aroundLocation]);

  const showRadiusMenu = useCallback(() => {
    ActionSheet.show(
      {
        options: radiusOptions.map(({ label }) => label),
        title: 'W odległości od Ciebie...'
      },
      (index) => {
        if (index || index === 0) setRadius(radiusOptions[index].value);
      }
    );
  }, []);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location])

  const handleGoToAroundLocation = useCallback(() => {
    navigate('AroundLocation');
  }, [navigate]);

  return (
    <Container>
      <AppHeader navigation={navigation} title="W okolicy">
        <TouchableOpacity onPress={showRadiusMenu}>
          <View style={styles.radiusButton}>
            <Icon
              type="MaterialIcons"
              name="edit"
              color="white"
              style={styles.radiusIcon}
            />
            <Text style={styles.radiusText}>{`${radius} km`}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoToAroundLocation}>
          <View style={styles.location}>
            <Icon
              type="MaterialIcons"
              name="my-location"
              color="white"
              style={styles.locationIcon}
            />
          </View>
        </TouchableOpacity>
      </AppHeader>
      <MatchesNavigator screenProps={matchesScreenProps} />
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
  location: {
    marginLeft: 10,
  },
  locationIcon: {
    fontSize: 20,
    color: 'white',
  },
});

export default memo(Around);
