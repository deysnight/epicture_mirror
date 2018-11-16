import React from "react";
import { View, Image } from "react-native";
import styles from '../styles/styles';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { Video } from 'expo';

class ImgComp extends React.Component {
  
  render() {
    const data = this.props.img_data

    if (!data)
    {
        link = "https://www.healthoptimizingmanila.com/sites/default/files/sample-image_25.png"
        type = "image/png"
    }
    else 
    {
        if (data.images)
        {
            type = data.images[0].type
            link = data.images[0].link
        }
        else
        {
            type = data.type
            link = data.link
        }
    }
    

    if (type != "video/mp4") {
      return (
        <View style={ styles.container }>
          <PinchZoomView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{flex: 1, height: 300, width: 300}}
              source={{uri: link}}
              resizeMode="contain"
            />
          </PinchZoomView>
        </View>
      );
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Video
                  source={{ uri: link }}
                  shouldPlay
                  resizeMode="contain"
                  style={{ flex: 1, alignContent: 'center', justifyContent: 'center', width: 300, height: 300 }}
                />
            </View>
        );
    }
  }
}

export default ImgComp;