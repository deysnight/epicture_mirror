import styles from '../styles/styles';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {AuthSession} from 'expo';

class Login extends React.Component {

   state = {
    result: null,
  };

  render() {
    return (
      <View style={loginstyles.container}>
        <Button title="Open imgur Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
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