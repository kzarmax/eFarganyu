import React, { Component } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { Image, Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Color } from '../Color';
import { changeInitialRoute, registerUser } from '../redux/app/app.actions';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import { Actions } from 'react-native-router-flux';


class WebScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}


	render() {
		const { first_name, last_name, email, password } = this.state;
		return (
			<WebView
			source={require('../resource/TC.pdf')}
			/>
		);
	}
};

const mapDispatchToProps = dispatch => ({
	register: (token, user) => dispatch(registerUser(token, user)),
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginBottom: 20
  },
  inner: {
		padding: 24,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
  },
  logo: { height: 300, width: 200, marginBottom: 20, borderRadius: 10 },
  title: { marginTop: 10, marginBottom: 30, fontSize: 18, color: Color.grey900, fontWeight: 'bold' }
});

export default connect(null, mapDispatchToProps)(WebScreen);
