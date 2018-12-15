import React, { Component } from 'react'
import { View, Picker, Platform } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import styles from '../../res/styles'
import colors from '../../res/colors'
import Store from '../../components/Store'

export class UserForm extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.header}`
    });

    constructor(props) {
        super(props)
        this.state = {user: "",
                      userError: false,
                      password: "",
                      passwordError: false,
                      email: "",
                      emailError: false,
                      role: "",
                      token: "",
                      loading: false}
    }

    validateUser = () => {
        let reg = /\d/
        if (this.state.user.length == 0 || reg.test(this.state.user))
            this.setState({ userError: true })
        else
            this.setState({ userError: false })
    }

    validatePassword = () => {
        if (this.state.password.length < 4) {
            this.setState({passwordError: true})
        }
        else {
            this.setState({passwordError: false})
        }
    }

    validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    
        if (reg.test(this.state.email) === false) {
          this.setState({emailError: true})
        }
        else {
          this.setState({emailError: false})
        }
    }

    componentWillMount() {
        if (this.props.navigation.state.params.form == 'update') {
            this.setState({
                user: this.props.navigation.state.params.user.name,
                email: this.props.navigation.state.params.user.email,
                role: this.props.navigation.state.params.user.role
            })
        }
        Store("get", "token").then((token) => {
            this.setState({token: token})
        })
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw response;
        }
        Store("set", "token", response.headers.get("Authorization"))
        return response.json();
    }

    updateUser = () => {

    }

    createUser = () => {
        fetch("https://tq-template-server-sample.herokuapp.com/users", {
            method: "POST",
            headers: {
                Authorization: this.state.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.user,
                password: this.state.password,
                email: this.state.email,
                role: this.state.role
            })
        })
        .then((response) => this.handleErrors(response))
        .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.data.active)
            if (responseJson.data.active == true) {
                this.props.navigation.navigate("UserList")
            }
            else {
                this.setState({errorMessage: "Ocorreu um erro. Tente novamente."})
            }
        })
        .catch((error) => {
            error.json().then((errorMessage) => {
                this.setState({errorMessage: errorMessage.errors[0].message, valid: false})
                console.log(errorMessage.errors[0].message)
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: "center", marginTop: 10}}>
                <Input
                    onChangeText={(user) => this.setState({user: user})}
                    onBlur={this.validateUser}
                    defaultValue={this.props.navigation.state.params.form == 'update' ? this.state.user : ''}
                    placeholder='Nome'
                    inputContainerStyle={this.state.userError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
                    errorStyle={this.state.userError == true ? { color: 'red' } : { color: 'white' }}
                    errorMessage={'Por favor, insira um nome válido.'}
                />

                {this.props.navigation.state.params.form != 'update' &&
                <Input
                    onChangeText={(password) => this.setState({password: password})}
                    onBlur={this.validatePassword}
                    placeholder='Senha'
                    inputContainerStyle={this.state.passwordError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
                    secureTextEntry={true}
                    errorStyle={this.state.passwordError == true ? { color: 'red' } : { color: 'white' }}
                    errorMessage={'Por favor, insira uma senha válida.'}
                />
                }

                <Input
                    onChangeText={(email) => this.setState({email: email})}
                    onBlur={this.validateEmail}
                    defaultValue={this.props.navigation.state.params.form == 'update' ? this.state.email : ''}
                    placeholder='E-mail'
                    inputContainerStyle={this.state.emailError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
                    errorStyle={this.state.emailError == true ? { color: 'red' } : { color: 'white' }}
                    errorMessage={'Por favor, insira um email válido.'}
                />

                <Text style={{fontSize: 20}}>Cargo:</Text>
                <Picker
                    selectedValue={this.state.role}
                    style={Platform.OS === 'ios' ? { height: 100, width: '80%' } : {height: 50, width: '80%'}}
                    itemStyle={Platform.OS === 'ios' ? { height: 100 } : {}}
                    onValueChange={(itemValue, itemIndex) => this.setState({role: itemValue})}>
                    <Picker.Item label="Usuário" value="user" />
                    <Picker.Item label="Administrador" value="admin" />
                </Picker>

                </View>
                <View style={[styles.buttonContainer, {padding: 10}]}>
                    <Button
                    title={this.props.navigation.state.params.form == 'create' ? 'Criar' : 'Editar'}
                    onPress={this.props.navigation.state.params.form == 'create' ? this.createUser : this.updateUser}
                    titleStyle={{ fontWeight: "700" }}
                    disabled={this.state.emailError == true || this.state.passwordError == true || 
                              this.state.password == "" || this.state.email == ""}
                    buttonStyle={{
                        backgroundColor: colors.grey,
                        height: 45,
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    />
                </View>
            </View>
        );
    }
}