import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage, Image, Text } from 'react-native';
import { Color } from '../Color';

import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { logoutUser, changeInitialRoute, updateProfile } from '../redux/app/app.actions';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import { Actions } from 'react-native-router-flux';

class ResetPasswordPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
			new_password: '',
			confirm_password: '',
			loading: false,
		}
    }
    
    componentDidMount() {
      console.log(this.props.token);
    }

    onSumit() {
		if (this.validate()) {
			const data = {
				new_password: this.state.new_password,
				new_password_confirmation: this.state.confirm_password,
			};

			Axios.post(`${API_URL}/forgot-password/reset-password`, data, { headers: { 'Authorization' : `Bearer ${this.props.token}` } }).then(response => {
				const {message} = response.data;
				Toast.show(message);
				Actions.reset("login");
			}).catch(error => errorHandler(error))
		}
	}

    validate() {
		const { new_password, confirm_password } = this.state;
		if (new_password === '') {
			Toast.show('Please enter new password.');
			return false;
		} else if (confirm_password ===  '') {
			Toast.show('Please re-type the new password.');
			return false;
		}  else if (confirm_password != new_password) {
			Toast.show('Password do not match.');
			return false;
		} else if(new_password.length < 6){
            Toast.show('Please enter password of minimum 6 char.');
			return false;
            
        } else return true;
	}

	onInputChange(field, value) {		
		this.setState({[field]: value});
	}

    render() {
		const { new_password, confirm_password} = this.state;

        return (
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
                <Image style={{ height: 300, width: 200, marginBottom: 20, borderRadius: 10 }} source={require('../assets/logo.jpeg')} />
            <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, color: Color.grey900, fontWeight: 'bold' }}>
              { 'Reset Password.' }
            </Text>
					<InputBox
						secureTextEntry 
						onChangeText={(value) => this.onInputChange('new_password', value)} 
						value={new_password} 
						label="New Password" 
						placeholder="Enter new password" 
					/>
					<InputBox
						secureTextEntry 
						onChangeText={(value) => this.onInputChange('confirm_password', value)} 
						value={confirm_password} 
						label="Confirm New Password" 
						placeholder="Re-type password" 
					/>
                    
                    <Button onPress={() => this.onSumit() } title="Update Password" />
    
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        padding: 24,
        display: 'flex',
        alignItems: 'center'
    }
})
  
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser()),
    updateProfile: (user) => dispatch(updateProfile(user))
})

const mapStateToProps = state => ({
    user: state.app.user,
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);

