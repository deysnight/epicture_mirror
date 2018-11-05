import styles from '../styles/styles';
import HomeScreen from "./homescreen";
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {AuthSession} from 'expo';

class Login extends React.Component {

  state = {
    result: null,
  };
  access_token = null;

  render() {
    return (
      <View style={loginstyles.container}>
        <Button title="Open imgur Auth" onPress={this._handlePressAsync} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;