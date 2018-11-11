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
  render() {
    return (
      <SafeAreaView>
      <ProfileHeader></ProfileHeader>
      <View>
        <Text>Reputation: </Text>
        <Text>Images publiées: </Text>
        <Text>Albums publiés: </Text>
        <Text>Commentaires publiés: </Text>
      </View>
      </SafeAreaView>
    )
  }
}


export default InfosScreen;
