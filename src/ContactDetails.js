import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import Button from './Button';
import Contacts from 'react-native-contacts';
import {StackActions} from 'react-navigation';

import {NameCard} from '../App';
const ContactDetail = props => {
  const [updatedContacts, setUpdatedContacts] = useState({});
  const listner = useRef(null);

  useEffect(() => {
    listner.current = props.navigation.addListener('didFocus', () => {
      props.navigation.state.params.setState(prevState => ({
        ...prevState,
        screen: false,
      }));
    });
    return () => {
      listner.current.remove();
    };
  }, []);

  const saveContacts = () => {
    Contacts.updateContact(
      {
        ...props.navigation.state.params.contacts[
          props.navigation.state.params.index
        ],
        ...updatedContacts,
      },
      err => {
        if (!err) {
          props.navigation.state.params.setState(prevState => {
            return {
              ...prevState,
              contacts: [
                ...prevState.contacts.slice(
                  0,
                  props.navigation.state.params.index,
                ),
                {
                  ...prevState.contacts[props.navigation.state.params.index],
                  ...updatedContacts,
                },
                ...prevState.contacts.slice(
                  props.navigation.state.params.index + 1,
                ),
              ],
              screen: true,
            };
          });
        }
        if (err) throw err;
        // record updated
      },
    );
  };

  const getTempDetails = details => {
    setUpdatedContacts(details);
  };
  return (
    <>
      <View>
        <Text>Contact Detais</Text>
        <NameCard
          tempDetails={getTempDetails}
          name={props.navigation.state.params.item.displayName}
          phoneNumbers={props.navigation.state.params.item.phoneNumbers}
        />
      </View>
      <Button onPress={saveContacts} title="save" />
    </>
  );
};

export default ContactDetail;
