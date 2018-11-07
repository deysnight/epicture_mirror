import styles from '../styles/styles';
import React from 'react';
import {Image, SafeAreaView, Text, View, Button, ImageBackground } from 'react-native';
import SyncStorage from 'sync-storage';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

class ProfileHeader extends React.Component {
     render() {
      return (
          <SafeAreaView style={{flex: 1}}>
          <ImageBackground
             source={{uri: SyncStorage.get('img_cover')}}
             resizeMode={'cover'}
             style={{
               flexDirection: 'row',
               height: 150,
               backgroundColor: '#f5f5f5',
               borderBottomColor: 'grey',
               borderBottomWidth: 1,
               alignItems: 'center',
               justifyContent: 'space-around'}}
               >
             <Image source={{uri: SyncStorage.get('img_profile')}} // image profile
             style={{width: 80, height: 80, borderRadius: 100}} />
           </ImageBackground>
           <Text style={styles.profilePseudo}>{SyncStorage.get('account_username')}</Text>
       </SafeAreaView>
      );
    }
  }
  
  export default ProfileHeader;
  