import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Match from 'root/components/match/match.component.js';
import Matches from 'root/common/matches/matches.component';

const RootStack = createStackNavigator({
  Matches: {
    screen: Matches,
    navigationOptions: {
      title: 'Matches',
    }
  },
  Match: {
    screen: Match,
    navigationOptions: {
      title: 'Match',
    }
  },
}, {
  initialRouteName: 'Matches',
  header: null,
  headerMode: 'none'
});
const MatchesContainer = createAppContainer(RootStack);

export default MatchesContainer;