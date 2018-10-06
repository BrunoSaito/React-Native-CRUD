import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Login } from './modules/login/Login';
import { UserList } from './modules/user/UserList';
import { UserDetails } from './modules/user/UserDetails';

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