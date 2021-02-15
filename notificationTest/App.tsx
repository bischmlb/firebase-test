/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './notifService';


export const App = () => {

  const [getRegisterTokenState, setRegisterTokenState] = useState<any>();
  const [getFcmRegisteredState, setFcmRegisteredState] = useState<boolean>();

  const onRegister = (token: any) => {
    setRegisterTokenState(token.token);
    setFcmRegisteredState(true);
  }

  const onNotif = (notif: any) => {
    Alert.alert(notif.title, notif.message);
  }

  const handlePerm = (perms: any) => {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  const notif = new NotifService(onRegister, onNotif);


  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Example app react-native-push-notification
        </Text>
        <View style={styles.spacer}></View>
        <TextInput
          style={styles.textField}
          value={getRegisterTokenState}
          placeholder="Register token"
        />
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.localNotif('sample.mp3');
          }}>
          <Text>Local Notification with sound (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.scheduleNotif();
          }}>
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.scheduleNotif('sample.mp3');
          }}>
          <Text>Schedule Notification with sound in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.cancelNotif();
          }}>
          <Text>Cancel last notification (if any)</Text>
        </TouchableOpacity>
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
            notif.checkPermission(handlePerm);
          }}>
          <Text>Check Permission</Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.getScheduledLocalNotifications((notifs:any) => console.log(notifs));
          }}>
          <Text>Console.Log Scheduled Local Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.createOrUpdateChannel();
          }}>
          <Text>Create or update a channel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.popInitialNotification();
          }}>
          <Text>popInitialNotification</Text>
        </TouchableOpacity>

        <View style={styles.spacer}></View>


        <View style={styles.spacer}></View>
      </View>
  )
}

export default App;
/*
export default class App extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Example app react-native-push-notification
        </Text>
        <View style={styles.spacer}></View>
        <TextInput
          style={styles.textField}
          value={this.state.registerToken}
          placeholder="Register token"
        />
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif('sample.mp3');
          }}>
          <Text>Local Notification with sound (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif();
          }}>
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif('sample.mp3');
          }}>
          <Text>Schedule Notification with sound in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelNotif();
          }}>
          <Text>Cancel last notification (if any)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelAll();
          }}>
          <Text>Cancel all notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.checkPermission(this.handlePerm.bind(this));
          }}>
          <Text>Check Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.requestPermissions();
          }}>
          <Text>Request Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.abandonPermissions();
          }}>
          <Text>Abandon Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.getScheduledLocalNotifications(notifs => console.log(notifs));
          }}>
          <Text>Console.Log Scheduled Local Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.createOrUpdateChannel();
          }}>
          <Text>Create or update a channel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.popInitialNotification();
          }}>
          <Text>popInitialNotification</Text>
        </TouchableOpacity>

        <View style={styles.spacer}></View>


        <View style={styles.spacer}></View>
      </View>
    );
  }

  onRegister(token: any) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif: any) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms: any) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
