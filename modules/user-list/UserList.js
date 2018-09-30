import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../../res/styles'

export class UserList extends React.Component {
  static navigationOptions = {
    title: "Lista de Usuários"
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text>User List Screen</Text>
      </ScrollView>
      </View>
    );
  }
}

// AppRegistry.registerComponent('TaqTileOnboard', () => UserList);