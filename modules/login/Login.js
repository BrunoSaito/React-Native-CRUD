import React from "react";
import { Text, View, Keyboard } from "react-native";
import styles from '../../res/styles'
import colors from '../../res/colors'
import { Button, Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props)
    this.state = {email: "", 
                  emailError: false,
                  password: "",
                  passwordError: false,
                  errorMessage: "",
                  valid: true}
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw response;
    }
    return response.json();
  }

  _onLoginClicked = () => {
    Keyboard.dismiss()
    fetch("https://tq-template-server-sample.herokuapp.com/authenticate", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // password: this.state.password,
        // email: this.state.email,
        password: '1111',
        email: 'admin@taqtile.com',
        rememberMe: false
      })
    })
    .then((response) => this.handleErrors(response))
    .then((responseJson) => responseJson.data.user.active == true ? this.props.navigation.navigate("UserList", {token: responseJson.data.token}) : this.setState({errorMessage: "Ocorreu um erro. Tente novamente."}))
    .catch((error) => {
      error.json().then((errorMessage) => {
        this.setState({errorMessage: errorMessage.errors[0].message, valid: false})
      })
    });
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if (reg.test(this.state.email) === false) {
      this.setState({emailError: true})
    }
    else {
      this.setState({emailError: false})
    }
  }

  validatePassword = () => {
    if (this.state.password.length < 4) {
      this.setState({passwordError: true})
    }
    else {
      this.setState({passwordError: false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 10}}>
          <View style={{alignItems: 'center', marginTop:40}}>

          <Input
            onChangeText={(email) => this.setState({email: email})}
            onBlur={this.validateEmail}
            placeholder='E-mail'
            inputContainerStyle={this.state.emailError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
            autoCapitalize={"none"}
            errorStyle={this.state.emailError == true ? { color: 'red' } : { color: 'white' }}
            errorMessage={'Por favor, insira um e-mail válido.'}
            leftIcon={
              <Icon
                name='at'
                size={20}
                color='black' />
            }
          />

          <Input
            onChangeText={(password) => this.setState({password: password})}
            onBlur={this.validatePassword}
            placeholder='Senha'
            inputContainerStyle={this.state.passwordError == true ? { borderBottomColor: colors.light_red} : {backgroundColor: 'white'}}
            secureTextEntry={true}
            errorStyle={this.state.passwordError == true ? { color: 'red' } : { color: 'white' }}
            errorMessage={'Por favor, insira uma senha válida.'}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black' />
            }
          />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Entrar"
              onPress={this._onLoginClicked}
              titleStyle={{ fontWeight: "700" }}
              // disabled={this.state.emailError == true || this.state.passwordError == true || 
              //           this.state.password == "" || this.state.email == ""}
              buttonStyle={{
                backgroundColor: colors.grey,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
        </View>

        <Overlay
        isVisible={!this.state.valid}
        onBackdropPress={() => this.setState({valid: true})}
        height={100}
        overlayStyle={{marginBottom: 200, justifyContent: 'center'}} >
          <View style={styles.container}>
            <Text>{this.state.errorMessage}</Text>
            <Button 
            title="OK"
            onPress={() => this.setState({valid: true})}
            containerStyle={{marginTop:30}}
            buttonStyle={{
              backgroundColor: colors.grey,
              height: 35,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            />
          </View>
        </Overlay>  
      </View>
    );
  }
}

//   AppRegistry.registerComponent('TaqTileOnboard', () => Login);