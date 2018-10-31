import styles from './assets/styles/styles';
import SecondScreen from "./assets/pages/page2";
import TroisScreen from "./assets/pages/page3";
import HomeScreen from "./assets/pages/homescreen";
import React from 'react';
import {Alert, StyleSheet, Text, View, Button, Dimensions  } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';



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
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
	headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
	  flex: 1
    },
    headerRight: <View></View>, //logo de profile
	headerLeft: <Text onPress={() => 
		navigation.openDrawer()}>Menu</Text> // BURGER pour drawer
  })
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
