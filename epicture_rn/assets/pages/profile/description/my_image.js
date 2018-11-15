import styles from '../../../styles/styles';
import Greeting from '../../../utils/Greeting';
import React from 'react';
import {Image, SafeAreaView, Text, View, RefreshControl, ImageBackground, TouchableHighlight } from 'react-native';
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import ProfileHeader from '../../../utils/ProfileHeader'

class UserImageScreen extends React.Component {
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
    this.makeRemoteRequest();
    this.getMyImage();
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

  check_link(item) {
    try {
        if (item.images)
        {
            if (item.images[0].type == "video/mp4") {
                link = "http://conceptcradle.com/project1/mvc/img/gif-icon.png"
            }
            else {
                link = item.images[0].link
            }
        }
        else
        {
            if (item.type == "video/mp4") {
                link = "http://conceptcradle.com/project1/mvc/img/gif-icon.png"
            }
            else {
                link = item.link
            }
        }
        return link
      }
      catch(error) {
        return (null);
      }
  }

  getMyImage = () => {
    const url = "https://api.imgur.com/3/account/me/images"
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
        this.setState({refreshing: false});
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getFavorite()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView>
      <ProfileHeader></ProfileHeader>
      <GridView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
        itemDimension={130}
        items={this.state.data}
        style={styles.gridView}
        renderItem={item => (
        <TouchableHighlight onPress={() => navigate('testScreen', {img_data: item, img_mode: "myimg"})}>
          <ImageBackground
            source={{uri: this.check_link(item)}}
            style={[styles.itemContainer, { backgroundColor: '#bababa' }]}
          >
            <Text style={styles.itemCode}>{item.views + "views"}</Text>
          </ImageBackground>
        </TouchableHighlight>
          
        )}
      />
      </SafeAreaView>
    )
  }
}

export default UserImageScreen;
