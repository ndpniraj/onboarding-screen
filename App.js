import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Welcome from './app/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);

  // AsyncStorage if this already loaded or not
  // if yes render the actual app
  // if not then we are going display this welcome screen.

  const checkForFirstTimeLoaded = async () => {
    const result = await AsyncStorage.getItem('isFirstTimeOpen');
    if (result === null) setIsFirstTimeLoad(true);
    setLoading(false);
  };

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  const slides = [
    {
      key: 1,
      title: 'Welcome One',
      desc: 'Welcome Screen One Description!',
      backgroundColor: 'red',
    },
    {
      key: 2,
      title: 'Welcome Two',
      desc: 'Welcome Screen Two Description!',
      backgroundColor: 'blue',
    },
    {
      key: 3,
      title: 'Welcome Three',
      desc: 'Welcome Screen Three Description!',
      backgroundColor: 'green',
    },
  ];

  const handleDone = () => {
    setIsFirstTimeLoad(false);
    AsyncStorage.setItem('isFirstTimeOpen', 'no');
  };

  if (loading) return null;

  if (isFirstTimeLoad)
    return (
      <>
        <StatusBar hidden />
        <Welcome onDone={handleDone} slides={slides} />
      </>
    );

  if (!isFirstTimeLoad)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Welcome To The APP
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
