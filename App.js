/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import Permissions from './src';
import {v4} from 'uuid';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Phonebook from './src/contact';

export const NameCard = ({
  phoneNumbers = [],
  name,
  editable = true,
  contacts,
  tempDetails,
}) => {
  const [details, setDetails] = useState({
    displayName: name,
    phoneNumbers: phoneNumbers,
  });

  useEffect(() => {
    tempDetails(details);
  }, [details]);
  const handleTextChange = (type, index, text) => {
    if (type === 'name') {
      setDetails(prevState => ({...prevState, displayName: text}));
    } else {
      setDetails(prevState => {
        const number = {
          ...prevState.phoneNumbers.slice(index, index + 1)[0],
          number: text,
        };
        return {
          ...prevState,
          phoneNumbers: [
            ...prevState.phoneNumbers.slice(0, index),
            number,
            ...prevState.phoneNumbers.slice(index + 1),
          ],
        };
      });
    }
  };
  return (
    <>
      <View style={styles.flexRow}>
        <Text>Name</Text>
        <TextInput
          editable={editable}
          value={details.displayName}
          numberOfLines={1}
          onChangeText={handleTextChange.bind(null, 'name', null)}
          style={styles.marginLeft}
        />
      </View>

      <Text>Numbers</Text>
      {details.phoneNumbers.map(({id, label, number}, index) => (
        <View key={number} style={styles.flexRow}>
          <Text>{label}</Text>
          <TextInput
            editable={editable}
            value={number}
            numberOfLines={1}
            onChangeText={handleTextChange.bind(null, 'numbers', index)}
            style={styles.marginLeft}
          />
        </View>
      ))}
    </>
  );
};

const ContactView = ({
  contacts,
  err,
  navigation,
  writeContact,
  setState,
  refersh,
}) => {
  const handleContactDetails = (item, contacts, index) => {
    if (writeContact === 'granted') {
      navigation.navigate('ContactDetails', {
        item,
        contacts,
        index,
        setState,
      });
    }
  };
  return (
    <FlatList
      extraData={refersh}
      keyExtractor={item => item.key}
      data={
        contacts
          ? contacts.map(({displayName, phoneNumbers}) => ({
              displayName: displayName,
              phoneNumbers,
              key: v4(),
            }))
          : []
      }
      renderItem={({item, index, separators}) => (
        <TouchableHighlight
          onPress={handleContactDetails.bind(null, item, contacts, index)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          <View style={styles.contactsWrapper}>
            <NameCard
              editable={false}
              tempDetails={() => {}}
              phoneNumbers={item.phoneNumbers}
              name={item.displayName}
            />
          </View>
        </TouchableHighlight>
      )}
    />
  );
};

const App = props => {
  const [state, setState] = useState({
    contacts: [],
    err: '',
    screen: false,
  });
  const [permissions] = Permissions();

  useEffect(() => {
    if (state.screen) {
      props.navigation.navigate('Home');
    }
  }, [state.screen]);

  useEffect(() => {
    if (permissions.contacts === 'granted') {
      Phonebook(({contacts, err}) => {
        setState({contacts, err});
      });
    }
    if (permissions.contactsWrite === 'granted') {
      Phonebook(({contacts, err}) => {
        setState({contacts, err});
      });
    }
  }, [permissions]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <ContactView
            refersh={state.screen}
            setState={setState}
            writeContact={permissions.contactsWrite}
            navigation={props.navigation}
            contacts={state.contacts}
            err={state.err}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  marginLeft: {
    marginLeft: 5,
  },
  contactsWrapper: {
    padding: 5,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default App;
