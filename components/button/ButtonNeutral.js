import React, { Component } from 'react';
import styles from '../../res/styles';
import { Button } from 'react-native-elements'; 

export class ButtonNeutral extends Component {
    render() {
        return (
            <Button
                {...this.props}
                buttonStyle={[styles.buttonNeutral, this.props.style]}
                title={this.props.title}
            />
        );
    }
}