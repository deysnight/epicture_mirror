import styles from '../../../styles/styles';
import Greeting from '../../../utils/Greeting';
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
  fromEpoch = (before) => {
    var t = new Date(before);
    var after = moment(t).format('D MM YYYY');
    console.log(after);
    return (after);
  }

   render() {
    var x = this.fromEpoch(1370001284000);
    return (
      <SafeAreaView>
        <ProfileHeader></ProfileHeader>
        <View>
          <Text>{SyncStorage.get('account_username')}</Text>
          <Text>Une bio stylé</Text>
          <Text>Compte crée le On peut get l'epoch avec une requête de base (celle de login)</Text>
          <AwesomeButtonBlue backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
            borderRadius={10}> 
            <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Modifier</Text>
          </AwesomeButtonBlue>
        </View>
      </SafeAreaView>
    )
  }
}

export default DescriptionScreen;
