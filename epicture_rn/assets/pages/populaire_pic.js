import React, { Component } from "react";
import { RefreshControl, Text, TouchableHighlight, View, StyleSheet, ImageBackground } from "react-native";
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';

class PopulairePic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  check_link(item) {
    try {
        if (item.images[0])
        {
            if (item.images[0].type == "video/mp4") {
                link = "http://conceptcradle.com/project1/mvc/img/gif-icon.png"
            }
            else {
                link = item.images[0].link
            }
        }
        else
        {
            if (item.type == "video/mp4") {
                link = "http://conceptcradle.com/project1/mvc/img/gif-icon.png"
            }
            else {
                link = item.link
            }
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
        this.setState({refreshing: false});
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.makeRemoteRequest()
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View>
          <Text style={{textAlign: 'center', marginBottom: 12, marginTop: 12, fontWeight: 'bold', fontSize: 20}}>Images populaires</Text>
        </View>
      <GridView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
        itemDimension={130}
        items={this.state.data}
        style={styles.gridView}
        renderItem={item => (
        <TouchableHighlight onPress={() => navigate('testScreen', {img_data: item, img_mode: this.props.img_mode})}>
          <ImageBackground
            source={{uri: this.check_link(item)}}
            style={[styles.itemContainer, { backgroundColor: '#bababa' }]}
          >
            <Text style={styles.itemCode}>{item.views + " vues"}</Text>
          </ImageBackground>
        </TouchableHighlight>
          
        )}
      />
      </View>
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