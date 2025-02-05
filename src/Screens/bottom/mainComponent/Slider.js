// SwiperComponent.js
import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: viewportWidth } = Dimensions.get('window');

const SwiperComponent = ({ data }) => {
    const testImageUrl = 'https://via.placeholder.com/600x200?text=Static+Image';
  return (
    
    <Swiper
      autoplay
      autoplayTimeout={3}
      loop
      style={styles.wrapper}
      showsPagination={false}
    >
      {data.map((image, index) => (
        <View key={index} style={styles.slide}>
            
          <Image source={{ uri: testImageUrl }} style={styles.image} />
        </View>
      ))}
    </Swiper>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200, // Adjust height as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: viewportWidth,
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
});

export default SwiperComponent;
