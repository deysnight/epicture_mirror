import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {TextInput, Image, Text, View, Button, TouchableOpacity } from 'react-native';
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
      <View style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{marginTop: 20}}>
        <Text style={{textAlign:'center', fontSize: 28, fontWeight: 'bold'}}>Upload</Text>
      </View>
        <View>
        {pictureUrl ? (
          <View style={styles.containerUploadPic}>
          <TouchableOpacity style={{ borderColor: 'grey', borderStyle: "dashed", borderWidth: 1, borderRadius: 5, width: 250, height: 250 }} onPress={this.pickImage}>
            <Image style={styles.UploadPic} source={{ uri: pictureUrl }} style={{ width: 250, height: 250 }} onPress={this.pickImage} /> 
          </TouchableOpacity>
          </View>
          ) 
          : 
          <View style={styles.containerUploadPic}>
          <TouchableOpacity style={{ borderColor: 'grey', borderStyle: "dashed", borderWidth: 1, borderRadius: 5, width: 250, height: 250 }} onPress={this.pickImage}>
            <View /> 
          </TouchableOpacity>
            <Text>Taille Max: 20MB</Text>
          </View>
          }
        </View>
        <View style={{paddingTop: 15, paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
          <Button title="Upload" />
        </View>
      </View>
    );
  }
}

export default UploadScreen;


