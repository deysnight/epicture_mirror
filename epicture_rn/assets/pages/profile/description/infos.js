import styles from '../../../styles/styles';
import React from 'react';
import {Image, SafeAreaView, Text, View, ImageBackground } from 'react-native';
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
      if (res.data.reputation_name === "Forever Alone")
        SyncStorage.set('reputation', "Bâtard");
      else if (res.data.reputation_name === "Neutral")
        SyncStorage.set('reputation', "Neutre");
      else if (res.data.reputation_name === "Accepted")
        SyncStorage.set('reputation', "Accepté");
      else if (res.data.reputation_name === "Liked")
        SyncStorage.set('reputation', "Bien aimé");
      else if (res.data.reputation_name === "Trusted")
        SyncStorage.set('reputation', "De Confiance");
      else if (res.data.reputation_name === "Idolazed")
        SyncStorage.set('reputation', "Idolâtré");
      else if (res.data.reputation_name === "Renowned")
         SyncStorage.set('reputation', "Reconnu");
      else if (res.data.reputation_name === "Glorious")
        SyncStorage.set('reputation', "Glorieux");
      SyncStorage.set('account_username', res.data.url);
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
        <Text style={styles.profileDescheaderData}>Réputation</Text>
        <Text style={styles.profileData}>{SyncStorage.get('reputation')}</Text>
        <View style={styles.profileDescSeparator}>
        </View>
        <Text style={styles.profileDescheaderData}>Images publiées</Text>
        <Text style={styles.profileData}>{this.state.nb_pic}</Text>
        <View style={styles.profileDescSeparator}>
        </View>
        <Text style={styles.profileDescheaderData}>Albums publiés</Text>
        <Text style={styles.profileData}>{this.state.nb_album}</Text>
        <View style={styles.profileDescSeparator}>
        </View>
        <Text style={styles.profileDescheaderData}>Commentaires publiés</Text>
        <Text style={styles.profileData}>{this.state.nb_comment}</Text>
        <View style={styles.profileDescSeparator}>
        </View>
      </View>
      </SafeAreaView>
    )
  }
}


export default InfosScreen;
