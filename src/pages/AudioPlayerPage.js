import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, BackHandler } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import { Color } from '../Color';
import { Slider } from 'react-native-elements';

const styles = StyleSheet.create({
    pageContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems:'center'
    },
    thumbnailContainer: {
        height: 300,
        width: '100%', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation:2,
        marginBottom: 10,
    },
    thumbnail: {
        height: 300,
        width: '100%',
    },
    detailContainer: {
        width: '100%',
        alignItems: "center"
    },
    trackTitle: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 10
    },
    progressBar: {
        marginTop: 10,
        marginBottom: 10,
    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10, 
        paddingLeft: 10,
        marginTop: 10,
        justifyContent:'space-between'
    },
    timeText: {
        fontSize: 14,
        color: Color.textBlack
    },
    actionsContainer: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    playIcon: {
        height: 75,
        width: 75
    },
    nextIcon: {
        height:75,
        width: 75
    }
});

class AudioPlayerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }   
    }

    componentDidMount() {
        const {song} = this.props;
        TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.updateOptions({
                // An array of media controls capabilities
                // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
                // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP
                ],
                
                // An array of capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE
                ]
            })
            // The player is ready to be used
            var track = {
                id: song.id, // Must be a string, required
                url: song.audio_path, // Load media from the network
                title: song.name,
                artist: 'Unknown',
                album: 'Unknown',
                genre: 'Unknown',
                date: song.created_at, // RFC 3339
                artwork: song.image_path, // Load artwork from the network
            };

            TrackPlayer.add(track);

            TrackPlayer.addEventListener('playback-queue-ended', (data) => {
                console.log('playback-queue-ended', data);
                TrackPlayer.stop().then(() => {
                    this.setState({...this.state, isPlaying: false });
                });
            })

        });
    }

    async componentWillUnmount() {
        const trackId = await TrackPlayer.getCurrentTrack()
        TrackPlayer.remove(trackId).then(() => {
            console.log('removed');
        }).catch(error => {
            console.log(error);
        });
        TrackPlayer.destroy();
    }

    showPlayOrPause() {
        const { isPlaying } = this.state;
        if (isPlaying) {
            return (<TouchableOpacity onPress={() => {
                TrackPlayer.pause();
                this.setState({ isPlaying: false })
            } }>
                <Image style={styles.playIcon} source={require('../assets/pause.png')}/>
            </TouchableOpacity>)
        } else {
            return (<TouchableOpacity onPress={() => {
                TrackPlayer.play()
                this.setState({ isPlaying:  true });
            } }>
                <Image style={styles.playIcon} source={require('../assets/play-button-circled.png')}/>
            </TouchableOpacity>)
        }
    }

    render() {        
        const { song, index } = this.props;
        
        return (
            <View style={styles.pageContainer}>
                <View style={styles.thumbnailContainer}>
                    <Image style={styles.thumbnail} source={{ uri: song.image_path }} />
                </View>
                <View style={styles.detailContainer}>
                    <TextTicker 
                        duration={5000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}  
                        style={styles.trackTitle}
                    >
                        { song.name } - { song.description }
                    </TextTicker>
                    
                    <MyPlayerBar />

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity>
                            <Image style={styles.nextIcon} source={require('../assets/start.png')}/>
                        </TouchableOpacity>

                        { this.showPlayOrPause() }

                        <TouchableOpacity>
                            <Image style={styles.nextIcon} source={require('../assets/end.png')}/>
                        </TouchableOpacity>    
                    </View>
                </View>
            </View>
        );
    }
}

export default AudioPlayerPage;

class MyPlayerBar extends TrackPlayer.ProgressComponent {

    toHMS (sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        if (hours > 0) {
            return hours + ':' + minutes + ':' + seconds;
        } else {
            return minutes + ':' + seconds;
        }
    }

    render() {  
        console.log(this.state);
        
        return (
            <View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{this.toHMS(this.state.position)}</Text>
                    <Text style={styles.timeText}>{this.toHMS(this.state.duration)}</Text>
                </View>
                <View style={{ width: 350 }}>
                    <Slider 
                        value={this.state.position}
                        maximumValue={this.state.duration}
                        thumbTintColor={Color.primary}
                    />
                </View>
            </View>
        );
    }
    
}