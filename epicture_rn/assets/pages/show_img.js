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
            {titre !== "untitled" ? (
                <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center', fontSize: 22 }}>{ titre }</Text>
            ):
                null
            }
            <ImgComp img_data={data}/>
            <View style={{padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 1}}>
                {desc ? (
                    <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>{ desc }</Text>
                ): null
                }
            </View>
            <View style={{paddingTop: 10, paddingBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white'}}>
                <FeatherIcon name="chevron-up" color="black" size={24} />
                <Text style={{ textAlign: 'center' }}>{data.ups}</Text>
                <FeatherIcon name="chevron-down" color="black" size={24} />
                <Text>{ data.downs }</Text>
                <FeatherIcon name="eye" color="black" size={24} />
                <Text>{ data.views }</Text>
            </View>
            <ButtonComp img_mode={img_mode} img_data={data}/>
        </View>
    );

    

  }
}

export default ImgShower;