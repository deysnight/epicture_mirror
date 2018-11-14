import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';
import ImgComp from './img_comp';
import ButtonComp from './button_comp';
import FeatherIcon from 'react-native-vector-icons/Feather';

class ImgShower extends React.Component {
  render() {
    const data = this.props.navigation.getParam('img_data', null)
    const img_mode = this.props.navigation.getParam('img_mode', false)

    titre = data.title
    if (data.images)
    {
        desc = data.images[0].description
    }
    else
    {
        desc = data.description
    }
    if (desc == null)
        desc = ""

    return (

        <View style={ styles.container }>
            <ImgComp img_data={data}/>

            <View style={{padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
                <Text>{ "titre: " + titre }</Text>
                <Text>{ "description: " + desc }</Text>

                <View style={{padding: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <FeatherIcon name="download" color="black" size={24} />
                    <Text>{ data.ups }</Text>
                    <FeatherIcon name="download" color="black" size={24} />
                    <Text>{ data.downs }</Text>
                    <FeatherIcon name="download" color="black" size={24} />
                    <Text>{ data.score }</Text>
                    <FeatherIcon name="download" color="black" size={24} />
                    <Text>{ data.views }</Text>
                </View>

            </View>

            <ButtonComp img_mode={img_mode} img_data={data}/>
        </View>
    );

    

  }
}

export default ImgShower;