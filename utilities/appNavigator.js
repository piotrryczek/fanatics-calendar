import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'native-base';

import AllMatches from '../components/allMatches/allMatches.component';
import Around from '../components/around/around.component';
import LowerLeagues from '../components/lowerLeagues/lowerLeagues.component';
import LowestLeagues from '../components/lowestLeagues/lowestLeagues.component';
import Positive from '../components/positive/positive.component';
import Negative from '../components/negative/negative.component';
import About from '../components/about/about.component';
import YourClubs from '../components/yourClubs/yourClubs.component';
import ManageClubs from 'root/components/manageClubs/manageClubs.component.js';
import AddClub from 'root/components/addClub/addClub.component.js';

const iconStyles = {
  width: 30,
  color: 'black',
};

const RootStack = createDrawerNavigator({
  AllMatches: {
    screen: AllMatches,
    navigationOptions: {
      title: 'Najciekawsze',
      drawerLabel: 'Najciekawsze',
      drawerIcon: <Icon type="MaterialIcons" name="whatshot" style={iconStyles} />
    }
  },
  YourClubs: {
    screen: YourClubs,
    navigationOptions: {
      title: 'Obserwowane',
      drawerLabel: 'Obserwowane',
      drawerIcon: <Icon type="MaterialIcons" name="favorite" style={iconStyles} />
    }
  },
  Around: {
    screen: Around,
    navigationOptions: {
      title: 'W okolicy',
      drawerLabel: 'W okolicy',
      drawerIcon: <Icon type="MaterialIcons" name="near-me" style={iconStyles} />
    }
  },
  LowerLeagues: {
    screen: LowerLeagues,
    navigationOptions: {
      title: 'Niższe ligi',
      drawerLabel: 'Niższe ligi',
      drawerIcon: <Icon type="MaterialIcons" name="trending-down" style={iconStyles} />
    }
  },
  LowestLeagues: {
    screen: LowestLeagues,
    navigationOptions: {
      title: 'Okręgówki',
      drawerLabel: 'Okręgówki',
      drawerIcon: <Icon type="MaterialIcons" name="grain" style={iconStyles} />
    }
  },
  Positive: {
    screen: Positive,
    navigationOptions: {
      title: 'Pozytywne',
      drawerLabel: 'Pozytywne',
      drawerIcon: <Icon type="MaterialIcons" name="mood" style={iconStyles} />
    }
  },
  Negative: {
    screen: Negative,
    navigationOptions: {
      title: 'Negatywne',
      drawerLabel: 'Negatywne',
      drawerIcon: <Icon type="MaterialIcons" name="mood-bad" style={iconStyles} />
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      title: 'O aplikacji',
      drawerLabel: 'O aplikacji',
      drawerIcon: <Icon type="MaterialIcons" name="info" style={iconStyles} />
    }
  },
  ManageClubs: {
    screen: ManageClubs,
    navigationOptions: {
      drawerLabel: () => (null),
    }
  },
  AddClub: {
    screen: AddClub,
    navigationOptions: {
      drawerLabel: () => (null),
    }
  }
}, {
  initialRouteName: 'AllMatches',
});
const AppContainer = createAppContainer(RootStack);

export default AppContainer;