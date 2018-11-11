import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../styles/styles';

class ImgShower extends React.Component {
  render() {
    const data = this.props.navigation.getParam('img_data', null)
    return (
        <View style={styles.container}>
		    <Image
                style={{flex:1, height: undefined, width: undefined}}
                source={{uri: data.images[0].link}}
                resizeMode="contain"
            />
        </View>
    );
  }
}

export default ImgShower;