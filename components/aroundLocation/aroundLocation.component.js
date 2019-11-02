import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Container, Item, Button, Text } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AppHeader from 'root/components/appHeader/appHeader.component';

function AroundLocation(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const handleChangeToSelectedLocation = useCallback((data, details) => {
    const { geometry: { location: selectedLocation } } = details;

    dispatch({
      type: 'SET_AROUND_LOCATION',
      payload: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
    });

    navigate('Around');
  }, [navigate]);

  const handleChangeToUserLocation = useCallback(() => {
    dispatch({
      type: 'SET_AROUND_LOCATION',
      payload: location,
    });

    navigate('Around');
  }, [navigate]);

  return (
    <Container>
      <AppHeader navigation={navigation} title="Lokalizacja" goBack={true} goBackScreen="Around" />
      <View style={styles.containerWrapper}>
        <Button style={styles.button} onPress={handleChangeToUserLocation}>
          <Text style={styles.buttonText}>Użyj obecnej lokalizacji</Text>
        </Button>
        <Text style={styles.orText}>lub</Text>
        <Item regular>
          <GooglePlacesAutocomplete
            placeholder='Wpisz nazwę miejscowości...'
            minLength={2}
            autoFocus={false}
            returnKeyType="search"
            keyboardAppearance="light"
            listViewDisplayed="auto"
            fetchDetails={true}
            // renderDescription={row => row.description}
            onPress={handleChangeToSelectedLocation}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyCQnl04egz3fjxSU-LOm83H2UktczKnBnY',
              language: 'pl',
            }}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
          />
        </Item>
      </View>
      
    </Container>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    padding: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center'
  },
  orText: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default AroundLocation;
