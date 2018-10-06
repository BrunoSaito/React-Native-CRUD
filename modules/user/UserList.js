import React from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import styles from '../../res/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import Store from '../../components/Store'

export class UserList extends React.Component {
  static navigationOptions = {
    title: "Lista de Usuários"
  }; 

  constructor(props) {
    super(props)
    this.state = {users: [],
                  page: 0,
                  loading: false,
                  token: ""}
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw response;
    }
    Store("set", "token", response.headers.get("Authorization"))
    return response.json();
  }

  getUsersList = () => {
    const { page } = this.state
    this.setState({ loading: true })
    const url = `https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": ${page}, \"window\": 10}`
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: this.state.token
      },
    })
    .then((response) => this.handleErrors(response))
    .then((responseJson) => { 
      this.setState({
        users: [...this.state.users, ...responseJson.data], page: this.state.page + 1,
        loading: false
      })
    })
    .catch((error) => {
      this.setState({ loading: false })
      error.json().then((errorMessage) => {
        console.log("errorMessage" + errorMessage)
      })
    });
  }

  componentWillMount() {
    Store("get", "token").then((token) => {
      this.setState({token: token})
      this.getUsersList()
    })
  }

  handleMore = () => {
    this.getUsersList()
  }

  keyExtractor = (item) => { return item.id.toString() }

  onPressListItem = (index) => {
    this.props.navigation.navigate("UserDetails", {userId: this.state.users[index].id})
  }

  onPressEdit = (index) => {
    console.log("Editar usuário " + index)
  }

  onPressDelete = (index) => {
    console.log("Deletar usuário " + index)
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      subtitle={
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text>{item.role}</Text>
          <Text>{item.id}</Text>
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
          // keyExtractor={ this.keyExtractor }
          keyExtractor={ item => item.id.toString() }
          data={ this.state.users }
          renderItem={ this.renderItem }
          onEndReached={() => this.handleMore()}
          onEndReachedThreshold={0}
          ListFooterComponent={ this.renderFooter }
        />
      </View>
      </View>
    );
  }
}

// AppRegistry.registerComponent('TaqTileOnboard', () => UserList);