import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import { List, ListItem } from "react-native-elements";
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';

class PopulairePic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  check_link(item) {
    try {
        if (item.images[0].type == "video/mp4") {
            link = "http://conceptcradle.com/project1/mvc/img/gif-icon.png"
        }
        else {
            link = item.images[0].link
        }
        return link
      }
      catch(error) {
        return (null);
      }
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = "https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=true&album_previews=false";
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
        this.setState({
          data: res.data,
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
    return (
      <GridView
        itemDimension={130}
        items={this.state.data /*items*/}
        style={styles.gridView}
        renderItem={item => (
          <ImageBackground
            source={{uri: this.check_link(item)}}
            style={[styles.itemContainer, { backgroundColor: '#bababa'/*item.code*/ }]}
          >
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemCode}>{item.views + "views"}</Text>
          </ImageBackground>

          
        )}
      />
    );
  }
}


const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

export default PopulairePic;