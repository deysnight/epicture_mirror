import styles from '../styles/styles';
import PopulairePic from './populaire_pic';
import React from 'react';
import { View } from 'react-native';

class HomeScreen extends React.Component {
   render() {		
		return (
			<View style={styles.container}>        
        <PopulairePic img_mode={this.props.img_mode} navigation={this.props.navigation}/>
      </View>
		)
  }
}

export default HomeScreen;