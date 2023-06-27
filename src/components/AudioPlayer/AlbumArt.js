import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';

const AlbumArt = ({
  video
}) => {
  return <View style={styles.container}>
      <Video source={{uri: video }}   // Can be a URL or a local file.
        paused={false}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        style={styles.image}
        onError={(error) => console.log(error)}
        volume={0}
      />
  </View>
}


export default AlbumArt;

const { width } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})
