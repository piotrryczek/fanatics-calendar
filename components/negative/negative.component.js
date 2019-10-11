import React, { memo, useMemo } from 'react';
import { Container } from 'native-base';

import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

function Negative(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;

  const queryParams = useMemo(() => ({
    filters: {
      attitudeFrom: 0,
      attitudeTo: 43,
    },
    sort: {
      attitude: 'ascending'
    }
  }), []);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location])

  return (
    <Container>
      <AppHeader navigation={navigation} title="Negatywne" />
      <MatchesNavigator screenProps={matchesScreenProps} />
    </Container>
  );
}

export default memo(Negative);
