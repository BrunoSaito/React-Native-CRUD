import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import styles from '../../res/styles'

export class Login extends React.Component {
    static navigationOptions = {
      title: "Login"
    };
  
    constructor(props) {
      super(props)
      this.state = {userName: "", 
                    userNameError: false,
                    password: "",
                    passwordError: false}
    }
  
    _onLoginClicked = () => {
      this.props.navigation.navigate("UserList")
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View style={{marginTop:40}}>
          <TextInput
          style={styles.textInput}
            placeholder="User name"
            // underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(userName) => userName == "" ? this.setState({userNameError: true}) : this.setState({userName: userName, userNameError: false})}
          />
  
          <Text
          style={styles.alert}>
            {this.state.userNameError == true ? "Por favor, insira um nome válido." : ""}
          </Text>
  
          <TextInput
          style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => password == "" ? this.setState({passwordError: true}) : this.setState({password: password, passwordError: false})}
          />
  
          <Text
          style={styles.alert}>
            {this.state.passwordError == true ? "Por favor, insira uma senha válida." : ""}
          </Text>
  
          <View style={styles.buttonContainer}>
            <Button
            onPress={this._onLoginClicked}
            color="grey"
            title="Entrar"
            disabled={this.state.userNameError == true || this.state.passwordError == true || 
                      this.state.password == "" || this.state.userName == ""}/>
          </View>
          </View>
        </View>
      );
    }
  }

//   AppRegistry.registerComponent('TaqTileOnboard', () => Login);