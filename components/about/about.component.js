import React, { memo } from 'react';
import { Container, Text, Button } from 'native-base';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';

import AppHeader from 'root/components/appHeader/appHeader.component';

function About(props) {
  const { navigation } = props;

  return (
    <Container>
      <AppHeader navigation={navigation} title="O aplikacji" />
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.paragraph}>Nie bardzo rozumiesz założenie aplikacji? Już śpieszę z wyjaśnieniem.</Text>
          <Text style={styles.paragraph}>Aplikacja wyświetla mecze na podstawie ich znaczenia kibicowskiego (do lig okręgowych włącznie). Czyli na ile ciekawe pod kątem zaangażowania kibiców obu drużyn szykują się spotkania.</Text>
          <Text style={styles.paragraph}>Projekt zaczął się od napisania aplikacji fanaticsmap.pl gdzie można przeglądać relacje między kibicami różnych klubów. W międzyczasie pojawił się pomysł aby spróbować obliczać wzajemne nastawienie do siebie kibców dwóch drużyn i w końcu aby obliczać samo potencjalne znaczenie kibicowskie danego meczu.</Text>
          <Text style={styles.paragraph}>Algorytm jest nadal w bardzo wczesnej fazie więc mogą pojawiać się różne anomalie. Uwzględnia sporo różnych czynników natomiast wszystkie obliczenia odbywają się automatycznie stąd nie jestem w stanie uwzględniać chociażby zakazów. Póki co także marginalizowany jest sam aspekt sportowy.</Text>
          <Text style={styles.paragraph}>Przy okazji jest to moja pierwsza aplikacja mobilna więc będę wdzięczny za wyrozumiałość i uwagi ;) Projekt jest niekomercyjny więc mogę się w niego angażować niestety tylko w ograniczonym zakresie.</Text>
          <Text style={styles.paragraph}>Wszelkie uwagi możesz zgłaszać pisząc na:</Text>
          <Button style={styles.button} onPress={() => Linking.openURL('mailto:fanaticsmap@gmail.com')}><Text>fanaticsmap@gmail.com</Text></Button>
          <Text style={styles.paragraph}>Zajrzyj także na wspomnianą Mapę Fanatyków, będę wdzięczny za wszelkie wprowadzone sugestie!</Text>
          <Button style={styles.button} onPress={() => Linking.openURL('https://www.fanaticsmap.pl')}><Text>www.fanaticsmap.pl</Text></Button>
          <Text style={styles.paragraph}>Jeśli nie obce są Ci tematy kibicowskie, doskonale orientujesz się co się dzieje na trybunach także niższych lig, wiesz kto z kim trzyma, a kto nie, potrafisz recytować z pamięci fankluby każdego klubu na naszym podwórku - odezwij się. Twoja pomoc może się okazać nieoceniona! Im precyzyjniejsze dane będą w bazie danych tym lepsze podpowiedzi pojawią się w aplikacji!</Text>
          <Text style={styles.copyrights}>&copy; Piotr Ryczek 2019</Text>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  paragraph: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
  },
  copyrights: {
    fontSize: 12,
  },
  button: {
    marginBottom: 10,
  }
});

export default memo(About);
