import styles from '../styles/styles';
import React from 'react';
import {Alert, Text, View, Button } from 'react-native';
import SyncStorage from 'sync-storage';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

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

  componentDidMount() {
    this.searchImageRequest();
  }

  searchImageRequest = () => {
    const url = "https://api.imgur.com/3/gallery/search/time/day/1?q=sharl";// + this.state.ToSearch;
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
        //console.log(this.state.ToSearch)
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
    var TextSearch = this.state.ToSearch;
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
            onChangeText={(text) => { TextSearch = text }}
            loadingProps={console.log("lol")}
            platform="default"
            placeholder='Rechercher'
        />
      </View>
    );
  }
}

export default SearchScreen;