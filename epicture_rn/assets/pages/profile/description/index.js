import { createStackNavigator } from 'react-navigation';
import DescriptionScreen from './profile';
import UserImageScreen from './my_image';
import InfosScreen from './infos';
export default createStackNavigator({
    DescriptionScreen,
    UserImageScreen,
    InfosScreen
})