import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {TextInput, Image, Text, View, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

import { ImagePicker } from 'expo';
import { Input, Button } from 'react-native-elements';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const defaultState = {
  values: {
    pictureUrl: '',
    height: 0,
    width: 0,
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

  deleteImage = () => {
    this.onChangeText('pictureUrl', '');
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.onChangeText('pictureUrl', result.uri);
      this.onChangeText('height', result.height);
      this.onChangeText('width', result.width);
    }
  };

   render() {
     const { values: { pictureUrl, height, width }} = this.state;
    return (
      <View style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{marginTop: 20}}>
        <Text style={{textAlign:'center', fontSize: 28, fontWeight: 'bold'}}>Uploadez votre image</Text>
      </View>
        <View>
        {pictureUrl ? (
          <View style={styles.containerUploadPic}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput underlineColorAndroid="#FFF" style={styles.InputUpload} placeholder='Titre' />
              <TextInput underlineColorAndroid="#FFF" style={styles.InputUpload} placeholder='Description' />
            </View>
              <TouchableOpacity style={{width: 250, height: 250}} onPress={this.pickImage}>
              <Image style={styles.UploadPic} source={{ uri: pictureUrl }} resizeMode="contain" style={{width: 250, height: 250}} onPress={this.pickImage} /> 
              </TouchableOpacity>
          </View>
          ):
          <View style={styles.containerUploadPic}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'grey', borderStyle: "dashed", borderWidth: 1, borderRadius: 5, width: 250, height: 250 }} onPress={this.pickImage}>
              <Image opacity={0.3} source={{ uri: "http://image.noelshack.com/fichiers/2018/45/6/1541810464-icon-image-128.png" }} resizeMode="contain" style={{width: 50, height: 50}} /> 
            </TouchableOpacity>
          <View /> 
            <Text style={{fontSize: 12, color: 'grey'}}>Taille Max: 20MB</Text>
          </View>
          }
        </View>
        <View style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
        {pictureUrl ? (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <AwesomeButtonBlue style={{marginRight: 15}} height={40} width={100} backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
            borderRadius={30}
            onPress={this.deleteImage}> 
            <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Supprimer</Text>
          </AwesomeButtonBlue>
          <AwesomeButtonBlue style={{marginRight: 15}} height={40} width={100} backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
            borderRadius={30}> 
            <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Upload</Text>
          </AwesomeButtonBlue>
        </View>
        ):
        <AwesomeButtonBlue height={40} width={150} disabled={true} backgroundColor="grey" backgroundDarker="#336B87" raiseLevel={0}
          borderRadius={30}> 
          <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Upload</Text>
        </AwesomeButtonBlue>
      }
        </View>
      </View>
    );
  }
}

export default UploadScreen;


