import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Image, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import MenuItem from '../../components/molecules/MenuItem';
import { Animated } from 'react-native';
import { Color } from '../../styles/Global';

interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
}

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const windowHeight = Dimensions.get('window').height;
  const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla
  const windowWidth = Dimensions.get('window').width; // Ancho de la ventana
  const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const currentUser = await AsyncStorage.getItem('currentUser');
        const userId = currentUser ? JSON.parse(currentUser).idUsuario : null;

        if (userId) {
          const subscriber = firestore()
            .collection('notifications')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .onSnapshot(querySnapshot => {
              if (querySnapshot) {
                const notificationsArray: Notification[] = [];

                querySnapshot.forEach(documentSnapshot => {
                  notificationsArray.push({
                    id: documentSnapshot.id,
                    ...documentSnapshot.data(),
                  } as Notification);
                });

                setNotifications(notificationsArray);
              } else {
                console.log('No notifications found');
              }
            });

          return () => subscriber();
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);


  const markAsRead = (notificationId: string) => {
    firestore()
      .collection('notifications')
      .doc(notificationId)
      .update({ read: true })
      .then(() => {
        console.log('Notification marked as read!');
        // Actualizar el estado local de la notificación a leído
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id === notificationId ? { ...notification, read: true } : notification,
          ),
        );
      })
      .catch(error => console.error('Error updating notification: ', error));
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item.read && styles.notificationItemRead, // Cambiar el estilo si está marcado como leído
      ]}
      onPress={() => !item.read && markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <Text style={[styles.title, item.read && styles.titleRead]}>{item.title}</Text>
        <Text style={[styles.body, item.read && styles.bodyRead]}>{item.body}</Text>
      </View>
      {!item.read && (
        <View style={styles.markReadIcon}>
          <Icon name="notifications" size={30} color="#8e44ad" />
        </View>
      )}
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="sad-outline" size={50} color="#bdc3c7" />
      <Text style={styles.emptyText}>No hay notificaciones</Text>
    </View>
  );
  const logoStyle = {
    transform: [
        {
            translateY: logoAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0], // Comienza 100 píxeles arriba y se mueve a su posición original
            }),
        },
    ],
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
      <Cabeza tittle='Notificaciones' />

      <View style={{ marginHorizontal: 20, top: 120 }}>
        <Animated.View style={logoStyle}>
          <Text style={{ color: "#C889FF", fontSize: 40 }}>Notificaciones</Text>
        </Animated.View>

      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          marginBottom: 300,
          height: desiredHeight,
        }}
      >
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ minHeight: `100%` }}
          showsVerticalScrollIndicator={false} // Esto ocultará la barra de desplazamiento

          // contentContainerStyle={{ paddingBottom: 300, marginBottom: 200, height: windowHeight , flexGrow: 1,}}
          // Asegúrate de que el FlatList pueda expandirse y contraerse según el contenido
          style={{ flexGrow: 1 }}
          ListEmptyComponent={<EmptyListComponent />} // Agrega esta línea


        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilo del contenedor principal
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, // Ajusta esto según sea necesario
  },
  emptyText: {
    fontSize: 16,
    color: '#bdc3c7',
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f8', // Un color de fondo claro, similar al de la imagen
  },
  // Estilo de cada ítem de notificación


  // Estilo para el título de la notificación
  title: {
    fontWeight: 'bold',
    fontSize: 16, // Tamaño más grande para el título
    color: '#2c3e50', // Un color oscuro para el texto del título
    marginBottom: 5, // Espacio debajo del título
  },
  // Estilo para el cuerpo del mensaje
  body: {
    fontSize: 14, // Tamaño de letra para el cuerpo
    color: '#34495e', // Un color ligeramente más claro que el título
  },
  // Estilo para el botón 'Mark as read'
  markRead: {
    color: '#4b7bec', // Un color azul para resaltar la acción
    marginTop: 10, // Espaciado superior
    fontWeight: '500', // Un poco más de peso para la fuente
  },
  notificationItem: {
    flexDirection: 'row', // Alinear ícono con texto
    alignItems: 'center', // Centrar ítems verticalmente
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationItemRead: {
    backgroundColor: '#8e44ad', // Fondo morado para elementos leídos
  },
  titleRead: {
    color: '#fff', // Texto blanco para el título leído
  },
  bodyRead: {
    color: '#fff', // Texto blanco para el cuerpo leído
  },
  markReadIcon: {
    marginLeft: 'auto', // Posiciona el ícono al final del elemento
  },
});


export default NotificationComponent;
