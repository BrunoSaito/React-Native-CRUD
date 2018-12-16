import React from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { FloatingButton, Loading } from '../../components/index'
import styles from '../../res/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import Store from '../../components/Store'
import { handleErrors } from '../../components/ErrorHelpers'

class UserListItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  onPressListItem = () => {
    this.props.navigation.navigate('UserDetails', {userId: this.props.item.id})
  }

  onPressEdit = (item) => {
    this.props.navigation.navigate('UserForm', {header: 'Editar Usuário', user: item, form: 'update'})
  }

  onPressDelete = (index) => {
    console.log("Deletar usuário " + index.id)
    this.deleteUser(index.id)
  }

  deleteUser = (userId) => {
    this.props.handleLoading(true)
    fetch(`https://tq-template-server-sample.herokuapp.com/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: this.props.token
      }
    })
    .then((response) => handleErrors(response, true))
    .then((responseJson) => {
      this.props.handleUsers(responseJson.data.id)
      this.props.handleLoading(false)
    })
    .catch((error) => {
      console.log(error)
      this.props.handleLoading(false)
      error.json().then((errorMessage) => {
        console.log("errorMessage " + errorMessage.errors[0].message)
      })
    })
  }

  render() {
    return (
      <ListItem
      title={this.props.item.name}
      subtitle={
          <Text>{this.props.item.role}</Text>
      }
      rightIcon={
        <View style={{flexDirection: "column"}}>
            <Icon
              name='edit'
              size={20}
              color='black'
              onPress={() => this.onPressEdit(this.props.item)} />

            <Icon
              name='trash'
              size={20}
              color='black'
              onPress={() => this.onPressDelete(this.props.item)} />
        </View>
      }
      onPress={() => this.onPressListItem()}
      bottomDivider
    />
    );
  }
}

export class UserList extends React.Component {
  static navigationOptions = {
    title: "Lista de Usuários"
  }; 

  constructor(props) {
    super(props)
    this.state = {users: [],
                  page: 0,
                  totalPages: 0,
                  loadingFooter: false,
                  loadingList: false,
                  token: ""}
  }

  handleUsers = (userId) => {
    this.setState({users: [...this.state.users].filter(item => item.id != userId)})
  }

  handleLoading = (isLoading) => {
    console.log("isLoading : " + isLoading)
    this.setState({loadingList: isLoading})
  }

  getUsersList = () => {
    const { page, totalPages } = this.state
    if (page <= totalPages) {
      this.setState({ loadingFooter: true })
      const url = `https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": ${page}, \"window\": 10}`
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: this.state.token
        },
      })
      .then((response) => handleErrors(response))
      .then((responseJson) => { 
        this.setState({
          users: [...this.state.users, ...responseJson.data],
          totalPages: responseJson.pagination.totalPages,
          loadingFooter: false
        })
      }) 
      .catch((error) => {
        this.setState({ loadingFooter: false })
        error.json().then((errorMessage) => {
          console.log("errorMessage" + errorMessage)
        })
      });
    }
  }

  componentDidMount() {
    Store("get", "token").then((token) => {
      this.setState({token: token})
      this.getUsersList()
    })
  }

  handleMore = () => {
    this.setState({
      page: this.state.page + 1
    },
    () => {
      this.getUsersList()
    })
  }

  keyExtractor = (item) => { return item.id.toString() }

  onPressCreate = () => {
    this.props.navigation.navigate('UserForm', {header: 'Novo Usuário', form: 'create'})
  }

  renderFooter = () => {
    if (!this.state.loadingFooter) return null;

    return (
      <View
        style={styles.footerLoading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({ item, index }) => (
    <UserListItem 
      item = {item}
      index = {index}
      navigation = {this.props.navigation}
      token = {this.state.token}
      handleUsers = {this.handleUsers.bind(this)}
      handleLoading = {this.handleLoading.bind(this)}
    />
  )

  render() {
    return (
      <View style={styles.container}>
      <View style={{padding: 10}}>
        <Loading
          loading={this.state.loadingList}
          text="Carregando..."
        />
        <FlatList
          // keyExtractor={ this.keyExtractor }
          visible = {!this.state.loadingList}
          keyExtractor={ item => item.id.toString() }
          data={ this.state.users }
          renderItem={ this.renderItem }
          onEndReached={() => this.handleMore()}
          onEndReachedThreshold={1}
          ListFooterComponent={ this.renderFooter }
          removeClippedSubviews={true}
        />
        <FloatingButton
        onPress={this.onPressCreate}
        />
      </View>
      </View>
    );
  }
}

// AppRegistry.registerComponent('TaqTileOnboard', () => UserList);