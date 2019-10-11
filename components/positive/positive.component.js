import React, { memo, useMemo } from 'react';
import { Container } from 'native-base';

import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

function Positive(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;

  const queryParams = useMemo(() => ({
    filters: {
      attitudeFrom: 57,
      attitudeTo: 100,
    },
    sort: {
      attitude: 'descending'
    }
  }), []);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location])

  return (
    <Container>
      <AppHeader navigation={navigation} title="Pozytywne" />
      <MatchesNavigator screenProps={matchesScreenProps} />
    </Container>
  );
}

export default memo(Positive);
