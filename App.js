import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Root, Container } from 'native-base';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import AppNavigator from 'root/utilities/appNavigator';
import store from 'root/config/store';
import Error from 'root/components/error/error.component';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState({});

  const loadFonts = useCallback(async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    setIsLoaded(true);
  }, []);

  const initGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(handleChangeLocation);
    navigator.geolocation.watchPosition(handleChangeLocation, null, {
      useSignificantChanges: true,
    });
  }, []);

  const handleChangeLocation = useCallback((position) => {
    const { 
      coords: {
        latitude,
        longitude,
      }
    } = position;

    setLocation({
      latitude,
      longitude,
    });
  }, [])

  useEffect(() => {
    loadFonts();
    initGeolocation();
  }, []);

  const screenProps = useMemo(() => ({
    location,
  }), [location]);


  if (!isLoaded) return (null);

  return (
    <Root>
      <Provider store={store}>
        <Container>
          <AppNavigator screenProps={screenProps} />
        </Container>
        <Error />
      </Provider>
    </Root>
  );
}