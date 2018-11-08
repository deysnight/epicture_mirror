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
                <IonIcon name="md-paper" color="black" size={24} />
            )
        }
    },
    Profil2: {
        screen: TropheeScreen,
        navigationOptions: {
            title: "Trophées",
            tabBarIcon: ({tintColor}) => (
                <FeatherIcon name="award" color="black" size={24} />
            )
        }
    },
    Profil3: {
        screen: InfosScreen,
        navigationOptions: {
            title: "Infos",
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name="information-outline" color="black" size={24} />
            )
        }
    }
});

export default createStackNavigator({ProfileTabs}, { headerMode: "none"});