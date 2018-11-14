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
          <ImageBackground
             source={{uri: SyncStorage.get('img_cover')}}
             resizeMode={'cover'}
             style={{
               flexDirection: 'column',
               height: 200,
               backgroundColor: '#f5f5f5',
               borderBottomColor: 'grey',
               borderBottomWidth: 1,
               alignItems: 'center',
               justifyContent: 'space-around'}}
               >
             <Image source={{uri: SyncStorage.get('img_profile')}} // image profile
             style={{width: 100, height: 100, borderRadius: 100}} />
            <Text style={styles.profilePseudoHeader}>{SyncStorage.get('account_username')}</Text>
           </ImageBackground>       
      );
    }
  }
  
  export default ProfileHeader;
  