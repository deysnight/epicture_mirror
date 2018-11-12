import styles from '../../../styles/styles';
import Greeting from '../../../utils/Greeting';
import React from 'react';
import {Image, SafeAreaView, Text, View, Button, ImageBackground, RefreshControl } from 'react-native';
import SyncStorage from 'sync-storage';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import ProfileHeader from './../../../utils/ProfileHeader'

class InfosScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      nb_pic: 0,
      nb_album: 0,
      nb_comment: 0,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.getNbComment();
    this.getNbPic();
    this.getNbAlbum();
  }

  makeRemoteRequest = () => {
    const first = "https://api.imgur.com/3/account/me/";
    this.setState({ loading: true });
    fetch(first, {
         method: 'GET',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
      })
    .then(res => res.json())
    .then(res => {
      SyncStorage.set('account_username', res.data.url);
      SyncStorage.set('reputation', res.data.reputation_name);
      SyncStorage.set('img_profile', res.data.avatar + "&fidelity=grand");
      SyncStorage.set('img_cover', res.data.cover + "&fidelity=grand");
      this.setState({
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    };

    getNbComment = () => {
    const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/comments/count";
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
      console.log(res)
      this.setState({
        error: res.error || null,
        nb_comment: res.data,
        loading: false,
       refreshing: false
      });
    })
     .catch(error => {
       this.setState({ error, loading: false });
   });
  };

  getNbPic = () => {
    const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/images/count";
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
      console.log(res)
      this.setState({
        error: res.error || null,
        nb_pic: res.data,
        loading: false,
       refreshing: false
      });
    })
     .catch(error => {
       this.setState({ error, loading: false });
   });
  };

  getNbAlbum = () => {
    const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/albums/count";
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
      console.log(res)
      this.setState({
        error: res.error || null,
        nb_album: res.data,
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
      <SafeAreaView>
      <ProfileHeader></ProfileHeader>
      <View>
        <Text>Reputation: {SyncStorage.get('reputation')}</Text>
        <Text>Images publiées: {this.state.nb_pic}</Text>
        <Text>Albums publiés: {this.state.nb_album}</Text>
        <Text>Commentaires publiés: {this.state.nb_comment}</Text>
      </View>
      </SafeAreaView>
    )
  }
}


export default InfosScreen;
