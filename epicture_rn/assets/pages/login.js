import styles from '../styles/styles';
import HomeScreen from "./homescreen";
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {AuthSession} from 'expo';
import SyncStorage from 'sync-storage';

class Login extends React.Component {

  state = {
    result: null,
  };

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
	
    this.setState({ result });
	
	SyncStorage.set('access_token', result.params.access_token);
	SyncStorage.set('account_username', result.params.account_username);
	//result.type
	
	
	
    await fetch('https://api.imgur.com/3/account/me/', {
         method: 'GET',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
      })
      .then((response) => response.json())
      .then((responseJson) => {
			SyncStorage.set('img_profile', responseJson.data.avatar);
			SyncStorage.set('img_cover', responseJson.data.cover);
		  
         console.log(responseJson);
		 console.log(responseJson.data.avatar);
		 console.log(responseJson.data.cover);
      })
      .catch((error) => {
         console.error(error);
      });
   
	
	/*fetch('https://api.imgur.com/3/account/me/', {  
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		},
	}).then(function(response) {
		console.log("lol >>>> ", response.json())
	})*/

	
	
	
	
	
	
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