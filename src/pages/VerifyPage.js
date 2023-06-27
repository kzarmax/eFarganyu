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

class VerifyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false 
    }
  }



  onVerify() {
    if (this.validate()) {
      const data = { email: this.props.email, code:  this.props.code };
      Axios.post(`${API_URL}/forgot-password/verify-code`, data).then(response => {
        const {message, user, token} = response.data;    
        console.log(response);    
        Toast.show(message);
        // this.props.login(token, user);
        
        Actions.resetpassword({token: token})
      }).catch(error => errorHandler(error))
    }
  }

  validate() {
		const { code} = this.state;
		if (code ===  '') {
			Toast.show('Please enter your verification code.');
			return false;
		} else if(code != this.props.code){
            Toast.show('Verification code is invalid');
			return false;
        } 
        return true;
	}

	onInputChange(field, value) {		
		this.setState({[field]: value});
	}

  render() {
    const {code} = this.state;
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null } style={styles.container}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Image style={{ height: 300, width: 200, marginBottom: 20, borderRadius: 10 }} source={require('../assets/logo.jpeg')} />
            <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, color: Color.grey900, fontWeight: 'bold' }}>
              { 'Enter your verification code.' }
            </Text>
            <InputBox keyboardType="number-pad" onChangeText={(value) => this.onInputChange('code', value)} value={code} label="Verification code" textContentType="oneTimeCode" placeholder="Enter your verification code" />
            <Button onPress={() => this.onVerify() } title="Verify" />
            
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

export default connect(null, mapDispatchToProps)(VerifyPage);
