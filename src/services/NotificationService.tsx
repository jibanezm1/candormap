import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationService {
  notificationListener: (() => void) | null = null;
  notificationOpenedListener: (() => void) | null = null;

  // Registra el dispositivo para recibir notificaciones
  async registerDevice() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Aquí puedes enviar el token a tu base de datos si lo necesitas
    }
  }

  // Escucha las notificaciones entrantes
  registerNotificationListeners() {
    // Cuando la notificación es recibida en primer plano
    this.notificationListener = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      this.saveNotification(remoteMessage);
    });

    // Cuando la notificación hace clic en segundo plano o apagado
    this.notificationOpenedListener = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', JSON.stringify(remoteMessage));
      // Navegación o manejo de la notificación
    });

    // Si la app se abre desde una notificación cerrada
    messaging().getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', JSON.stringify(remoteMessage));
        // Navegación o manejo de la notificación
      }
    });
  }

  // Obtiene el ID del usuario actual del AsyncStorage
  async getCurrentUserId() {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser).idUsuario : null;
    } catch (error) {
      console.error('Error fetching current user from AsyncStorage:', error);
      return null;
    }
  }

  // Guarda la notificación en Firestore
  async saveNotification(notification) {
    const userId = await this.getCurrentUserId();

    if (userId) {
      firestore().collection('notifications').add({
        title: notification.notification.title,
        body: notification.notification.body,
        data: notification.data,
        userId: userId,
        read: false,
        timestamp: firestore.FieldValue.serverTimestamp()
      });
    }
  }

  // Elimina los listeners al desmontar
  unregisterNotificationListeners() {
    if (this.notificationListener) {
      this.notificationListener();
      this.notificationListener = null;
    }
    if (this.notificationOpenedListener) {
      this.notificationOpenedListener();
      this.notificationOpenedListener = null;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
