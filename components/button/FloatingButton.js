import React, { Component } from 'react'
import { Button, Icon } from 'react-native-elements'
import styles from '../../res/styles';
import colors from '../../res/colors';

export class FloatingButton extends Component {
    render() {
        return (
            <Button 
            buttonStyle={[styles.floatingButton, this.props.style]}
            title=""
            onPress={this.props.onPress}
            icon={
                <Icon
                type="font-awesome"
                name="plus"
                color={colors.white}
                />
            }
            />
        );
    }
}