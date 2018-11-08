import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DescriptionScreen from './description/desc';
import TropheeScreen from './description/trophee';
import InfosScreen from './description/infos';
 
const ProfileTabs = createBottomTabNavigator({
    Profil1: {
        screen: DescriptionScreen,
        navigationOptions: {
            title: "Description",
            tabBarIcon: ({tintColor}) => (
                <IonIcon name="ios-arrow-forward" color="black" size={20} />
            )
        }
    },
    Profil2: {
        screen: TropheeScreen,
        navigationOptions: {
            title: "Trophées",
            tabBarIcon: ({tintColor}) => (
                <IonIcon name="ios-arrow-forward" color="black" size={20} />
            )
        }
    },
    Profil3: {
        screen: InfosScreen,
        navigationOptions: {
            title: "Infos",
            tabBarIcon: ({tintColor}) => (
                <IonIcon name="ios-arrow-forward" color="black" size={20} />
            )
        }
    }
});

export default createStackNavigator({ProfileTabs}, { headerMode: "none"});