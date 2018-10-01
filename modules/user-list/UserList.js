import React, { IntrinsicElements } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../../res/styles'


export class UserList extends React.Component {
  static navigationOptions = {
    title: "Lista de Usuários"
  };

  constructor(props) {
    super(props)
    this.state = {users: []}
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw response;
    }
    return response.json();
  }

  getUsersList = () => {
    fetch("https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": 0 , \"window\": 10}", {
      method: "GET",
      headers: {
        Authorization: this.props.navigation.state.params.token
      },
      
    })
    .then((response) => this.handleErrors(response))
    .then((responseJson) => this.setState({users: responseJson.data}))
    .catch((error) => {
      error.json().then((errorMessage) => {
        console.log(errorMessage)
      })
    });
  }

  componentWillMount() {
    this.getUsersList()
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{padding: 10}}>
      <ScrollView>
        {this.state.users.map(user =>
          <Text>
            {user.name}
          </Text>
        )}
      </ScrollView>
      </View>
      </View>
    );
  }
}

// AppRegistry.registerComponent('TaqTileOnboard', () => UserList);