import React, { Component } from 'react';
import styles from '../../res/styles';
import { Button } from 'react-native-elements'; 

export class ButtonAlert extends Component {
    render() {
        return (
            <Button
                {...this.props}
                buttonStyle={[styles.buttonAlert, this.props.style]}
                title={this.props.title}
            />
        );
    }
}