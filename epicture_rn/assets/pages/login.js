import styles from '../styles/styles';
import React from 'react';
import {Image, StyleSheet, Text, View, Button } from 'react-native';
import {AuthSession} from 'expo';
import SyncStorage from 'sync-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


class Login extends React.Component {

  state = {
    result: null,
  };

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  render() {
    return (
      <View style={styles.loginstyles}>
        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
        style={{width: 170, height: 170, borderRadius: 100}} />
        <AwesomeButtonBlue backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
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
	
    this.setState({ result });
	
	SyncStorage.set('access_token', result.params.access_token);
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
        console.log(responseJson)
      SyncStorage.set('account_username', responseJson.data.url);
      SyncStorage.set('img_profile', responseJson.data.avatar + "&fidelity=grand");
      SyncStorage.set('img_cover', responseJson.data.cover + "&fidelity=grand");
      SyncStorage.set('creation', responseJson.data.created);
      SyncStorage.set('bio', responseJson.data.bio);
      SyncStorage.set('userid', responseJson.data.id);
      })
      .catch((error) => {
         console.error(error);
      });
	
    this.props.navigation.navigate('drawerStack');
	

  };
}

export default Login;