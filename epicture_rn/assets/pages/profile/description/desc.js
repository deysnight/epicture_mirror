import styles from '../../../styles/styles';
import React from 'react';
import {Image, SafeAreaView, Text, View, Button, ImageBackground } from 'react-native';
import SyncStorage from 'sync-storage';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import moment from 'moment';

import ProfileHeader from './../../../utils/ProfileHeader'

class DescriptionScreen extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      username: '',
      description: '',
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  fromEpoch = (before) => {
    var after = moment(new Date(before * 1000)).format('D MMMM YYYY');
    return (after);
  }
  makeRemoteRequest = () => {
    const url = "https://api.imgur.com/3/account/me/";
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
        SyncStorage.set('account_username', res.data.url);
        SyncStorage.set('img_profile', res.data.avatar + "&fidelity=grand");
        SyncStorage.set('img_cover', res.data.cover + "&fidelity=grand");
        this.setState({
          username: res.data.url,
          description: res.data.bio,
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
    var x = this.fromEpoch(SyncStorage.get('creation'));
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ProfileHeader></ProfileHeader>
        <View style={styles.profileDescContainer}>
        <Text style={styles.profileDescheaderData}>Nom de compte</Text>
          <Text style={styles.profileData}>{this.state.username}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>Biographie</Text>
          <Text style={styles.profileData}>{this.state.description}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>Création</Text>
          <Text style={styles.profileData}>{x}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <View style={styles.profileDescButton}>
            <AwesomeButtonBlue height={36} width={90} backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
            borderRadius={7}
            onPress={() => navigate('updateProfileScreen')}
            > 
            <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>Modifier</Text>
            </AwesomeButtonBlue>
          </View>
        </View> 
      </View>
    )
  }
}

export default DescriptionScreen;
