import React, { memo, useMemo } from 'react';
import { Container } from 'native-base';
import { StyleSheet } from 'react-native';

import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

function LowerLeagues(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;

  const queryParams = useMemo(() => ({
    filters: {
      leagueTiers: [4,5,6],
    },
  }), []);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location])

  return (
    <Container>
      <AppHeader navigation={navigation} title="Niższe ligi" />
      <MatchesNavigator screenProps={matchesScreenProps} />
    </Container>
  );
}

const styles = StyleSheet.create({
  
});

export default memo(LowerLeagues);
