import React, { memo, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Container, Text, Button, Icon } from 'native-base';

const ClubWrapper = ({ wrapper, children, ifClubExists }) => ifClubExists ? wrapper(children) : children;

function Match({ navigation }) {
  const matchData = navigation.getParam('matchData');

  const { goBack } = navigation;

  const {
    leagueName,
    finalHomeClubName,
    finalAwayClubName,
    homeClubLogoBig,
    awayClubLogoBig,
    finalDateExtended,
    importanceData,
    distanceFromUser,
    finalImportance,
    attitudeData,
    homeClubId,
    awayClubId,
    geoUrl,
    isHomeClubReserve,
    isAwayClubReserve,
    locationNotSure,
  } = matchData;

  const goToHomeClub = useCallback(() => {
    if (homeClubId) Linking.openURL(`https://www.fanaticsmap.pl/club/${homeClubId}`)
  }, []);

  const goToAwayClub = useCallback(() => {
    if (awayClubId) Linking.openURL(`https://www.fanaticsmap.pl/club/${awayClubId}`)
  }, []);

  const importanceStyles = Object.assign({}, stylesImportance.backgroundAndNumber, {
    backgroundColor: importanceData.backgroundColor,
  });

  const attitudeStyles = Object.assign({}, stylesAttitude.color, {
    backgroundColor: attitudeData.backgroundColor,
  });

  return (
    <Container>
      <ScrollView>
        
        <View style={styles.wrapper}>
          <Button style={styles.backButton} onPress={() => goBack()} iconLeft>
            <Icon name="arrow-back" />
            <Text>Wróc do przeglądania meczów</Text>
          </Button>

          {/* Znaczenie kibicowskie */}
          <View style={styles.box}>
            <View style={stylesImportance.label}>
              <Text style={stylesImportance.labelText}>Znaczenie kibicowskie</Text>
            </View>
            <View style={importanceStyles}>
              <View style={stylesImportance.number}>
                <Text style={stylesImportance.numberText}>{finalImportance}</Text>
              </View>
            </View>
            <View style={stylesImportance.description}>
              <Text style={stylesImportance.descriptionText}>{importanceData.label}</Text>
            </View>
          </View>

          {/* Kluby */}
          <View style={styles.box}>
            <View style={stylesClubs.wrapper}>
              <ClubWrapper
                ifClubExists={homeClubId}
                wrapper={(children) => (
                  <TouchableOpacity onPress={goToHomeClub}>
                    {children}
                  </TouchableOpacity>
                )}
              >
                <View style={Object.assign({}, stylesClubs.club, stylesClubs.clubHome)}>
                  <View style={stylesClubs.logoWrapper}>
                    {homeClubLogoBig
                    ? (
                      <Image
                        style={stylesClubs.logo}
                        source={{uri: homeClubLogoBig}}
                      />
                    )
                    : (
                      <Text style={stylesClubs.unknownLogo}>?</Text>
                    )}
                  </View>
                  <View style={stylesClubs.clubNameWrapper}>
                    <Text
                      numberOfLines={1}
                      style={stylesClubs.clubName}
                    >
                      {finalHomeClubName}
                    </Text>
                    {isHomeClubReserve && (
                      <Text
                        numberOfLines={1}
                        style={stylesClubs.clubNameReserve}
                      >
                        (rezerwy)
                      </Text>
                    )}
                  </View>
                </View>
              </ClubWrapper>

              <ClubWrapper
                ifClubExists={awayClubId}
                wrapper={(children) => (
                  <TouchableOpacity onPress={goToAwayClub}>
                    {children}
                  </TouchableOpacity>
                )}
              >
                <View style={Object.assign({}, stylesClubs.club, stylesClubs.clubAway)}>
                  <View style={stylesClubs.logoWrapper}>
                    {awayClubLogoBig
                    ? (
                      <Image
                        style={stylesClubs.logo}
                        source={{uri: awayClubLogoBig}}
                      />
                    )
                    : (
                      <Text style={stylesClubs.unknownLogo}>?</Text>
                    )}
                  </View>
                  <View style={stylesClubs.clubNameWrapper}>
                    <Text
                      numberOfLines={1}
                      style={stylesClubs.clubName}
                    >
                      {finalAwayClubName}
                    </Text>
                    {isAwayClubReserve && (
                      <Text
                        numberOfLines={1}
                        style={stylesClubs.clubNameReserve}
                      >
                        (rezerwy)
                      </Text>
                    )}
                  </View>
                </View>
              </ClubWrapper>
            </View>
          </View>

          {/* Nastawienie */}
          <View style={styles.box}>
            <View style={stylesAttitude.wrapper}>
              <View style={attitudeStyles}></View>
              <View style={stylesAttitude.labelWrapper}>
                <Text style={stylesAttitude.labelText}>{attitudeData.labelExtended}</Text>
              </View>
            </View>
          </View>

          {/* Liga & Data */}
          <View style={styles.box}>
            <View style={stylesInfo.wrapper}>
              {leagueName && (
                <View style={stylesInfo.item}>
                  <Text style={stylesInfo.text}>
                    {leagueName}
                  </Text>
                </View>
              )}
              <View style={Object.assign({}, stylesInfo.item, stylesInfo.lastItem)}>
                <Text style={stylesInfo.text}>
                  {finalDateExtended}
                </Text>
              </View>
            </View>
          </View>

          {/* Odległość */}
          {distanceFromUser && (
            <TouchableOpacity onPress={() => Linking.openURL(geoUrl)}>
              <View style={styles.box}>
                <View style={stylesDistance.wrapper}>
                  <View style={stylesDistance.distance}>
                    <Text style={stylesDistance.text}>{`${distanceFromUser} km`}</Text>
                  </View>
                  <View style={stylesDistance.goToMapWrapper}>
                    <Text style={stylesDistance.goToMapText}>Przejdź do mapy</Text>
                    {(locationNotSure || isHomeClubReserve) && (
                      <Text style={stylesDistance.notSure}>(lokalizacja przybliżona bądź prawdopodobna)</Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
                    
          {/* Uwagi */}
          <View style={stylesComments.wrapper}>
            <Text style={stylesComments.label}>Uważasz, że dane są niepoprawne?</Text>
            <Button style={stylesComments.button} onPress={() => Linking.openURL('mailto:fanaticsmap@gmail.com')}>
              <Text style={stylesComments.buttonText}>Napisz do nas email</Text>
            </Button>
            <Button style={Object.assign({}, stylesComments.button, stylesComments.lastButton)} onPress={() => Linking.openURL('https://www.fanaticsmap.pl')}>
              <Text style={stylesComments.buttonText}>Zasugeruj zmianę na mapie fanatyków</Text>
            </Button>
          </View>

        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: '#ededed',
  },
  box: {
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 10,
  },
  backButton: {
    justifyContent: 'flex-start',
    marginBottom: 20,
  }
});

const stylesImportance = StyleSheet.create({
  label: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#3F51B5'
  },
  labelText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  backgroundAndNumber: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5'
  },
  numberText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#3F51B5'
  },
  descriptionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  }
});

const stylesClubs = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
  },
  clubHome: {
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  clubAway: {
    // marginTop: 5,
  },
  club: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  unknownLogo: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  clubNameWrapper: {
    flex: 1,
  },
  clubName: {
    fontSize: 19,
    // fontWeight: 'bold'
  },
  clubNameReserve: {
    fontSize: 12,
    color: '#a3a3a3'
  }
});

const stylesAttitude = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  color: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  labelWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  }
});

const stylesInfo = StyleSheet.create({
  wrapper: {
    
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  lastItem: {
    borderBottomWidth: 0
  },
  text: {
    
  }
});

const stylesDistance = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  distance: {
    width: 60,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginRight: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  goToMapWrapper: {
    justifyContent: 'center'
  },
  goToMapText: {

  },
  notSure: {
    fontSize: 12,
    color: '#a3a3a3'
  }
});

const stylesComments = StyleSheet.create({
  wrapper: {
    // paddingVertical: 5,
    // paddingHorizontal: 10
  },
  label: {
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lastButton: {
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center'
  }
});



export default memo(Match);
