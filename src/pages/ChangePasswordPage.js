import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
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

class ChangePasswordPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
			current_password: '',
			new_password: '',
			confirm_password: '',
			loading: false,
		}
    }
    
    componentDidMount() {
        const { current_password, new_password, confirm_password } = this.props.user;
        this.setState({ ...this.state, current_password, new_password, confirm_password });
    }

    onSumit() {
		if (this.validate()) {
			const data = {
				current_password: this.state.current_password,
				new_password: this.state.new_password,
				confirm_password: this.state.confirm_password,
			};

			Axios.post(`${API_URL}/change-password`, data, { headers: { 'Authorization' : `Bearer ${this.props.token}` } }).then(response => {
				const {message} = response.data;
				Toast.show(message);
				Actions.pop();
			}).catch(error => errorHandler(error))
		}
	}

    validate() {
		const {current_password, new_password, confirm_password } = this.state;
		if (current_password === '') {
			Toast.show('Please enter your current password.');
			return false;
		} else if (new_password === '') {
			Toast.show('Please enter new password.');
			return false;
		} else if (confirm_password ===  '') {
			Toast.show('Please re-type the new password.');
			return false;
		} else return true;
	}

	onInputChange(field, value) {		
		this.setState({[field]: value});
	}

    render() {
		const {current_password, new_password, confirm_password} = this.state;

        return (
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
					<InputBox
						secureTextEntry 
						onChangeText={(value) => this.onInputChange('current_password', value)} 
						value={current_password} 
						label="Current Password" 
						placeholder="Enter your current password" 
					/>
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
      padding: 10
    }
})
  
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser()),
    updateProfile: (user) => dispatch(updateProfile(user))
})

const mapStateToProps = state => ({
    user: state.app.user,
    token: state.app.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);

