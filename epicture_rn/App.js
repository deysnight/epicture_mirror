import styles from './assets/styles/styles';
import SecondScreen from "./assets/pages/page2";
import TroisScreen from "./assets/pages/page3";
import HomeScreen from "./assets/pages/homescreen";
import React from 'react';
import {Alert, TouchableNativeFeedback, Text, View, Image, Button, Dimensions  } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

const DrawerStack = createDrawerNavigator({
  screen1: { screen: HomeScreen },
  screen2: { screen: SecondScreen },
  screen3: { screen: TroisScreen },
})

const LoginStack = createStackNavigator({
	loginScreen: { screen: HomeScreen },
}, {
	headerMode: 'float',
	navigationOptions: {
		headerStyle: {backgroundColor: '#E73536'},
		title: 'You are not logged in',
		headerTintColor: 'white'
	}
})

const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'white'},
    title: 'Images populaires',
    headerTintColor: 'black',
	  headerTitleStyle: {
	  flex: 1
    },
    headerRight: (
    <View style={ styles.profile_header }>
      <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} // image profile
       style={{width: 35, height: 35, borderRadius: 100}} />
    </View>
    ),
    headerLeft: (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('grey', true)} onPress={() => navigation.openDrawer()}>
        <View style={{ marginLeft: 10, borderRadius: 100}}>
          <Icon name="ios-menu" color="black" size={34}  />
        </View>
      </TouchableNativeFeedback>
  )})
})


const RootStack = createStackNavigator({
	loginStack: { screen: LoginStack },
	drawerStack: { screen: DrawerNavigation }
}, {
	headerMode: 'none',
	title: 'Main',
	initialRouteName: 'drawerStack'  //'loginStack' a remettre quand le login sera fait
})



/*const RootStack = createDrawerNavigator(
  {
	Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home Page',
        drawerLabel: 'Home',
      },
    },
    Second: SecondScreen,
  },
  {
    initialRouteName: 'Home',
	
	navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    },
  }
);*/

//const AppStack = createStackNavigator({ RootStack : { screen: RootStack } });


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
