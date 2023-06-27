import React, { Component } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { Image, Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Color } from '../Color';
import { changeInitialRoute, registerUser } from '../redux/app/app.actions';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import { Actions } from 'react-native-router-flux';


class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			loading: false,
		}
	}

	onResiger() {
		if (this.validate()) {
			const data = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				password: this.state.password,
			};

			Axios.post(`${API_URL}/register`, data).then(response => {
				const { token, user , message} = response.data;
				Toast.show(message);
				this.props.register(token, user)
				Actions.reset("login")
			}).catch(error => errorHandler(error))
		}
	}

	validate() {
		const {first_name, last_name, email, password} = this.state;
		if (first_name === '') {
			Toast.show('Please enter your first name.');
			return false;
		} else if (last_name === '') {
			Toast.show('Please enter your last name.');
			return false;
		} else if (email ===  '') {
			Toast.show('Please enter email address.');
			return false;
		} else if (password === '') {
			Toast.show('Please enter password of minimum 6 char.');
			return false;
		} else return true;
	}

	onInputChange(field, value) {		
		this.setState({[field]: value});
	}

	onPressTC() {
		Actions.webscreen() 
	}

	render() {
		const {first_name, last_name, email, password}  = this.state;
		return (
			  <ScrollView contentContainerStyle={styles.inner}>
					<Image style={styles.logo} source={require('../assets/logo.jpeg')} />
					<Text style={styles.title}>
						{ 'Create a new account.' }
					</Text>
					<InputBox onChangeText={(value) => this.onInputChange('first_name', value)} value={first_name} label="First name" placeholder="Enter your first name" />
					<InputBox onChangeText={(value) => this.onInputChange('last_name', value)} value={last_name} label="Last name" placeholder="Enter your last name" />
					<InputBox onChangeText={(value) => this.onInputChange('email', value)} value={email} label="Email" textContentType="emailAddress" placeholder="Enter your email" />
					<InputBox onChangeText={(value) => this.onInputChange('password', value)} value={password} label="Password" secureTextEntry placeholder="Enter your password" />
					<View style={{ flexDirection: 'row', paddingBottom: 10}}>
						<Text style={{fontSize:12}}>By clicking on register, I accept all the</Text>
					<TouchableOpacity onPress={() => this.onPressTC()}><Text style={{textDecorationLine: 'underline', fontSize: 12}}>Terms and conditions</Text></TouchableOpacity>
					</View>
					<Button onPress={() => this.onResiger() } title="Register" />
					<Button onPress={() => Actions.pop() } title="Already have an account? Login" />
	  
			  </ScrollView>
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

export default connect(null, mapDispatchToProps)(RegisterPage);
