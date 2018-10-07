import React from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { FloatingButton } from '../../components/index'
import styles from '../../res/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import Store from '../../components/Store'

class UserListItem extends React.PureComponent {
  onPressListItem = () => {
    this.props.navigation.navigate('UserDetails', {userId: this.props.item.id})
  }

  onPressEdit = (item) => {
    this.props.navigation.navigate('UserForm', {header: 'Editar Usuário', user: item, form: 'update'})
  }

  onPressDelete = (index) => {
    console.log("Deletar usuário " + index)
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
    const { page, totalPages } = this.state
    if (page <= totalPages) {
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
          users: [...this.state.users, ...responseJson.data],
          totalPages: responseJson.pagination.totalPages,
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
    if (!this.state.loading) return null;

    return (
      <View
        style={styles.footerLoading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({ item, index }) => (
    <UserListItem 
      item={item}
      index={index}
      navigation={this.props.navigation}
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