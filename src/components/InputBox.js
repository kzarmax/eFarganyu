import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Color } from '../Color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class InputBoxIcon extends Component {
    constructor() {
        super();
    }

    leftIcon() {
        let style = { marginTop : 13, marginRight : 10, color: Color.primary };
        if (this.props.iconPosition && this.props.iconPosition == 'left' ) {
            switch (this.props.iconType) {
                case 'FontAwesome5':
                    return <FontAwesome5 style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />;

                case 'AntDesign':
                    return <AntDesign style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />;

                case 'EvilIcons':
                    return <EvilIcons style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />;

                case 'MaterialCommunityIcons':
                    return <MaterialCommunityIcons style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />;

                case 'SimpleLineIcons':
                    return <SimpleLineIcons style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />;

                default:
                    return <FontAwesome5 style={style} name={this.props.iconName} size={this.props.iconSize ? this.props.iconSize : 22} />
            }
        }
    }

    render() {
        let containerStyle = {
            marginBottom: 15,
            width: '100%',
            display: 'flex',
            flexDirection : 'row',
            height: this.props.multiline ? 120 : 50,
            paddingLeft : 20,
            backgroundColor: "white",
            shadowColor: 'black',
            shadowOpacity: 0.4,
            elevation: 1,
            shadowRadius: 2 ,
            shadowOffset : { width: 1, height: 1},
        };
        if (this.props.rounded) {
            containerStyle = { ...containerStyle, borderRadius: 25 };
        }
        return (
            <View style={containerStyle}>
                { this.leftIcon() }
                <TextInput
                    onFocus={ () => this.setState({ inputBorderColor: Color.primary }) }
                    onBlur={ () => this.setState({ inputBorderColor: Color.primary }) }
                    onChangeText={ this.props.onChangeText }
                    underlineColorAndroid={ this.props.underlineColorAndroid }
                    placeholderTextColor={ Color.inputBorderColor }
                    placeholder={ this.props.placeholder }
                    spellCheck={this.props.spellCheck}
                    textContentType={this.props.textContentType}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry}
                    multiline={this.props.multiline}
                    numberOfLines={this.props.numberOfLines}
                    style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: Color.textBlack,
                        width : '100%',
                    }}
                />
            </View>
        );
    }
}

InputBoxIcon.defaultProps = {
    underlineColorAndroid : "transparent",
    placeholder: "Type here",
    spellCheck: false,
    textContentType: "none",
    keyboardType: "default",
    secureTextEntry: false,
    multiline: false,
    numberOfLines: 1,
}

export default InputBoxIcon;
