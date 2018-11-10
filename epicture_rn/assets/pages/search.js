import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import { SearchBar } from 'react-native-elements'

class SearchScreen extends React.Component {   
   render() {
    return (
      <View style={styles.container}>
        <SearchBar
            round
            clearIcon={{ color: 'black' }}
            containerStyle={{backgroundColor: "white"}}
            inputContainerStyle={{backgroundColor:"#f5f5f5"}}
            inputStyle={{backgroundColor:"#f5f5f5", fontSize: 13, borderWidth: 1, borderColor: "transparent", color: "black"}}
            searchIcon={{ size: 18 }}
            leftIconContainerStyle={{backgroundColor:"#f5f5f5"}}
            rightIconContainerStyle={{backgroundColor:"#f5f5f5"}}
            //onChangeText={someMethod}
            platform="default"
            placeholder='Rechercher' 
        />
        <View style={[{flex: 3, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='TEST' />
			<Greeting style={[styles.bigblue, styles.red]} name='TEST' />
		</View>        
      </View>
    );
  }
}

export default SearchScreen;