import styles from '../styles/styles';
import React from 'react';
import {Alert, TextInput, Image, Text, View, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import SyncStorage from 'sync-storage';


import { ImagePicker } from 'expo';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import ImgToBase64 from 'react-native-image-base64';


const defaultState = {
  values: {
    pictureUrl: '',
    Title: 'Titre',
    Desc: 'Description'
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

  deleteImageConfirm = () => {
    Alert.alert(
      'Êtes-vous sûr ?',
      'Vos changements ne seront pas sauvegardés',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Valider', onPress: this.deleteImage},
      ],
      { cancelable: false }
    )
  };

  deleteImage = () => {
    this.onChangeText('pictureUrl', '');
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });

    if (!result.cancelled) {
      this.onChangeText('pictureUrl', result.uri);
      this.onChangeText('Title', 'Titre');
      this.onChangeText('Desc', 'Description');
      this.setState({Title: 'Titre'});
      this.setState({Desc: 'Description'});
      this.setState({pictureUrl: result.base64});
    }
  };

//TO_SEND =  this.state.title + this.state.desc + pictureUrl
componentDidMount() {
  this.makeRemoteRequest();
}

makeRemoteRequest = () => {
  const url = "https://api.imgur.com/3/account/me/";
  this.setState({ loading: true });
  fetch(url, {
       method: 'GET',
   headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
  }
    })
    .then(res => res.json())
    .then(res => {
      SyncStorage.set('account_username', res.data.url);
      this.setState({
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
};

UploadImage = () => {
  let formdata = new FormData();
  const url = "https://api.imgur.com/3/image"
  formdata.append('image', this.state.pictureUrl);
  formdata.append('title', this.state.Title);
  formdata.append('name', this.state.Title);
  formdata.append('description', this.state.Desc);
  this.setState({ loading: true });
  fetch(url, {
       method: 'POST',
   headers: {
    'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
    'Content-Type': 'multipart/form-data'
  },
  body: formdata
    })
    .then(res => res.json())
    .then(res => {
      console.log(res); 
      this.setState({
        error: res.error || null,
        loading: false,
        refreshing: false
      });


    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
    this.props.navigation.navigate('Images Populaires');
};
   render() {
    const { values: { pictureUrl, Title, Desc }} = this.state;
    return (
      <View style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{marginTop: 20}}>
        <Text style={{textAlign:'center', fontSize: 28, fontWeight: 'bold'}}>Uploadez votre image</Text>
      </View>
        <View>
        {pictureUrl ? (
          <View style={styles.containerUploadPic}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput name="title" defaultValue={Title} onChangeText={text => this.setState({Title: text})} underlineColorAndroid="#FFF" style={styles.InputUpload} placeholder='Titre' />
              <TextInput name="desc" defaultValue={Desc} onChangeText={text => this.setState({Desc: text})} underlineColorAndroid="#FFF" style={styles.InputUpload} placeholder='Description' />
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
            onPress={this.deleteImageConfirm}> 
            <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Supprimer</Text>
          </AwesomeButtonBlue>
          <AwesomeButtonBlue style={{marginRight: 15}} height={40} width={100} backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
            borderRadius={30}
            onPress={this.UploadImage}> 
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


