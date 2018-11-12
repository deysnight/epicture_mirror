import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';

class FavoriteScreen extends React.Component {   
	constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/favorites/"
    this.setState({ loading: true });
    fetch(url, {
         method: 'GET',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
          refreshing: false
        });


      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
   render() {
    return (
      <View style={styles.container}>
		    
      </View>
    );
  }
}

export default FavoriteScreen;