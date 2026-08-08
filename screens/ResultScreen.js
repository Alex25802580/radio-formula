import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateWheelSpokes } from '../utils/spokeCalculator';

const { width, height } = Dimensions.get('window');
const STORAGE_KEY = 'ruedas';

const ResultScreen = ({ route, navigation }) => {
  const wheel = route.params?.wheel;
  const result = calculateWheelSpokes(wheel);

  const [modalVisible, setModalVisible] = useState(false);
  const [rimName, setRimName] = useState('');
  const [hubName, setHubName] = useState('');

  const isSymmetric = result.leftRounded === result.rightRounded;

  const saveWheel = async () => {
    const cleanRimName = rimName.trim();
    const cleanHubName = hubName.trim();

    if (!cleanRimName || !cleanHubName) {
      Alert.alert('Missing information', 'Enter a rim name and a hub name.');
      return;
    }

    const savedWheel = {
      id: Date.now().toString(),
      rimName: cleanRimName,
      hubName: cleanHubName,
      leftSpoke: result.leftRounded,
      rightSpoke: result.rightRounded,
      wheel,
    };

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const savedWheels = data ? JSON.parse(data) : [];
      savedWheels.push(savedWheel);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedWheels));

      setModalVisible(false);
      navigation.navigate('SavedWheels');
    } catch (error) {
      console.error('Error saving wheel', error);
      Alert.alert('Could not save wheel', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.title}>Result</Text>

      {isSymmetric ? (
        <Text style={styles.result}>
          Spoke length: {result.leftRounded.toFixed(1)} mm
        </Text>
      ) : (
        <>
          <Text style={styles.result}>
            Left spoke: {result.leftRounded.toFixed(1)} mm
          </Text>
          <Text style={styles.result}>
            Right spoke (drive side): {result.rightRounded.toFixed(1)} mm
          </Text>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Save wheel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonText}>Back to home</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save wheel</Text>

            <Text style={styles.modalLabel}>Rim name:</Text>
            <TextInput
              value={rimName}
              onChangeText={setRimName}
              style={styles.modalInput}
              placeholder="Enter rim name"
              placeholderTextColor="#8E8E93"
            />

            <Text style={styles.modalLabel}>Hub name:</Text>
            <TextInput
              value={hubName}
              onChangeText={setHubName}
              style={styles.modalInput}
              placeholder="Enter hub name"
              placeholderTextColor="#8E8E93"
            />

            <TouchableOpacity style={styles.modalButton} onPress={saveWheel}>
              <Text style={styles.buttonText}>Save wheel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.buttonSecondary]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: '#1C1C1E',
  },
  result: {
    fontSize: 20,
    marginBottom: height * 0.015,
    textAlign: 'center',
    color: '#1C1C1E',
  },
  buttonContainer: {
    marginTop: height * 0.03,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: width * 0.93,
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: height * 0.01,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1C1C1E',
    alignSelf: 'flex-start',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#D1D1D6',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 17,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default ResultScreen;
