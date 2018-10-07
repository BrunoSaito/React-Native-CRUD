import React, { Component } from 'react'
import { View, Picker, Platform } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import styles from '../../res/styles'
import colors from '../../res/colors'

export class UserForm extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.header}`
    });

    constructor(props) {
        super(props)
        this.state = {name: "",
                      nameError: false,
                      password: "",
                      passwordError: false,
                      email: "",
                      emailError: false,
                      role: "",
                      token: "",
                      loading: false}
    }

    validateName = () => {
        let reg = /\d/
        if (this.state.name.length == 0 || reg.test(this.state.name))
            this.setState({ nameError: true })
        else
            this.setState({ nameError: false })
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

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: "center", marginTop: 10}}>
                <Input
                    onChangeText={(name) => this.setState({name: name})}
                    onBlur={this.validateName}
                    value={this.props.navigation.state.params.form == 'update' ? this.props.navigation.state.params.user.name : ''}
                    placeholder='Nome'
                    inputContainerStyle={this.state.nameError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
                    errorStyle={this.state.nameError == true ? { color: 'red' } : { color: 'white' }}
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
                    value={this.props.navigation.state.params.form == 'update' ? this.props.navigation.state.params.user.email : ''}
                    placeholder='E-mail'
                    inputContainerStyle={this.state.emailError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
                    errorStyle={this.state.emailError == true ? { color: 'red' } : { color: 'white' }}
                    errorMessage={'Por favor, insira um email válido.'}
                />

                <Text style={{fontSize: 20}}>Cargo:</Text>
                <Picker
                    selectedValue={this.props.navigation.state.params.form == 'update' ? this.props.navigation.state.params.user.role : ""}
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
                    onPress={this.onSubmit}
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