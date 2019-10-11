import React, { useCallback, memo } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { Text, Icon, ListItem, Left, Right, Button } from 'native-base';

import { IMAGES_URL } from 'root/config/config';

function YourClub({
  onAction,
  onActionType,
  isLoading,
  name,
  transliterationName = '',
  logo,
  clubId,
}) {

  const handleAction = useCallback(() => {
    onAction(clubId);
  }, [onAction]);

  const {
    iconStyles,
    iconName,
    indicatorColor
  } = onActionType === 'add'
    ? {
      iconStyles: styles.addIcon,
      iconName: 'add',
      indicatorColor: 'green',
    }
    : {
      iconStyles: styles.removeIcon,
      iconName: 'delete',
      indicatorColor: 'red'
    };

  return (
    <ListItem noIndent key={clubId} style={styles.listItem}>
      <Left style={styles.clubLeft}>
        <Image
          style={styles.logo}
          source={{uri: `${IMAGES_URL}/h180/${logo}`}}
        />
        <View style={styles.clubNameWrapper}>
          <Text style={styles.clubName} numberOfLines={1}>{name}</Text>
          {transliterationName.length > 0 && <Text style={styles.clubTransliterationName} numberOfLines={1}>{transliterationName}</Text>}
        </View>
      </Left>
      <Right>
        {isLoading
          ? (
            <ActivityIndicator color={indicatorColor} size="small" style={styles.loading} />
          )
          : (
            <Button light onPress={handleAction}>
              <Icon type="MaterialIcons" name={iconName} style={iconStyles} />
            </Button>
          )}
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  listItem: {
    height: 80
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  clubNameWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center'
  },
  clubName: {
    alignSelf: 'flex-start',
  },
  clubTransliterationName: {
    fontSize: 12,
    color: '#a3a3a3',
    alignSelf: 'flex-start',
  },
  loading: {
    marginRight: 20,
  },
  // Specific
  removeIcon: {
    color: 'red',
    fontSize: 26,
  },
  addIcon: {
    color: 'green',
    fontSize: 26,
  },
  
});

export default memo(YourClub);
