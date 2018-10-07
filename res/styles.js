import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
    },
    MainContainer:
    {
      marginLeft: 10,
      marginRight: 10,
      flex: 1,
      paddingTop: 10
    },
    bottomView:{
      width: '100%', 
      height: 50, 
      position: 'absolute',
      bottom: 0,
      marginBottom: 30
    },
    textStyle:{
      color: '#fff',
      fontSize:22
    },
    alert: {
      color: "red"
    },
    header: {
      fontSize: 40,
      marginBottom: 20
    },
    textInput: {
      height: 40
    },
    submitButton: {
      height: 50,
      color: "#ff5c5c"
    },
    buttonContainer: {
      marginTop: 10
    },
    buttonNeutral: {
      backgroundColor: colors.grey,
      height: 35,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    },
    buttonAlert: {
      backgroundColor: colors.accent,
      height: 35,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    },
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  export default styles;