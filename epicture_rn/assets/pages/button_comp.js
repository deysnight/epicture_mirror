import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import { List, ListItem } from "react-native-elements";
import SyncStorage from 'sync-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

class ButtonComp extends React.Component {
  
  render() {

    img_mode = this.props.img_mode
    img_data = this.props.img_data
    console.log(img_mode)

    if (img_data.favorite == true)
      logo_fav = "heart"
    else
      logo_fav = "heart-o"

    if (img_mode == "myimg")
    {
      return (
        <View style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
          <View style={{ flex: 1, paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between', flexDirection: 'row'}}>
            <FontAwesomeIcon name={ logo_fav } color="black" size={24} />
            <FeatherIcon name="download" color="black" size={24} />
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
            <FontAwesomeIcon name={ logo_fav } color="black" size={24} />
            <FeatherIcon name="download" color="black" size={24} />
          </View>
        </View>
      );
    }
  }
}

export default ButtonComp;