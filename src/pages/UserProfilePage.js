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

class UserProfilePage extends Component {

    constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			loading: false,
		}
    }
    
    componentDidMount() {
        const { first_name, last_name, email } = this.props.user;
        this.setState({ ...this.state, first_name, last_name, email });
    }

    onProfileUpdate() {
		if (this.validate()) {
			const data = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
			};

			Axios.post(`${API_URL}/profile`, data, { headers: { 'Authorization' : `Bearer ${this.props.token}` } }).then(response => {
                console.log(response.data);
				const { user , message} = response.data;
				Toast.show(message);
				this.props.updateProfile(user)
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

    render() {
		const {first_name, last_name, email} = this.state;

        return (
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
                    <InputBox onChangeText={(value) => this.onInputChange('first_name', value)} value={first_name} label="First name" placeholder="Enter your first name" />
                    <InputBox onChangeText={(value) => this.onInputChange('last_name', value)} value={last_name} label="Last name" placeholder="Enter your last name" />
                    <InputBox onChangeText={(value) => this.onInputChange('email', value)} value={email} label="Email" textContentType="emailAddress" placeholder="Enter your email" />
                    
                    <Button onPress={() => this.onProfileUpdate() } title="Update Profile" />
                    <Button onPress={() => Actions.changePassword() } title="Change Password" />
                    <Button onPress={() => {
                        AsyncStorage.multiRemove(['token', 'user']).then(() => {
                            this.props.logout()
                           Actions.reset('login')
                        })
                    } } title="Logout" />
    
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);

