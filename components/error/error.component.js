import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Dimensions  } from 'react-native';
import { Text, Button, Icon } from 'native-base';

const errorDescriptions = {
  'NETWORK_ERROR': 'Problem z połączeniem.',
  'UNKNOWN_ERROR': 'Nieznany błąd.',
}

function Error() {
  const errorMessage = useSelector(state => state.errorMessage);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: 'CLEAR_ERROR'
    });
  }, []);

  if (!errorMessage) return (null);

  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{errorDescriptions[errorMessage]}</Text>
      <Button style={styles.closeButton} light small onPress={handleClose}>
        <Icon type="MaterialIcons" name="close" style={styles.closeIcon}></Icon>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 70,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9534f',
    flexDirection: 'row'
  },
  errorText: {
    textAlign: 'center',
    color: 'white'
  },
  closeButton: {
    marginLeft: 10,
  },
  closeIcon: {
    fontSize: 20,
    color: '#d9534f',
  }
});

export default Error;
