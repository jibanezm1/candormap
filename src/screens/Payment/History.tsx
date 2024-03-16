import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated } from 'react-native';
import axios from 'axios'; // Importar Axios para realizar solicitudes HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabeza from '../../components/molecules/Header';
import { Color } from '../../styles/Global';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
interface Solicitud {
  id: string;
  fecha: string;
  monto: string;
  status: string;
}

const History = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]); // Cambiar a 'Solicitud'
  const windowHeight = Dimensions.get('window').height;
  const desiredHeight = windowHeight * 0.83;
  const [logoAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await AsyncStorage.getItem('currentUser');
        const userId = currentUser ? JSON.parse(currentUser).idUsuario : null;

        if (userId) {
          console.log(`https://candormap.cl/api/solicitud?idUsuario=${userId}`);
          // Hacer la solicitud HTTP usando Axios
          const response = await axios.get(`https://candormap.cl/api/solicitud?idUsuario=${userId}`);
          // Actualizar el estado con los datos recibidos
          setSolicitudes(response.data);
        }
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
      }
    };

    fetchData();
  }, []);

  const markAsRead = (solicitudId: string) => {
    // Aquí puedes implementar la lógica para marcar una solicitud como leída si es necesario
  };

  const renderItem = ({ item }: { item: Solicitud }) => (
    <TouchableOpacity
      style={[
        styles.solicitudItem,
        item.status === 'aprobada' && styles.solicitudAprobada, // Agregar estilo adicional si está aprobada
      ]}
    >
      <View style={styles.solicitudContent}>
        <Text style={styles.fecha}>Fecha Solicitud: {item.fecha}</Text>
        <Text style={styles.monto}>Monto Solicitado: {item.monto}</Text>
        {item.status != 'aprobada' && <Text style={styles.monto}>Pendiente</Text>}
        {item.status === 'aprobada' && <Text style={styles.monto}>Aprobado</Text>}

      </View>
      {/* Mostrar un ícono de check si está aprobada */}
      {item.status === 'aprobada' && <Icon name="checkmark-circle-outline" size={30} color="#00FF00" />}
      {item.status != 'aprobada' && <Icons name="pending-actions" size={30} color="purple" />}

    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="sad-outline" size={50} color="#bdc3c7" />

      <Text style={styles.emptyText}>No existen solicitudes de pago</Text>
    </View>
  );

  const logoStyle = {
    transform: [
      {
        translateY: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
      <Cabeza tittle='Historial de pagos' />
      <View style={{ marginHorizontal: 20, top: 120 }}>
        <Animated.View style={logoStyle}>
          <Text style={{ color: "#C889FF", fontSize: 40 }}>Historial</Text>
        </Animated.View>
      </View>
      <View style={styles.contenedor}>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginBottom: 300,
            height: desiredHeight,
          }}
        >
          <FlatList
            data={solicitudes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ minHeight: `100%` }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 100 }} />}
            style={{ flexGrow: 1 }}
            ListEmptyComponent={<EmptyListComponent />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 50,
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  emptyText: {
    fontSize: 16,
    color: '#bdc3c7',
    marginTop: 10,
  },
  solicitudAprobada: {
    backgroundColor: Color.designLightGray, // Color de fondo para las solicitudes aprobadas
  },
  solicitudItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
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
  solicitudItemRead: {
    backgroundColor: Color.designBGMain,
  },
  solicitudContent: {
    flex: 1, // Para que ocupe todo el espacio disponible
  },
  fecha: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  monto: {
    fontSize: 10,
    color: 'white',
  },
  read: {
    color: '#fff',
  },
});

export default History;
