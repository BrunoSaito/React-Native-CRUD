import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Login } from './modules/login/Login';
import { UserList } from './modules/user-list/UserList';
// import styled from 'styled-components';

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  UserList: {
   screen: UserList 
  }
}, {
  initialRouteName: "Login"
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
// AppRegistry.registerComponent('TaqTileOnboard', () => HomeScreen);