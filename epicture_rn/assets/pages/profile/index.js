import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DescriptionScreen from './description/desc';
import UserImageScreen from './description/my_image';
import InfosScreen from './description/infos';
 
const ProfileTabs = createBottomTabNavigator({
    Profil1: {
        screen: DescriptionScreen,
        navigationOptions: {
            title: "Description",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name="md-paper" color={tintColor} size={24} />
            )
        }
    },
    Profil2: {
        screen: UserImageScreen,
        navigationOptions: {
            title: "Mes images",
            tabBarIcon: ({tintColor}) => (
                <Feather name="image" color={tintColor} size={24} />
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
   order: ['Profil1', 'Profil2', 'Profil3'],
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