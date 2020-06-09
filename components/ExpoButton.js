import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import Link from './Link';

export default () => (
  <TouchableOpacity 
    style={{
      userSelect: 'none',
      textDecoration: 'none',
      position: 'absolute',
      bottom: 8,
      right: 8,
    }}
  onPress={() => alert('image clicked')}>
    <View style={{ opacity: 0.5, flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{ width: 36, userSelect: 'none', height: 36 }}
        source={{
          uri:
            'https://d30j33t1r58ioz.cloudfront.net/static/brand/logo-b-black-228x228.png',
        }}
      />
      <Text style={{ fontWeight: '600', userSelect: 'none' }}>Expo</Text>
   </View>
</TouchableOpacity>

);
