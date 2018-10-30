import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      /*<View style={styles.container}>
		<Text>PETIT PD N'OUBLI PAS</Text>
		<Text>PETIT PD N'OUBLI PAS</Text>
      </View>*/
	  
	  <ImageBackground
            source={require("./assets/background.jpg")}
            style={styles.container} >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} >
				
				<Text>PETIT PD N'OUBLI PAS</Text>
				<Text>PETIT PD N'OUBLI PAS</Text>

            </View>
        </ImageBackground>
	  
	  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#909090',
    alignItems: 'center',
    justifyContent: 'center',
  },
});