import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import moment from 'moment';
import getDistance from 'geolib/es/getDistance';
import _isEmpty from 'lodash/isEmpty';
import Intl from 'intl';

import 'moment/locale/pl';
import 'intl/locale-data/jsonp/en-US';

import {
  ATTITUDE_DATA,
  IMPORTANCE_COLORS,
  ATTITUDE_DATA_UNKNOWN,
  IMAGES_URL,
} from 'root/config/config';

moment.locale('pl');

const getAttitudeData = (attitude) => {
  const maybeFoundColor = ATTITUDE_DATA.find(({ from, to }) => (from <= attitude && attitude <= to));

  return maybeFoundColor || ATTITUDE_DATA_UNKNOWN;
};
const getImportanceData = (importance) => {
  const maybeFoundColor = IMPORTANCE_COLORS.find(({ from, to }) => from <= importance && importance <= to);

  return maybeFoundColor || ATTITUDE_DATA_UNKNOWN;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false
});

const getMatchData = (props) => {
  const {
    location,
    attitude,
    attitudeEstimationLevel,
    importance,
    homeClubId,
    homeClubName,
    homeClubLogo,
    awayClubId,
    awayClubName,
    awayClubLogo,
    isHomeClubReserve,
    isAwayClubReserve,
    unimportantHomeClubName,
    unimportantAwayClubName,
    coordinates,
    date,
    leagueName,
    locationNotSure,
  } = props;

  const hasLocation = (coordinates && coordinates.length && !_isEmpty(location) && coordinates[0] !== 0 && coordinates[1] !== 0);

  const distanceFromUser = hasLocation
  ? Math.round(getDistance({ latitude: location.latitude, longitude: location.longitude }, { latitude: coordinates[1], longitude: coordinates[0] }) / 1000)
  : null;

  const geoUrl = hasLocation
    ? `geo:0,0?q=${coordinates[1]},${coordinates[0]}`
    : null;

  return {
    homeClubId,
    awayClubId,
    leagueName,
    finalHomeClubName: homeClubName ? isHomeClubReserve ? `${homeClubName} ||` : homeClubName : unimportantHomeClubName,
    finalAwayClubName: awayClubName ? isAwayClubReserve ? `${awayClubName} ||` : awayClubName : unimportantAwayClubName,
    homeClubLogo: homeClubLogo ? `${IMAGES_URL}/h180/${homeClubLogo}` : null,
    awayClubLogo: awayClubLogo ? `${IMAGES_URL}/h180/${awayClubLogo}` : null,
    homeClubLogoBig: homeClubLogo ? `${IMAGES_URL}/h360/${homeClubLogo}` : null,
    awayClubLogoBig: awayClubLogo ? `${IMAGES_URL}/h360/${awayClubLogo}` : null,
    finalDate: moment(date).format('D MMM HH:mm'),
    finalDateExtended: moment(date).format('D MMMM (dddd), HH:mm'),
    importanceData: getImportanceData(importance),
    distanceFromUser,
    finalImportance: numberFormatter.format(parseFloat(importance)),
    attitudeData: getAttitudeData(attitude),
    geoUrl,
    isHomeClubReserve,
    isAwayClubReserve,
    locationNotSure,
    attitudeEstimationLevel,
  }
}

function MatchInList(props) {
  const { navigate } = props;

  const matchData = getMatchData(props);

  const {
    isHomeClubReserve,
    isAwayClubReserve,
    locationNotSure,
    leagueName,
    finalHomeClubName,
    finalAwayClubName,
    homeClubLogo,
    awayClubLogo,
    finalDate,
    importanceData,
    distanceFromUser,
    finalImportance,
    attitudeData
  } = matchData;

  const importanceStyles = Object.assign({}, styles.importance, {
    backgroundColor: importanceData.backgroundColor,
  });

  const attitudeStyles = Object.assign({}, styles.attitude, {
    backgroundColor: attitudeData.backgroundColor,
  });

  const homeClubLogoStyles = Object.assign({}, styles.clubLogo);
  const awayClubLogoStyles = Object.assign({}, styles.clubLogo);

  const handleGoToMatch = useCallback(() => {
    navigate('Match', {
      matchData,
    });
  }, [navigate]);

  return (
    <TouchableOpacity onPress={handleGoToMatch}>
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={styles.topLeftText}>{leagueName}</Text>
          <Text style={styles.topRightText}>{finalDate}</Text>
        </View>
        <View style={styles.center}>
          <View style={importanceStyles}>
            <View style={styles.importanceNumberWrapper}>
              <Text style={styles.importanceNumber}>{finalImportance}</Text>
            </View>
            {finalImportance > 8 && (
              <View style={styles.featuredIconWrapper}>
                <Icon type="MaterialIcons" name="new-releases" style={styles.featuredIcon} />
              </View>
            )}
            {distanceFromUser && (
              <View style={styles.distanceWrapper}>
                <Text style={styles.distance}>{`${locationNotSure ? '~' : ''}${distanceFromUser} km`}</Text>
              </View>
            )}
          </View>
          <View style={styles.clubs}>
            <View style={Object.assign({}, styles.club, styles.homeClub)}>
              <View style={styles.logoWrapper}>
                {homeClubLogo
                ? (
                  <Image
                    style={homeClubLogoStyles}
                    source={{uri: homeClubLogo}}
                  />
                )
                : (
                  <Text style={styles.unknownLogo}>?</Text>
                )}
              </View>
              <View style={styles.clubNameWrapper}>
                <Text
                  numberOfLines={1}
                  style={styles.clubName}
                >
                  {finalHomeClubName}
                </Text>
                {isHomeClubReserve && (
                  <Text
                    numberOfLines={1}
                    style={styles.clubNameReserve}
                  >
                    (rezerwy)
                  </Text>
                )}
              </View>
              
            </View>
            <View style={Object.assign({}, styles.club, styles.awayClub)}>
              <View style={styles.logoWrapper}>
                {awayClubLogo
                ? (
                  <Image
                    style={awayClubLogoStyles}
                    source={{uri: awayClubLogo}}
                  />
                )
                : (
                  <Text style={styles.unknownLogo}>?</Text>
                )}
              </View>
              <View style={styles.clubNameWrapper}>
                <Text
                  numberOfLines={1}
                  style={styles.clubName}
                >
                  {finalAwayClubName}
                </Text>
                {isAwayClubReserve && (
                  <Text
                    numberOfLines={1}
                    style={styles.clubNameReserve}
                  >
                    (rezerwy)
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={attitudeStyles} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  // Top, Center, Footer
  top: {
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  center: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1
  },
  topLeftText: {
    fontSize: 12,
  },
  topRightText: {
    fontSize: 12,
  },
  // Inner View's
  importance: {
    width: 65,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginRight: 10,
  },
  importanceNumberWrapper: {
    height: 30,
    backgroundColor: '#3F51B5',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featuredIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  featuredIcon: {
    color: 'white',
    fontSize: 20
  },
  importanceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  distanceWrapper: {
    backgroundColor: '#3F51B5'
  },
  distance: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  clubs: {
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  club: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clubNameWrapper: {
    flex: 1,
  },
  clubName: {
    fontSize: 18,
  },
  clubNameReserve: {
    fontSize: 8,
    color: '#a3a3a3'
  },
  logoWrapper: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  clubLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  unknownLogo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  homeClub: {
    marginBottom: 5,
  },
  awayClub: {
    marginTop: 5
  },
  attitude: {
    width: 20,
    marginLeft: 5,
  },
  date: {
    fontSize: 12,
  },
  
});

export default memo(MatchInList);
