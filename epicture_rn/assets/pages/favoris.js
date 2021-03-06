import styles from '../styles/styles';
import React from 'react';
import { ImageBackground, RefreshControl, Text, View, TouchableHighlight } from 'react-native';
import SyncStorage from 'sync-storage';
import GridView from 'react-native-super-grid';

class FavoriteScreen extends React.Component {   
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
    this.getFavorite();
  }


  check_link(item) {
    try {
        if (item.images)
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

  getFavorite = () => {
    const { page, seed } = this.state;
    const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/favorites/";
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
        console.log(res);
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
    this.getFavorite()
  }

   render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View>
          <Text style={{textAlign: 'center', marginBottom: 12, marginTop: 12, fontWeight: 'bold', fontSize: 20}}>Mes favoris</Text>
        </View>

        {(this.state.data.length > 0) ? (
         <GridView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
         itemDimension={130}
         items={this.state.data}
         style={styles.gridView}
         renderItem={item => (
         <TouchableHighlight onPress={() => navigate('testScreen', {img_data: item, img_mode: "myFav"})}>
           <ImageBackground
             source={{uri: this.check_link(item)}}
             style={[styles.itemContainer, { backgroundColor: '#bababa' }]}
           >
             <Text style={styles.itemCode}>{item.views + " vues"}</Text>
           </ImageBackground>
         </TouchableHighlight>
         )}
       />
          ):
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>:(</Text>
          <Text style={{textAlign: 'center', fontSize: 30}}>Vous n'avez aucun favoris !</Text>
        </View>
         }
      </View>
      );
  }
}

export default FavoriteScreen;