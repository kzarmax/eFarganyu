import React, { Component } from 'react';
import SongListItem from '../components/SongListItem';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import {API_URL} from '../Config';
import errorHandler from '../errorHandler';
import { connect } from 'react-redux';


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      videoPath: ''
    }
  }

  componentDidMount() {

    Axios.get(`${API_URL}/hymns`, { headers: { Authorization: `Bearer ${this.props.token}` } }).then(response => {
      console.log(response.data);      
      this.setState({...this.state, songs: response.data.hymns, videoPath: response.data.videoThumbnailPath })
    }).catch(error => errorHandler(error))
  }

  renderSongs = () => {
    return this.state.songs.map((song, index) => {
      console.log(song.audio_path);
      
      return <SongListItem song={song} index={index} videoPath={this.state.videoPath} />
    })
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          { this.renderSongs() }
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    padding: 10
  }
})

const mapStateToProps = state => ({
  token: state.app.token,
});

export default connect(mapStateToProps, null)(HomePage);