import styles from '../styles/styles';
import React from 'react';
import {TouchableHighlight, Text, View, ImageBackground } from 'react-native';
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements'

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      ToSearch: '',
      error: null,
      refreshing: false,
    };
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

  componentDidMount() {
    this.searchImageRequest();
  }

  searchImageRequest = () => {
    const url = "https://api.imgur.com/3/gallery/search/time/all/1?q=" + this.state.ToSearch;
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <SearchBar
            ref='searchBar'
            round
            clearIcon={{ color: 'black' }}
            containerStyle={{backgroundColor: "white"}}
            inputContainerStyle={{backgroundColor:"#f5f5f5"}}
            inputStyle={{backgroundColor:"#f5f5f5", fontSize: 13, borderWidth: 1, borderColor: "transparent", color: "black"}}
            searchIcon={{ size: 18 }}
            leftIconContainerStyle={{backgroundColor:"#f5f5f5"}}
            rightIconContainerStyle={{backgroundColor:"#f5f5f5"}}
            onChangeText={(text) => { this.state.ToSearch = text, this.searchImageRequest()} }
            platform="default"
            placeholder='Rechercher'
        />
        <View>
          <Text style={{textAlign: 'center', marginTop: 12, fontWeight: 'bold', fontSize: 20}}>{this.state.ToSearch}</Text>
        </View>
        <GridView
        itemDimension={130}
        items={this.state.data}
        style={styles.gridView}
        renderItem={item => (
        <TouchableHighlight onPress={() => navigate('testScreen', {img_data: item, img_mode: "fromSearch"})}>
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

export default SearchScreen;