import React, { memo, useMemo, useState, useCallback } from 'react';
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

  const [radius, setRadius] = useState(50);

  const queryParams = useMemo(() => ({
    filters: {
      radius: radius,
      radiusFrom: {
        longitude: location.longitude,
        latitude: location.latitude,
      }
    } 
  }), [radius, location]);

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
});

export default memo(Around);
