import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { View, StyleSheet, VirtualizedList, ScrollView, findNodeHandle, Dimensions } from 'react-native';
import { Spinner, Footer, Button, Text } from 'native-base';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _set from 'lodash/set';
import moment from 'moment';

import Api from 'root/services/api';
import { MATCH_DURATION, DAYS_IN_ADVANCE } from 'root/config/config';
import MatchInList from './matchInList.component';


const defaultParams = {
  filters: {
    isVisible: true,
  },
  sort: {
    importance: 'descending'
  },
}

const DATE_FILTERS_NAMES = [{
  name: 'Ostatnie 7 dni',
  value: 'last7days',
}, {
  name: 'Wczoraj',
  value: 'yesterday',
}, {
  name: 'W ciągu 7 dni',
  value: '7days',
}, {
  name: 'Dzisiaj',
  value: 'today',
}, {
  name: 'Jutro',
  value: 'tomorrow',
}, {
  name: 'Pojutrze',
  value: 'dayAfterTomorrow'
}];

const getItem = (data, index) => {
  const item = data[index];

  return {
    ...item,
    index: index,
    key: item._id,
  }
};
const getItemCount = (data) => data.length;

const getKey = (item) => item._id;

const extractFromItem = ({
  attitude,
  attitudeEstimationLevel,
  importance,
  homeClub, // ID, Name, Logo
  awayClub, // ID, Name, Logo
  isHomeClubReserve,
  isAwayClubReserve,
  unimportantHomeClubName,
  unimportantAwayClubName,
  location, // cordinates
  date,
  league,
}) => ({
  attitude,
  attitudeEstimationLevel,
  importance,
  homeClubId: _get(homeClub, '_id', null),
  homeClubName: _get(homeClub, 'name', null),
  homeClubLogo: _get(homeClub, 'logo', null),
  awayClubId: _get(awayClub, '_id', null),
  awayClubName: _get(awayClub, 'name', null),
  awayClubLogo: _get(awayClub, 'logo', null),
  isHomeClubReserve,
  isAwayClubReserve,
  unimportantHomeClubName,
  unimportantAwayClubName,
  leagueName: _get(league, 'name', null),
  coordinates: _get(location, 'coordinates', null),
  date
});

const mergeWithDefaultParams = (params) => {
  const { filters, sort } = params;

  const finalParams = Object.assign({}, defaultParams);

  if (!_isEmpty(filters)) {
    Object.assign(finalParams, {
      filters: {
        ...finalParams.filters,
        ...filters,
      },
    });
  }

  if (!_isEmpty(sort)) {
    Object.assign(finalParams, {
      sort,
    });
  }

  return finalParams;
}

const getDateFilterForName = (filterName) => {
  switch (filterName) {
    case 'last7days': {
      return {
        dateFrom: +moment(new Date()).subtract(7,'days').startOf('day').format('x'),
        dateTo: +moment(new Date()).startOf('day').format('x'),
      };
    }
    case 'yesterday':
      return {
        dateFrom: +moment(new Date()).subtract(1,'days').startOf('day').format('x'),
        dateTo: +moment(new Date()).subtract(1,'days').endOf('day').format('x'),
      };
    case '7days':
      return {
        dateFrom: Date.now() - MATCH_DURATION, // - 120 minutes
        dateTo: Date.now() + DAYS_IN_ADVANCE, // + 7 days
      };
    case 'today':
      return {
        dateFrom: +moment(new Date()).startOf('day').format('x'),
        dateTo: +moment(new Date()).endOf('day').format('x'),
      };
    case 'tomorrow':
      return {
        dateFrom: +moment(new Date()).add(1,'days').startOf('day').format('x'),
        dateTo: +moment(new Date()).add(1,'days').endOf('day').format('x'),
      };

    case 'dayAfterTomorrow':
        return {
          dateFrom: +moment(new Date()).add(2,'days').startOf('day').format('x'),
          dateTo: +moment(new Date()).add(2,'days').endOf('day').format('x'),
        };
  }
}

