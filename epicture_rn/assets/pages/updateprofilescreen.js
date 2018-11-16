import React from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import styles from '../styles/styles';
import SyncStorage from 'sync-storage';

import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

class updateProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          Username: '',
          Bio: '',
          error: null,
          refreshing: false,
        };
      }

    ConfirmChange = () => {
        Alert.alert(
          'Êtes-vous sûr ?',
          'Vos informations seront mises à jours',
          [
            {text: 'Annuler', style: 'cancel'},
            {text: 'Valider', onPress: this.RequestChangeData},
          ],
          { cancelable: false }
        )
      };
    RequestChangeData = () => {
        const url = "https://api.imgur.com/3/account/" + SyncStorage.get('account_username') + "/settings?bio=" + this.state.Bio + "&username=" + this.state.Username;
        this.setState({ loading: true });
        fetch(url, {
             method: 'PUT',
             headers: {
                'Accept': 'application/json',
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
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
        this.props.navigation.navigate('Images Populaires');
      };

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
                Username: res.data.url,
                Bio: res.data.bio,
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
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.profileDescContainer}>
                <View>
                    <Text style={styles.profileDescUpdateheaderData}>Nom de compte</Text>
                    <TextInput style={styles.ProfileDescUpdateInput} name="username" defaultValue={this.state.Username} onChangeText={text => this.setState({Username: text})} underlineColorAndroid="#FFF" placeholder='Username' />
                    <View style={styles.profileDescSeparator}>
                    </View>
                    <Text style={styles.profileDescUpdateheaderData}>Biographie</Text>
                    <TextInput style={styles.ProfileDescUpdateInput} name="bio" defaultValue={this.state.Bio} onChangeText={text => this.setState({Bio: text})} underlineColorAndroid="#FFF" placeholder='Biographie' />
                    <View style={styles.profileDescSeparator}>
                    </View>
                </View>
                <View style={styles.profileDescButton}>
                    <AwesomeButtonBlue height={36} width={90} backgroundColor="#90AFC5" backgroundDarker="#336B87" raiseLevel={2}
                     borderRadius={7}
                     onPress={this.ConfirmChange}>
                        <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>Valider</Text>
                  </AwesomeButtonBlue>
                </View>
            </View>
        </View>
        );
    }
}

export default updateProfileScreen;