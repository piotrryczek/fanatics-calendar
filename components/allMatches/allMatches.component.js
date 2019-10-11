import React, { memo, useMemo } from 'react';
import { Container } from 'native-base';

import AppHeader from 'root/components/appHeader/appHeader.component';
import MatchesNavigator from 'root/utilities/matchesNavigator';

function AllMatches(props) {
  const { navigation, screenProps } = props;
  const { location } = screenProps;

  const queryParams = useMemo(() => ({
    
  }), []);

  const matchesScreenProps = useMemo(() => ({
    queryParams,
    location
  }), [queryParams, location])

  return (
    <Container>
      <AppHeader navigation={navigation} title="Najciekawsze" />
      <MatchesNavigator screenProps={matchesScreenProps} />
    </Container>
  );
}

export default memo(AllMatches);
