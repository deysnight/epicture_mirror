import styles from './assets/styles/styles';
import FavorisScreen from "./assets/pages/favoris";
import UploadScreen from "./assets/pages/upload";
import HomeScreen from "./assets/pages/homescreen";
import SearchScreen from "./assets/pages/search";
import Login from "./assets/pages/login";
import updateProfileScreen from "./assets/pages/updateprofilescreen"
import ImgShower from "./assets/pages/show_img";
import SyncStorage from 'sync-storage';
import React from 'react';
import { TouchableNativeFeedback, ScrollView, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import Profile from './assets/pages/profile'
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

const HeaderDrawer = (props) => (
  <SafeAreaView style={{flex: 1}}>
     <ImageBackground
        source={{uri: SyncStorage.get('img_cover')}}
        resizeMode={'cover'}
        style={{
          flexDirection: 'row',
          height: 120,
          backgroundColor: '#f5f5f5',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          alignItems: 'center',
          justifyContent: 'space-around'}}
          >
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Image source={{uri: SyncStorage.get('img_profile')}}
              style={{width: 60, height: 60, borderRadius: 100}} />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.drawerPseudo}>{SyncStorage.get('account_username')}</Text>
      </ImageBackground>
    <ScrollView style={{backgroundColor: 'white'}}>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const DrawerStack = createDrawerNavigator({
  "Images Populaires": { screen: (props) => <HomeScreen {...props} img_mode={"myHome"} />, //HomeScreen,
    navigationOptions: {
      title: "Images Populaires",
      drawerLabel: "Image Populaires",
      drawerIcon: ({tintColor}) => (<FontAwesomeIcon style={{color:tintColor}} name="star-o" color="black" size={24} />)
    }
   },
   "Recherche": { screen: SearchScreen,
    navigationOptions: {
      title: "Recherche",
      drawerIcon: ({tintColor}) => (<IonIcon style={{color:tintColor}} name="ios-search" color="black" size={24} />)
    }
   },
  "Mes favoris": { screen: (props) => <FavorisScreen {...props} img_mode={"myFav"} />,//FavorisScreen,
    navigationOptions: {
      title: "Mes favoris",
      drawerIcon: ({tintColor}) => (<FontAwesomeIcon style={{color:tintColor}} name="heart-o" color="black" size={24} />)
    } 
  },
  "Upload": { screen: UploadScreen,
    navigationOptions: {
      title: "Upload",
      drawerIcon: ({tintColor}) => (<FeatherIcon style={{color:tintColor}} name="upload" color="black" size={24} />)
    }
  },
  Profile: { screen: Profile,
    navigationOptions: {
      drawerLabel: 'Profil',
      drawerIcon: ({tintColor}) => (<FeatherIcon style={{color:tintColor}} name="user" color="black" size={24} />)
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
	navigationOptions:  ({navigation}) => ({
    title: "Page de login",
    headerStyle: {backgroundColor: 'white'},
    headerTintColor: 'black',
    headerTitleStyle: {flex: 1, textAlign: 'center', alignSelf: 'center'},
    titleStyle: {color: 'red'},
  })
},
)

const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack },
  testScreen: { screen: ImgShower },
  updateProfileScreen: { screen: updateProfileScreen },

}, 
{
  headerMode: 'float',
    navigationOptions: ({navigation}) => ({
    title: "Epicture",
    headerStyle: {backgroundColor: 'white'},
    headerTintColor: 'black',
	  headerTitleStyle: {flex: 1},
    headerRight: (
    <View style={ styles.profile_header }>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={{uri: SyncStorage.get('img_profile')}}
          style={{width: 35, height: 35, borderRadius: 100}} />
      </TouchableOpacity>
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
	initialRouteName: 'loginStack'
})

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}