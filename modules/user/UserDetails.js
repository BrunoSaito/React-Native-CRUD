import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements'; 
import styles from '../../res/styles';
import colors from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export class UserDetails extends React.Component {
    static navigationOptions = {
        title: "Detalhes de Usuário"
    };

    constructor(props) {
        super(props)
        this.state = {}
    }

    getUserDetails = () => {
        fetch("https://tq-template-server-sample.herokuapp.com/users/" + this.props.navigation.state.params.userId, {
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
        console.log("userId: " + this.props.navigation.state.params.userId)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cool text</Text>
            </View>
        );
    }
}