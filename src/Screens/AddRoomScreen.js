import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';

export default function AddRoomScreen({navigation}) {
  const [roomName, setRoomName] = useState('');
  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
        })
        .then(() => {
          navigation.navigate('Home');
        }).catch(e=>{console.log(e)});
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          modeValue="contained"
          color="#6646ee"
          labelStyle={styles.buttonLabel}
          title="Create"
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#202111',
  },
  buttonLabel: {
    fontSize: 22,
  },
});