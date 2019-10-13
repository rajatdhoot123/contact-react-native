import {createAppContainer} from 'react-navigation';
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import RootApp from '../App';
import ContactDetails from './ContactDetails.js';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: RootApp},
    ContactDetails: {screen: ContactDetails},
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(MainNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
