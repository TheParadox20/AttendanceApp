import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rnBiometrics = new ReactNativeBiometrics();

const AttendanceScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const markAttendance = async () => {
    try {
      setIsLoading(true);
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Verify your identity to mark attendance',
        cancelButtonText: 'Cancel',
      });

      if (success) {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString();
        
        // Get existing attendance records
        const existingRecords = await AsyncStorage.getItem('attendanceRecords');
        const records = existingRecords ? JSON.parse(existingRecords) : [];
        
        // Add new attendance record
        records.push({
          date: currentDate,
          time: currentTime,
          type: 'check-in',
        });
        
        // Save updated records
        await AsyncStorage.setItem('attendanceRecords', JSON.stringify(records));
        
        Alert.alert(
          'Success',
          'Attendance marked successfully!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mark Your Attendance</Text>
      <Text style={styles.subtitle}>
        Please verify your identity using your fingerprint to mark your attendance
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={markAttendance}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify & Mark Attendance</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AttendanceScreen; 