import styles from '../styles/styles';
import React from 'react';
import {StyleSheet, View } from 'react-native';
import SyncStorage from 'sync-storage';

class API extends React.Component {

	temp = null;
	

	static get_account_pic = async () => {
		json = await fetch('https://api.imgur.com/3/account/me/', {
         method: 'GET',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
      }).then(response => response.json());
	  SyncStorage.set('img_profile', json.data.avatar);
	  SyncStorage.set('img_cover', json.data.cover);
	}


	
	static functionTwo(url) {
		

		return ("null a chier");
	}




	/*gget = (url) => {
		this.gett(url);
		console.log(this.temp);
		return (this.temp)
	}
	
	gett = async (url) => {
		json = await fetch(url, {
         method: 'GET',
		 headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + SyncStorage.get('access_token'),
		}
	  }).then(response => response.json());
	  this.temp = JSON.stringify(json);
	  return (json);
	}*/

	//new API().gget("https://api.imgur.com/3/account/me/")


	
}

export default API;