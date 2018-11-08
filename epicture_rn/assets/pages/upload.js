import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {TextInput, Image, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import { ImagePicker } from 'expo';

const defaultState = {
  values: {
    Title: '',
    pictureUrl: '',
    Description: '',
  },
  errors: {},
  isSubmitting: false,
};


class UploadScreen extends React.Component {
  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });

    if (!result.cancelled) {
      this.onChangeText('pictureUrl', result.uri);
    }
  };

   render() {
     const { values: { Title, pictureUrl, Description }} = this.state;
    return (
      <View>
        <TextInput value={Title}  onChangeText={this.onChangeText} />
        <TextInput value={Description} onChangeText={this.onChangeText} />
        <Button title="Choisir une image" onPress={this.pickImage} />
        {pictureUrl ? (
          <View style={styles.containerUploadPic}>
          <Image style={styles.UploadPic} source={{ uri: pictureUrl }} style={{ width: 260, height: 260 }} /> 
          </View>
          ) : null}
        <Button title="Upload" />
      </View>
    );
  }
}

export default UploadScreen;


