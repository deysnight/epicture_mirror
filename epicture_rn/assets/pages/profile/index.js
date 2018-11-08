import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DescriptionScreen from './description/desc';
import TropheeScreen from './description/trophee';
import InfosScreen from './description/infos';
 
const ProfileTabs = createBottomTabNavigator({
    Profil1: {
        screen: DescriptionScreen,
        navigationOptions: {
            title: "Description",
            tabBarIcon: ({tintColor}) => (
                <IonIcon name="md-paper" color={tintColor} size={24} />
            )
        }
    },
    Profil2: {
        screen: TropheeScreen,
        navigationOptions: {
            title: "Trophées",
            tabBarIcon: ({tintColor}) => (
                <FeatherIcon name="award" color={tintColor} size={24} />
            )
        }
    },
    Profil3: {
        screen: InfosScreen,
        navigationOptions: {
            title: "Statistiques",
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name="information-outline" color={tintColor} size={24} />
            )
        }
    }
}, {
   order: ['DescriptionScreen', 'TropheeScreen', 'InfosScreen'],
   navigationOptions: {
       tabBarVisible: true
   },
   tabBarOptions: {
       activeTintColor: '#336B87',
       inactiveTintColor: 'grey'
   }
}
);



export default createStackNavigator({ProfileTabs}, { headerMode: "none"});