import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { ButtonAlert, ButtonNeutral, Loading } from '../../components/index'
import styles from '../../res/styles'
import Store from '../../components/Store'

class Details extends Component {
    render() {
        if (this.props.visible == false) return null

        return (
            <View style={styles.MainContainer}>
                <View style={{flexDirection: "row"}}>
                    <Text>Nome: </Text>
                    <Text>{this.props.user.name}</Text>
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text>E-mail: </Text>
                    <Text>{this.props.user.email}</Text>
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text>Cargo: </Text>
                    <Text>{this.props.user.role}</Text>
                </View>

                <View style={styles.bottomView}>
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <ButtonAlert
                        title="Deletar"
                        containerStyle={{width: "30%"}}
                    />
                    
                    <ButtonNeutral
                        title="Editar"
                        containerStyle={{width: "30%"}}
                    />
                    </View>
                </View>
            </View>
        );
    }
}

export class UserDetails extends React.Component {
    static navigationOptions = {
        title: "Detalhes de Usuário"
    };

    constructor(props) {
        super(props)
        this.state = {user: "",
                      userName: "",
                      token: "",
                      loading: false}
    }

    handleErrors = (response) => {
        if (!response.ok)
            throw response
        return response.json()
      }

    getUserDetails = () => {
        this.setState({ loading: true })
        fetch("https://tq-template-server-sample.herokuapp.com/users/" + this.props.navigation.state.params.userId, {
            method: "GET",
            headers: {
                Authorization: this.state.token
            },
        })
        .then((response) => this.handleErrors(response))
        .then((responseJson) => {
            this.setState({ 
                user: responseJson.data,
                loading: false
            })
        })
        .catch((error) => {
            this.setState({ loading: false })
            error.json().then((errorMessage) => {
                console.log(errorMessage)
            })
        });
    }

    componentWillMount() {
        Store("get", "token").then((token) => {
            this.setState({token: token})
            this.getUserDetails()
        })
    }

    render() {
        const loading = this.state.loading;
        return (
            <View style={styles.container}>
            <View style={styles.MainContainer}>
            {/* {loading &&
                <View style={styles.loading}>
                  <ActivityIndicator size='large' />
                </View>
            } */}
                <Loading
                    loading={this.state.loading}
                    text="Carregando..."
                />
                <Details
                    visible={!loading}
                    user={this.state.user}
                />
            </View>
            </View>
        );
    }
}