function Matches({ screenProps, navigation }) {
  const footerScrollViewRef = useRef();
  const buttonsRefs = useRef(DATE_FILTERS_NAMES.reduce((acc, { value }) => {
    acc[value] = useRef();

    return acc;
  }, {}));

  const { queryParams: queryParamsProps, location } = screenProps;

  const [state, setState] = useState({
    dateFilter: getDateFilterForName('7days'),
    dateFilterName: '7days',
    queryParams: mergeWithDefaultParams(queryParamsProps),
    isFirstRun: true,
    matches: [],
    page: 1,
    shouldLoading: true,
    isLoading: false,
    clearRun: true,
  });

  const {
    dateFilter,
    dateFilterName,
    queryParams,
    isFirstRun,
    matches,
    page,
    isLoading,
    shouldLoading,
    clearRun,
  } = state;

  useEffect(() => {
    setTimeout(() => {
      scrollToButton(buttonsRefs.current['7days'].current);
    }, 1);
  }, [])

  useEffect(() => {
    if (!isFirstRun) {
      setState(prevState => ({
        ...prevState,
        queryParams: mergeWithDefaultParams(queryParamsProps),
        page: 1,
        shouldLoading: true,
        matches: [],
        clearRun: true,
      }));
    }
  }, [queryParamsProps]);

  useEffect(() => {
    fetchMatches();
  }, [page, queryParams, dateFilter]);
  
  const fetchMatches = useCallback(async () => {
    if (isLoading || !shouldLoading) return false;

    setState(prevState => ({
      ...prevState,
      isLoading: true,
      isFirstRun: false,
      clearRun: false,
    }));

    const finalParams = Object.assign({}, queryParams, {
      page,
    });

    _set(finalParams, 'filters.dateFrom', dateFilter.dateFrom);
    _set(finalParams, 'filters.dateTo', dateFilter.dateTo);

    const { data: retrievedMatches } = await Api.get('/matches', finalParams);

    const newSouldLoading = retrievedMatches.length >= 50;

    setState(prevState => ({
      ...prevState,
      matches: [...prevState.matches, ...retrievedMatches],
      isLoading: false,
      shouldLoading: newSouldLoading,
    }));
  }, [page, isLoading, shouldLoading, queryParams, dateFilter, matches]);
  
  const handleReachEnd = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      page: page + 1,
    }));
  }, [page]);

  const renderItem = useCallback(({ item }) => (
    <MatchInList
      {...extractFromItem(item)}
      location={location}
      navigate={navigation.navigate}
    />
  ), [location]);

  const handleChangeDateFilter = (newDateFilterName) => () => {
    const button = buttonsRefs.current[newDateFilterName].current;

    scrollToButton(button);

    if (dateFilterName !== newDateFilterName) {
      const {
        dateFrom,
        dateTo,
      } = getDateFilterForName(newDateFilterName);
  
      setState(prevState => ({
        ...prevState,
        matches: [],
        page: 1,
        shouldLoading: true,
        dateFilterName: newDateFilterName,
        clearRun: true,
        dateFilter: {
          dateFrom,
          dateTo,
        },
      }));
    }
  };

  const scrollToButton = useCallback((button) => {
    button.measureLayout(findNodeHandle(footerScrollViewRef.current), (x, y, width, height) => {
      footerScrollViewRef.current.scrollTo({
        x: x - (Dimensions.get('window').width / 2) + (width / 2),
        animated: true,
      });
    });
  }, [buttonsRefs, footerScrollViewRef])

  return (
    <>
      {!clearRun && !isLoading && matches.length === 0 && (
        <View style={styles.noMatches}>
          <Text style={styles.noMatchesText}>Nie znaleziono żadnego interesującego spotkania z podanymi kryteriami.</Text>
        </View>
      )}
      <VirtualizedList
        data={matches}
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={getKey}
        renderItem={renderItem}
        onEndReached={handleReachEnd}
        onEndReachedThreshold={0.8}
        style={styles.wrapper}
        windowSize={30}
        removeClippedSubviews={true}
      />
      {isLoading && (
        <View style={styles.loading}>
          <Spinner color="blue" />
        </View>
      )}
      <Footer style={styles.footer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          centerContent
          ref={footerScrollViewRef}
          renderToHardwareTextureAndroid
          collapsable={false}
        >
          {DATE_FILTERS_NAMES.map(({ name, value }) => {
            const buttonStyles = Object.assign({}, styles.footerButton);
            const buttonTextStyles = Object.assign({}, styles.footerButtonText)

            if (dateFilterName === value) {
              Object.assign(buttonStyles, styles.footerButtonActive);
              Object.assign(buttonTextStyles, styles.footerButtonTextActive)
            }

            return (
              <View
                ref={buttonsRefs.current[value]}
                key={value}
                renderToHardwareTextureAndroid={true}
              >
                <Button
                  style={buttonStyles}
                  onPress={handleChangeDateFilter(value)}
                  rounded={false}
                >
                  <Text style={buttonTextStyles}>{name}</Text>
                </Button>
              </View>
            )
          })}
        </ScrollView>
      </Footer>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ededed',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  footer: {
    height: 40,
  },
  footerButton: {
    height: 40,
    borderRadius: 0,
  },
  footerButtonActive: {
    backgroundColor: '#556ded',
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: 'normal'
  },
  footerButtonTextActive: {
    // color: '#3F51B5'
    fontWeight: 'bold'
  }, 
  noMatches: {
    padding: 10,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMatchesText: {
    textAlign: 'center'
  }
});

export default memo(Matches);
