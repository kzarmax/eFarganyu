import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Color } from '../Color';

class Button extends Component {
    constructor(props) {
        super();
    }

    render() {
        let buttonStyle = {
            justifyContent : 'space-around',
            alignItems : 'center',
            borderRadius: this.props.borderRadius,
            padding : 10,
            width: this.props.width,
            height: this.props.height,
            display: 'flex',
            flexDirection: 'row',
            shadowColor: 'black',
            shadowOpacity: 0.4,
            elevation: 1,
            shadowRadius: 2 ,
            shadowOffset : { width: 1, height: 1},
            marginBottom : 10,
            marginRight : 10,
        }

        let textStyle = {
            fontSize : this.props.titleFontSize,
        }

        if (this.props.outline) {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor : 'transparent',
                borderWidth : 2,
                inputBorderColor: this.props.color,
                elevation: 0,
            }
            textStyle = { ...textStyle, color : this.props.color }
        } else {
            buttonStyle = { ...buttonStyle, backgroundColor : this.props.color }
            textStyle = { ...textStyle, color : this.props.titleColor }
        }

        return (
            <TouchableOpacity
            disabled={this.props.disabled}
            onPress={ this.props.onPress }
            style={buttonStyle}>
                <View>
                    { this.props.leftIcon }
                </View>
                <Text style={textStyle}>{ this.props.title }</Text>
                <View>
                    { this.props.rightIcon }
                </View>
            </TouchableOpacity>
        );
    }
}

Button.defaultProps = {
    color : Color.primary,
    width : '100%',
    height: 50,
    borderRadius: 35,
    titleColor : 'white',
    titleFontSize: 18,
    disabled: false,
}

export default Button;
