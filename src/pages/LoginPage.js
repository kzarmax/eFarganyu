import React, { Component } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { Image, Text, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, AsyncStorage, View, TouchableOpacity } from 'react-native';
import { Color } from '../Color';
import { changeInitialRoute, loginUser } from '../redux/app/app.actions';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import Toast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  saveToStorage(token, user) {
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
      Actions.reset("home")
    });
  }

  onLogin() {
    if (this.validate()) {
      const data = { email: this.state.email, password: this.state.password };
//   Axios({
//   method: 'post',
//   responseType: 'json',
//   url: `${API_URL}/login`,
//   data: data
// })
//  .then(response => {
//     console.log("s","1")
//   console.log("response", response)
//  })
//  .catch(error => {
//      console.log("s","2")
//      // console.log("error1", error.data.error.message)
//      console.log("error2",error)
//  });
      Axios.post(`${API_URL}/login`, data).then(response => {
        const {message, user, token} = response.data;
        Toast.show(message);
        this.props.login(token, user);
        this.saveToStorage(token, user);

      }).catch(error => errorHandler(error))
    }
  }

  validate() {
		const { email, password} = this.state;
		if (email ===  '') {
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
    const {email, password} = this.state;
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null } style={styles.container}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Image style={{ height: 300, width: 200, marginBottom: 20, borderRadius: 10 }} source={require('../assets/logo.jpeg')} />
            <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, color: Color.grey900, fontWeight: 'bold' }}>
              { 'Enter your email and password to login.' }
            </Text>
            <InputBox onChangeText={(value) => this.onInputChange('email', value)} value={email} label="Email" textContentType="emailAddress" placeholder="Enter your email" />
            <InputBox onChangeText={(value) => this.onInputChange('password', value)} value={password} label="Password" secureTextEntry placeholder="Enter your password" />
            <View style={{ flexDirection: 'row', paddingBottom: 10}}>
						<Text style={{fontSize:12}}>By clicking on login, I accept all the</Text>
					<TouchableOpacity onPress={() => this.onPressTC()}><Text style={{textDecorationLine: 'underline', fontSize: 12}}>Terms and conditions</Text></TouchableOpacity>
					</View>
            <Button onPress={() => this.onLogin() } title="Login" />
            <Button onPress={() =>  Actions.register() } title="New User? Create an Account" />
            <Button onPress={() => Actions.forgot() } title="Forgot Password?" />

          </ScrollView>
        </KeyboardAvoidingView>
    );
  }

};

const mapDispatchToProps = dispatch => ({
  login: (token, user) => dispatch(loginUser(token, user)),
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginBottom: 0
  },
  inner: {
      padding: 24,
      display: 'flex',
      alignItems: 'center'
  },
});

export default connect(null, mapDispatchToProps)(LoginPage);
