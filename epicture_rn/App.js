import styles from './assets/styles/styles';
import SecondScreen from "./assets/pages/page2";
import TroisScreen from "./assets/pages/page3";
import HomeScreen from "./assets/pages/homescreen";
import Login from "./assets/pages/login";
import React from 'react';
import { TouchableNativeFeedback, ScrollView, Text, View, Image } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';

import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

const HeaderDrawer = (props) => (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.drawerHeader}>
      <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} // image profile
        style={{width: 50, height: 50, borderRadius: 100}} />
      <Text numberOfLines={1} style={styles.drawerPseudo}>Pseudo</Text>
    </View>
    <ScrollView style={{backgroundColor: 'white'}}>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const DrawerStack = createDrawerNavigator({
  "Images Populaires": { screen: HomeScreen,
    navigationOptions: {
      title: "Images Populaires",
      drawerIcon: ({tintColor}) => (<FontAwesomeIcon style={{color:tintColor}} name="star-o" color="black" size={24} />)
    }
   },
  "Mes favoris": { screen: SecondScreen,
    navigationOptions: {
      title: "Mes favoris",
      drawerIcon: ({tintColor}) => (<FontAwesomeIcon style={{color:tintColor}} name="heart-o" color="black" size={24} />)
    } 
  },
  "Upload": { screen: TroisScreen,
    navigationOptions: {
      title: "Upload",
      drawerIcon: ({tintColor}) => (<FeatherIcon style={{color:tintColor}} name="upload" color="black" size={24} />)
    }
  }
  }, {
    contentComponent: HeaderDrawer,
    contentOptions: {
      activeTintColor: '#336B87'
    }
})

const LoginStack = createStackNavigator({
	loginScreen: { screen: Login },
}, {
	headerMode: 'float',
	navigationOptions: {
		headerStyle: {backgroundColor: 'white'},
		title: 'Page de Login',
		headerTintColor: 'black'
	}
})




const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, 
{
  headerMode: 'float',
    navigationOptions: ({navigation}) => ({
    title: "Welcome!",
    headerStyle: {backgroundColor: 'white'},
    headerTintColor: 'black',
	  headerTitleStyle: {flex: 1},
    headerRight: (
    <View style={ styles.profile_header }>
      <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} // image profile
       style={{width: 35, height: 35, borderRadius: 100}} />
    </View>
    ),
    headerLeft: (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('grey', true)} onPress={() => navigation.openDrawer()}>
        <View style={{ marginLeft: 10, borderRadius: 100}}>
          <IonIcon name="ios-menu" color="black" size={34}  />
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
	initialRouteName: 'loginStack'  //'loginStack' a remettre quand le login sera fait
})




export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}