/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import NotificationRegistrationService from './NotificationRegistrationService';
import NotificationService from './NotificationService';


export const App = () => {
  const [getFcmRegisteredState, setFcmRegisteredState] = useState<boolean>();
  const [getStatus, setStatus] = useState<string>("Push notifications registration status is unknown");
  const [getRegisteredOS, setRegisteredOS] = useState<string>('');
  const [getRegisteredToken, setRegisteredToken] = useState<string>('');
  const [getIsRegistered, setIsRegistered] = useState<boolean>(false);
  const [getIsBusy, setIsBusy] = useState<boolean>(false);
/*
  const [getISTATE, setISTATE] = useState<{
    status: string;
    registeredOS: string;
    registeredToken: string;
    isRegistered: boolean;
    isBusy: boolean;
  }>({
    status: 'Push notifications registration status is unknown',
    registeredOS: '',
    registeredToken: '',
    isRegistered: false,
    isBusy: false,
  });
*/
  const onRegister = (token: any) => {
    setRegisteredToken(token.token);
    setFcmRegisteredState(true);
    setRegisteredOS(token.os);
  };

  const onNotif = (notif: any) => {
    Alert.alert(notif.title, notif.message);
    console.log('TITLE: ', notif.title);
    console.log('MESSAGE:', notif.message);
  };

  const handlePerm = (perms: any) => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  const deviceId = deviceInfoModule.getUniqueId();
  const notif = new NotificationService(onRegister, onNotif);
  const notifreg = new NotificationRegistrationService(
    "https://testd-912f0-default-rtdb.firebaseio.com",
    //Config.apiUrl,
    //Config.apiKey,
  );

  const onRegisterButtonPress = () => {
    if (!getRegisteredToken || !getRegisteredOS) {
      Alert.alert("The push notifications token wasn't received");
      return;
    }

    let status: string = 'Registering ...';
    let isRegistered = getIsRegistered;
    try {
      setIsBusy(true);
      setStatus(status);
      const pnPlatform = getRegisteredOS == 'ios' ? 'apns' : 'fcm';
      const pnToken = getRegisteredToken;
      const request = {
        installationId: deviceId,
        platform: pnPlatform,
        pushChannel: pnToken,
        tags: [],
      };
      const response = notifreg.registerAsync(request, deviceId);
      status = `Registered for ${getRegisteredOS} push notifications`;
      isRegistered = true;
    } catch (e) {
      setStatus(`Registration failed: ${e}`);
    } finally {
      setIsBusy(false);
      setStatus(status);
      setIsRegistered(isRegistered);
    }
  };

  const onDeregisterButtonPress = () => {
    if (!notif) return;

    let status: string = 'Deregistering...';
    let isRegistered = getIsRegistered;
    try {
      setIsBusy(true);
      notifreg.deregisterAsync(deviceId);
      status = 'Deregistered from push notifications';
      isRegistered = false;
    } catch (e) {
      status = `Deregistration failed: ${e}`;
    } finally {
      setIsBusy(false);
      setStatus(status);
      setIsRegistered(isRegistered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {getIsBusy && <ActivityIndicator></ActivityIndicator>}
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={onRegisterButtonPress}
            disabled={getIsBusy}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Deregister"
            onPress={onDeregisterButtonPress}
            disabled={getIsBusy}
          />
        </View>
      </View>

      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer}></View>
      <TextInput
        style={styles.textField}
        value={getRegisteredToken}
        placeholder="Register token"
      />
      <View style={styles.spacer}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelAll();
        }}>
        <Text>Cancel all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.requestPermissions();
        }}>
        <Text>Request Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.abandonPermissions();
        }}>
        <Text>Abandon Permissions</Text>
      </TouchableOpacity>

      <View style={styles.spacer}></View>

      <View style={styles.spacer}></View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
