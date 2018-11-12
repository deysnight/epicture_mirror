import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../styles/styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

class ImgShower extends React.Component {
  render() {
    const data = this.props.navigation.getParam('img_data', null)
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: 30 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
		      <Image
                style={{justifyContent: 'center', alignItems: 'center', height: 300, width: 300}}
                source={{uri: data.images[0].link}}
                resizeMode="contain"
            />
          </View>
        <View style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
          <View style={{ flex: 1, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between', flexDirection: 'row'}}>
          <FontAwesomeIcon name="heart-o" color="black" size={24} />
          {/* <FontAwesomeIcon name="heart" color="black" size={24} /> QUAND C'EST FAV */}
          <FeatherIcon name="download" color="black" size={24} />
          </View>
        </View>
      </View>
    );
  }
}

export default ImgShower;