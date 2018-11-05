import styles from '../styles/styles';
import HomeScreen from "./homescreen";
import React from 'react';
import {Image, StyleSheet, Text, View, Button } from 'react-native';
import {AuthSession} from 'expo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


class Login extends React.Component {

  state = {
    result: null,
  };
  access_token = null;
  render() {
    return (
      <View style={loginstyles.container}>
        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
        style={{width: 140, height: 140, borderRadius: 100}} />
        <AwesomeButtonBlue backgroundColor="#90AFC5" backgroundDarker="#336B87"
        borderRadius={30}
        onPress={this._handlePressAsync}> 
        <IonIcon name="ios-arrow-forward" color="white" size={15} />
        <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>    Se connecter</Text>
        </AwesomeButtonBlue>
        {this.state.result ? (
		<Text> {this.access_token} </Text>
        ) : null}
        </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        'https://api.imgur.com/oauth2/authorize?client_id=' + '4cda8d97dfe79a3' + '&response_type=' + 'token' + '&state=APPLICATION_STATE',
    });
	
	this.access_token = result.params.access_token
    this.setState({ result });
	
    this.props.navigation.navigate('drawerStack');
	

  };
}

const loginstyles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 100
  },
});

export default Login;