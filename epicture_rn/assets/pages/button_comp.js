import React, { Component } from "react";
import { Alert, View } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SyncStorage from 'sync-storage';

class ButtonComp extends React.Component {

  confirmRemoveImage = () => {
    Alert.alert(
      'Êtes-vous sûr ?',
      'Votre image sera supprimée !',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Valider', onPress: this.deleteImage},
      ],
      { cancelable: false }
    )
  };

  DeleteSuccess = () => {
    Alert.alert(
      'Succès',
      'Votre image a été supprimée avec succès d\'Imgur !',
      [
        {text: 'Compris', style: 'cancel'}
      ],
      { cancelable: false }
    )
  };

  deleteImage  = () => {
    img_mode = this.props.img_mode
    img_data = this.props.img_data

    if (img_data.images)
    {
        id = img_data.images[0].id
    }
    else
    {
        id = img_data.id
    }

    const url = "https://api.imgur.com/3/image/" + id;
    this.setState({ loading: true });
    fetch(url, {
         method: 'DELETE',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		  }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
      this.DeleteSuccess();
  };

  favoriteImage  = () => {
    img_mode = this.props.img_mode
    img_data = this.props.img_data

    if (img_data.images)
    {
        id = img_data.images[0].id
    }
    else
    {
        id = img_data.id
    }

    const url = "https://api.imgur.com/3/image/" + id + "/favorite"; //HQa09cc = ID de l'image
    this.setState({ loading: true });
    fetch(url, {
         method: 'POST',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
      })
      .then(res => res.json())
      .then(res => {
        if (img_data.favorite == true)
          img_data.favorite = false
        else
          img_data.favorite = true
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

  render() {
    img_mode = this.props.img_mode
    img_data = this.props.img_data

    if (img_data.favorite == true)
      logo_fav = "heart"
    else
      logo_fav = "heart-o"

    if (img_mode == "myimg")
    {
      return (
        <View style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
          <View style={{ flex: 1, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between', flexDirection: 'row'}}>
            <FontAwesomeIcon name={ logo_fav } color="black" size={24} onPress={this.favoriteImage} />
            <FeatherIcon name="trash-2" color="black" size={24} onPress={this.confirmRemoveImage} />
            <FeatherIcon name="download" color="black" size={24} />
          </View>
        </View>
      );
    }
    else
    {
      return (
        <View style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
          <View style={{ flex: 1, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between', flexDirection: 'row'}}>
            <FontAwesomeIcon name={ logo_fav } color="black" size={24} onPress={this.favoriteImage}/>
            <FeatherIcon name="download" color="black" size={24} />
          </View>
        </View>
      );
    }
  }
}

export default ButtonComp;