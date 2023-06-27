import React, { Component } from 'react';
import {Stack, Router, Scene, Actions} from 'react-native-router-flux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { connect } from 'react-redux';
import { Color } from './Color';
import AudioPlayerPage from './pages/AudioPlayerPage';
import RegisterPage from './pages/RegisterPage';
import WebScreen from './pages/WebScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { changeInitialRoute, loginUser } from './redux/app/app.actions';
import UserProfilePage from './pages/UserProfilePage';
import SoundPlayerPage from './pages/SoundPlayerPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import SplashPage from './pages/SplashPage';
import ForgotPage from './pages/ForgotPage';
import VerifyPage from './pages/VerifyPage';
import ResetPassword from './pages/ResetPassword';

class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }
  }

  componentDidMount() {
    if(!this.state.isReady){
    AsyncStorage.multiGet(['token', 'user'], (error, data) => {
      console.log(data[0], data[1]);
      const token = data[0][1];
      const user = JSON.parse(data[1][1]);

      if (token && user) {
        this.props.loginUser(token, user);
        
      }
      
      // console.log(key, value);
      this.setState({...this.state, isReady: true});   
    })
  }
  }

  render() {
    let {initialRoute} = this.props;
    
    if (this.state.isReady) {
      return (
        <Router sceneStyle={{ backgroundColor: Color.paggBackgroud }}>
          <Stack key="root">
          <Scene key="splash" hideNavBar={true}  component={SplashPage} initial={'splash'} />
            <Scene key="register" title="Register" component={RegisterPage}  />
            <Scene key="login" title="Login" component={LoginPage} />
            <Scene key="forgot" title="Forgot Password" component={ForgotPage}  />
            <Scene key="verify" title="Verification" component={VerifyPage}  />
            <Scene key="resetpassword" title="Reset Password" component={ResetPassword}  />
            <Scene key="webscreen" title="Terms and Conditions" component={WebScreen}  />
            <Scene key="home" title="Home" 
              component={HomePage} 
              renderRightButton={<TouchableOpacity onPress={() => Actions.userProfile() } style={{ paddingRight: 20}}>
                  <Icon name="user" size={16} />
                </TouchableOpacity>} 
            />
            <Scene key="audioPlayer" title="Player" component={SoundPlayerPage} />
            <Scene key="userProfile" title="Profile" component={UserProfilePage} />
            <Scene key="changePassword" title="Change Password" component={ChangePasswordPage} />
          </Stack>
        </Router>
      );
    } else {
      return null;
    }
  }
};

const mapStateToProps = ({ app }) => ({
  initialRoute: app.initialRoute,
  user: app.user,
});

const mapDispatchToProps = dispatch => ({
  changeRoute: (route) => dispatch(changeInitialRoute(route)),
  loginUser: (token, user) => dispatch(loginUser(token, user))
})


export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
