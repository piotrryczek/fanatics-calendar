import React, { useCallback } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Header, Button, Left, Right, Icon, Body, Title } from 'native-base';

function Appheader({ children, navigation, title, goBack: isGoBack, goBackScreen }) {
  const { goBack, navigate } = navigation;

  const handleGoBack = useCallback(() => {
    if (goBackScreen) {
      navigate(goBackScreen);
    } else {
      goBack()
    }
  }, []);

  return (
    <Header style={styles.header}>
      <Left>
        {isGoBack
          ? (
            <Button
              transparent
              onPress={handleGoBack}
              style={styles.drawerButton}
            >
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          )
          : (
            <Button
              transparent
              onPress={navigation.openDrawer}
              style={styles.drawerButton}
            >
              <Icon name="menu" />
            </Button>
          )
        }
        
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {children}
      </Right>
      
    </Header>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 0,
    paddingTop: StatusBar.currentHeight,
    height: 80,
    backgroundColor: '#3F51B5',
  },
  drawerButton: {
    paddingLeft: 15
  }
});

export default Appheader;
