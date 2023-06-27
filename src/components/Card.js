import React, { Component } from 'react';
import { View} from 'react-native';
import { Color } from '../Color';

class Card extends Component {
	render() {
		return <View style={ styles.container }>
			{ this.props.children }
		</View>
	}
}

export default Card;

const styles = {
	container : {
		margin: 5,
		padding: 15,
		borderWidth: 1,
		borderColor: Color.inputBorder,
		backgroundColor: 'white',

	}
}
