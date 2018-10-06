import React from 'react'
import { View, Text } from 'react-native'
import { ButtonAlert, ButtonNeutral } from '../../components/index'
import styles from '../../res/styles'
import Store from '../../components/Store'

export class UserDetails extends React.Component {
    static navigationOptions = {
        title: "Detalhes de Usuário"
    };

    constructor(props) {
        super(props)
        this.state = {user: "",
                      userName: "",
                      token: ""}
    }

    handleErrors = (response) => {
        if (!response.ok)
            throw response
        return response.json()
      }

    getUserDetails = () => {
        fetch("https://tq-template-server-sample.herokuapp.com/users/" + this.props.navigation.state.params.userId, {
            method: "GET",
            headers: {
                Authorization: this.state.token
            },
        })
        .then((response) => this.handleErrors(response))
        .then((responseJson) => this.setState({ user: responseJson.data }))
        .catch((error) => {
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
        return (
            <View style={styles.MainContainer}>
                    <View style={{flexDirection: "row"}}>
                        <Text>Nome: </Text>
                        <Text>{this.state.user.name}</Text>
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text>E-mail: </Text>
                        <Text>{this.state.user.email}</Text>
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text>Cargo: </Text>
                        <Text>{this.state.user.role}</Text>
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