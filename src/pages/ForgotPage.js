import React, { Component } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { Image, Text, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Color } from '../Color';
import { changeInitialRoute, loginUser } from '../redux/app/app.actions';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import Toast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

class ForgotPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false 
    }
  }



  onForgot() {
    if (this.validate()) {
      const data = { email: this.state.email,  };
      Axios.post(`${API_URL}/forgot-password/send-code`, data).then(response => {
        const {message, code} = response.data;    
        console.log(response);    
        Toast.show(message);
        Actions.verify({code: code, email: this.state.email})
      

      }).catch(error => errorHandler(error))
    }
  }

  validate() {
		const { email } = this.state;
		if (email ===  '') {
			Toast.show('Please enter email address.');
			return false;
		} else return true;
	}

	onInputChange(field, value) {		
		this.setState({[field]: value});
	}

  render() {
    const {email } = this.state;
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null } style={styles.container}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Image style={{ height: 300, width: 200, marginBottom: 20, borderRadius: 10 }} source={require('../assets/logo.jpeg')} />
            <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, color: Color.grey900, fontWeight: 'bold' }}>
              { 'Enter your email to reset password.' }
            </Text>
            <InputBox onChangeText={(value) => this.onInputChange('email', value)} value={email} label="Email" textContentType="emailAddress" placeholder="Enter your email" />
            <Button onPress={() => this.onForgot() } title="Submit" />
            
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

export default connect(null, mapDispatchToProps)(ForgotPage);
