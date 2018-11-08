import { createStackNavigator } from 'react-navigation';
import DescriptionScreen from './profile';
import TropheeScreen from './trophee';
import InfosScreen from './infos';
export default createStackNavigator({
    DescriptionScreen,
    TropheeScreen,
    InfosScreen
})