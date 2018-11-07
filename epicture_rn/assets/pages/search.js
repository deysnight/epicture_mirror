import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import { SearchBar, Divider } from 'react-native-elements'

class SearchScreen extends React.Component {   
   render() {
    return (
      <View style={styles.container}>
        <SearchBar
            round
            clearIcon={{ color: 'black' }}
            containerStyle={{backgroundColor: "white"}}
            inputStyle={{backgroundColor:"#f5f5f5", borderWidth: 1, borderColor: "transparent", color: "black"}}
            searchIcon={{ size: 28 }}
            //onChangeText={someMethod}
            platform="default"
            placeholder='Rechercher' 
        />
        <Divider style={{ backgroundColor: 'blue' }} />

        <View style={[{flex: 3, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='TEST' />
			<Greeting style={[styles.bigblue, styles.red]} name='TEST' />
		</View>        
      </View>
    );
  }
}

export default SearchScreen;