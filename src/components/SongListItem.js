import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Color } from '../Color';
import { Actions } from 'react-native-router-flux';

class SongListItem extends Component {

    render() {
        const {song, index, videoPath} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => Actions.audioPlayer({ song, index, videoPath }) }>
                <Image style={styles.thumbnail} source={{ uri: song.image_path }} />
                <View style={styles.detailContainer}>
                    <Text style={styles.title}>{ song.name }</Text>
                    <Text style={styles.singerName}>{ song.description }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    singerName: {
        color: Color.primary
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5
    },
    thumbnail: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    detailContainer: {
        marginLeft: 20
    }
});

export default SongListItem;