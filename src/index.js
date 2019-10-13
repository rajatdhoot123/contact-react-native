import React, {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const Permissions = () => {
  const [permissions, setPermissions] = useState({
    contacts: 'denied',
    contactsWrite: 'denied',
  });
  useEffect(() => {
    readContactPermission()
      .then(res => {
        if (res === 'granted') {
          setPermissions({
            ...permissions,
            contacts: 'granted',
          });
        } else {
          setPermissions({
            ...permissions,
            contacts: 'denied',
          });
        }
      })
      .catch(err => {
        console.warn({err});
      });
  }, [permissions.contacts]);

  useEffect(() => {
    writeContactPermission()
      .then(res => {
        if (res === 'granted') {
          setPermissions({
            ...permissions,
            contactsWrite: 'granted',
          });
        } else {
          setPermissions({
            ...permissions,
            contactsWrite: 'denied',
          });
        }
      })
      .catch(err => {
        console.warn({err});
      });
  }, [permissions.contactsWrite]);

  return [permissions];
};

const readContactPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
    },
  );
};

const writeContactPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    {
      title: 'Contacts',
      message: 'This app would like to ei your contacts.',
    },
  );
};

export default Permissions;
