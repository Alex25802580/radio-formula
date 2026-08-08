import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const STORAGE_KEY = 'ruedas';

const SavedWheelsScreen = () => {
  const [savedWheels, setSavedWheels] = useState([]);
  const navigation = useNavigation();

  const loadWheels = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setSavedWheels(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Error loading wheels', error);
      Alert.alert('Could not load saved wheels', 'Please try again.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWheels();
    }, [loadWheels])
  );

  const deleteWheel = (id) => {
    Alert.alert('Delete wheel', 'Are you sure you want to delete this wheel?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedWheels = savedWheels.filter((wheel) => wheel.id !== id);
          setSavedWheels(updatedWheels);

          try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWheels));
          } catch (error) {
            console.error('Error deleting wheel', error);
            Alert.alert('Could not delete wheel', 'Please try again.');
            loadWheels();
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    // Legacy field names keep wheels saved by previous app versions readable.
    const rimName = item.rimName ?? item.llanta ?? '';
    const hubName = item.hubName ?? item.buje ?? '';
    const leftSpoke = item.leftSpoke ?? Number(item.radioIzquierdo);
    const rightSpoke = item.rightSpoke ?? Number(item.radioDerecho);
    const isSymmetric = leftSpoke === rightSpoke;

    return (
      <View style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.name}>Rim: {rimName}</Text>
          <Text style={styles.name}>Hub: {hubName}</Text>

          {isSymmetric ? (
            <Text style={styles.spokeText}>
              Spoke length: {Number(leftSpoke).toFixed(1)} mm
            </Text>
          ) : (
            <>
              <Text style={styles.spokeText}>
                Left spoke: {Number(leftSpoke).toFixed(1)} mm
              </Text>
              <Text style={styles.spokeText}>
                Right spoke (drive side): {Number(rightSpoke).toFixed(1)} mm
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          onPress={() => deleteWheel(item.id)}
          style={styles.deleteButton}
          accessibilityLabel={`Delete ${rimName} ${hubName}`}
        >
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Text style={styles.title}>Saved Wheels</Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

        <FlatList
          data={savedWheels}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No wheels saved yet</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1C1C1E',
  },
  homeButton: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#1100ad',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: height * 0.05,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 3,
  },
  spokeText: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 2,
  },
  deleteButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555555',
  },
});

export default SavedWheelsScreen;
