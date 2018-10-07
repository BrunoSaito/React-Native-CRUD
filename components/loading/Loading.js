import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
// import { Overlay } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';

export class Loading extends Component {
    render() {
        if (!this.props.loading) return null;

        return (
            // <View
            // style={{
            //     paddingVertical: 20,
            //     borderTopWidth: 1,
            //     borderColor: "#CED0CE"
            // }}>
            //     <ActivityIndicator animating size="large" />
            // </View>

            // <Overlay 
            // isVisible={true}
            // overlayBackgroundColor='transparent'>
            //     <ActivityIndicator animating size="large" />
            // </Overlay>

            <View style={{ flex: 2 }}>
                <Spinner visible={this.props.loading} textContent={this.props.text} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}