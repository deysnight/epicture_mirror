import styles from '../../../styles/styles';
import Greeting from '../../../utils/Greeting';
import React from 'react';
import {Image, SafeAreaView, Text, View, Button, ImageBackground } from 'react-native';
import SyncStorage from 'sync-storage';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import ProfileHeader from '../../../utils/ProfileHeader'

class UserImageScreen extends React.Component {
  render() {
    return (
      <ProfileHeader></ProfileHeader>
    )
  }
}

export default UserImageScreen;
