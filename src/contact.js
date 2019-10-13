import React, {useState, useEffect} from 'react';
import Contacts from 'react-native-contacts';

const Phonebook = cb => {
  Contacts.getAll((err, contacts) => {
    return cb({contacts, err});
  });
};

export default Phonebook;
