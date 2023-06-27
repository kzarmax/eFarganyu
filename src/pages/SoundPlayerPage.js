import React, { Component } from 'react';
import Player from '../components/AudioPlayer/Player';
import Axios from 'axios';
import { API_URL } from '../Config';
import errorHandler from '../errorHandler';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class SoundPlayerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: []
        }
    }
    
    componentDidMount() {
        Axios.get(`${API_URL}/hymns`, { headers: { Authorization: `Bearer ${this.props.token}` } }).then(response => {
          this.setState({...this.state, tracks: response.data.hymns })
        }).catch(error => errorHandler(error))
    }
    render() {
        const {tracks} = this.state;
        const {song, index, videoPath} = this.props;
        const mappedTracks = tracks.map((item) => {
            return  {
                title: item.name,
                artist: item.description,
                albumArtUrl: item.image_path,
                audioUrl: item.audio_path,
              }
        });

        console.log(mappedTracks);
        
        if (tracks.length > 0) {
            return <Player tracks={mappedTracks} index={index} videoPath={videoPath} />
        } else {
            return <View>
                <Text>Loading...</Text>
            </View>
        }
    }
}

const mapStateToProps = state => ({
    token: state.app.token,
});

export default connect(mapStateToProps, {})(SoundPlayerPage);