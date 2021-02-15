import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotificationService {
  constructor(onTokenReceived: any, onNotificationReceived: any) {
    NotificationHandler.attachTokenReceived(onTokenReceived);
    NotificationHandler.attachNotificationReceived(onNotificationReceived);
    PushNotification.getApplicationIconBadgeNumber(function(number: number) {
      if(number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  checkPermissions(cbk: any) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}


