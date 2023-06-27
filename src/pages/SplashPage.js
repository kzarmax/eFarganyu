import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { changeInitialRoute, loginUser } from '../redux/app/app.actions';
import { connect } from 'react-redux';
var {width, height} = Dimensions.get('screen')
import { Actions } from 'react-native-router-flux';

class SplashPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      isReady: true
    }
  }

  saveToStorage(token, user) {
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
      Actions.reset("home")
    });
  }

  componentDidMount(){
    let {token, user} = this.props;
    console.log(token, user);
      if(this.state.isReady){
        setTimeout(() => {
           
                if (token && user ) {
                    this.props.login(token, user);
                    this.saveToStorage(token, user);
                 
                } else {
                    Actions.reset("login")
                }
                
                // console.log(key, value);
                  
              
              this.setState({isReady: false})
          }, 2000);
      } 

  }



  render() {
    const {email, password} = this.state;
    return (
        <View style={styles.container}>
         <StatusBar hidden={true} />
            <Image style={{ height: height, width: width, }} 
                resizeMode="stretch" source={require('../assets/logo.jpeg')} />
        </View>
    );
  }

};
const mapStateToProps =  state  => ({
    initialRoute: state.app.initialRoute,
    user: state.app.user,
    token: state.app.token,
  });

const mapDispatchToProps = dispatch => ({
    login: (token, user) => dispatch(loginUser(token, user)),
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  inner: {
     
      display: 'flex',
      alignItems: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
