import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.userInfo}>
      <View style={styles.top}>
        <View style={styles.right}>
          <Image
            source={{uri: '/user1.jpg'}}
            style={styles.image}
            alt="not-found"
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.name}>Joe Doe</Text>
          <Text style={styles.contact}>123-456-7891</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.about}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </View>
    </View>
  );
};

const styles = {
  userInfo: {
    // Add style for the outermost container
  },
  top: {
    // Add style for the top container
  },
  right: {
    // Add style for the right container
  },
  image: {
    // Add style for the image
  },
  left: {
    // Add style for the left container
  },
  name: {
    // Add style for the name text
  },
  contact: {
    // Add style for the contact text
  },
  bottom: {
    // Add style for the bottom container
  },
  about: {
    // Add style for the about text
  },
};

export default ProfileScreen;