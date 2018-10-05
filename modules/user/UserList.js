import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements'; 
import styles from '../../res/styles';
import colors from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    fetch("https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": 0 , \"window\": 30}", {
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

  handleMore = () => {
    console.log("something very cool")
  }

  renderListCell (user, index) {
    return (
      <ListItem
        key={index}
        title={user.name}
        subtitle={user.role}
        onPress={() => this.onPress(index)}
        bottomDivider
        onEndReached={() => this.handleMore()}
        onEndReachedThreshold={0}
      />
    )
  }

  renderList = () => {
    return this.state.users.map((user, index) => (
      this.renderListCell(user, index)
    ))
  }

  keyExtractor = (item, index) => item.id;

  onPressListItem = (index) => {
    console.log(index)
  }

  onPressEdit = (index) => {
    console.log("Editar usuário " + index)
  }

  onPressDelete = (index) => {
    console.log("Deletar usuário " + index)
  }

  renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      subtitle={
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text>{item.role}</Text>
        </View>
      }
      rightIcon={
        <View style={{flexDirection: "column"}}>
            <Icon
              name='edit'
              size={20}
              color='black'
              onPress={() => this.onPressEdit(index)} />

            <Icon
              name='trash'
              size={20}
              color='black'
              onPress={() => this.onPressDelete(index)} />
        </View>
      }
      onPress={() => this.onPressListItem(index)}
      bottomDivider
    />
  )

  render() {
    return (
      <View style={styles.container}>
      <View style={{padding: 10}}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.users}
        renderItem={this.renderItem}
        onEndReached={() => this.handleMore()}
      />
      </View>
      </View>
    );
  }
}

// AppRegistry.registerComponent('TaqTileOnboard', () => UserList);