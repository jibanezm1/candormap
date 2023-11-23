import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

import MapView, { Marker, Region } from 'react-native-maps';
import axios from 'axios';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MisionesResponse, IMision, ITipoMision } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

type TasksScreenNavigationProp = any; // Placeholder type declaration

interface TasksProps {
  data: any[];
  estado: boolean;
}


const Discovery = () => {

  const [tasksData, setTasksData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  
  useEffect(() => {
    const apiUrl = 'https://candormap.cl/api/misiones';
    axios
      .get(apiUrl)
      .then((response) => {
        // Extrae los datos de la respuesta JSON
        const data = response.data;
        // Actualiza el estado con los datos de la API
        setTasksData(data);
      })
      .catch((error) => {
        console.error('Error fetching data from API: ', error);
      });
  }, []);
  interface TaskRowProps {
    task: any;
    tipoMision: ITipoMision;
  }

  const [misionesFlash, setMisionesFlash] = useState([]);
  const [misionesNormales, setMisionesNormales] = useState([]);
  const [selectedMission, setSelectedMission] = useState<IMision | null>(null);
  const [misiones, setMisiones] = useState([]);
  const [isFlash, setIsFlash] = useState(false);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);

  const [isModalMisionVisible, setModalMisionVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dissmidModal = () => {
    setModalVisible(false);
  };
  const dissmidMisionModal = () => {
    setModalMisionVisible(false);
  };
  const onGO = (task: any) => {
    if (task.instrucciones) {
      setModalVisible(false);
      setModalMisionVisible(false);

      navigation.navigate("Details", {
        cuestionarioData: task.idCuestionario0,
        mision: task,
        instrucciones: task.instrucciones
      });
    }
  };

  const TaskRow = ({ task, tipoMision, data }) => {
    const backgroundColor = tipoMision == "1" ? '#FFA000' : 'purple';
    return (
      <TouchableOpacity style={[styles.containers, { backgroundColor }]}

        onPress={() => {
          onGO(data);
        }}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.timeText}>{task.time}</Text>
          <Icon name="timer-outline" size={24} color="white" style={styles.icon} />
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>{task.title}</Text>
          <Text style={styles.descText}>{task.desc}</Text>
        </View>
        <View style={styles.rightIcon}>
          <Icon name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error al leer el valor de AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (currentUser && currentUser.idUsuario) {
      const apiUrl = `https://candormap.cl/api/misiones?idUsuario=${currentUser.idUsuario}`;

      axios.get(apiUrl)
        .then(response => {
          // Ordenamos las misiones: Primero las de tipo 1 y luego las de tipo 2.
          const misionesFlash = response.data.filter((mision: IMision) => mision.idTipoMision == "1");
          const misionesNormales = response.data.filter((mision: IMision) => mision.idTipoMision == "2");
          setMisiones(response.data);
          setMisionesFlash(misionesFlash);
          setMisionesNormales(misionesNormales);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }

  }, [currentUser]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={currentRegion} // Usa la región actualizada aquí
          onRegionChangeComplete={region => setCurrentRegion(region)}
        >
          {misiones.map((mision: IMision) => (
            <Marker
              key={mision.idMision}
              coordinate={{
                latitude: parseFloat(mision.lat),
                longitude: parseFloat(mision.lng),
              }}
              title={mision.titulo}
              onPress={() => {
                setSelectedMission(mision);
                setModalMisionVisible(true);
              }}
            >
              <View style={[styles.markerContainer, { backgroundColor: mision.idTipoMision == 1 ? '#FFA000' : 'purple' }]}>
                <Icon name="fire" size={24} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>

        <View style={styles.TouchableOpacityStyle}>
          <TouchableOpacity style={[styles.button, { bottom: 10 }]} onPress={() => {
            setIsFlash(false);
            toggleModal();
          }}>
            <Icon name="walk" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button2, {}]} onPress={() => {
            setIsFlash(true);
            toggleModal();
          }}>
            <Icon name="flash-alert-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible}
          style={styles.modalContainer}
          swipeDirection={['down']}
          onBackdropPress={dissmidModal}
          scrollOffset={0}
          propagateSwipe={true}
          onDismiss={dissmidModal}
          onSwipeComplete={dissmidModal}
        >
          <View style={[styles.modalContent, { backgroundColor: isFlash ? '#FFA000' : 'purple' }]}>
            <View style={[styles.modalContents, { backgroundColor: isFlash ? '#FFA000' : 'purple' }]}>
              <Text style={styles.header}>Lista de tareas</Text>
            </View>
            <ScrollView
              overScrollMode="auto"
              bounces={true}
            >
              {
                isFlash ? <FlatList
                  data={misionesFlash}
                  nestedScrollEnabled={true}
                  ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                      <Text style={styles.listHeaderText}>Misiones Flash</Text>
                    </View>
                  )}
                  renderItem={({ item }) => (
                    <TaskRow
                      task={{
                        id: item.idMision.toString(),
                        time: item.tiempo || '00:00',
                        title: item.titulo,
                        desc: item.descripcion || '',
                      }}
                      data={item}
                      tipoMision={item.idTipoMision}
                    />
                  )}
                  keyExtractor={(item) => item.idMision.toString()}
                /> :
                  <FlatList
                    data={misionesNormales}
                    nestedScrollEnabled={true}

                    ListHeaderComponent={() => (
                      <View style={styles.listHeader}>
                        <Text style={styles.listHeaderText}>Movilización</Text>
                      </View>
                    )}
                    renderItem={({ item }) => (
                      <TaskRow
                        task={{
                          id: item.idMision.toString(),
                          time: item.tiempo || '00:00',
                          title: item.titulo,
                          desc: item.descripcion || '',
                        }}
                        data={item}
                        tipoMision={item.idTipoMision}
                      />
                    )}
                    keyExtractor={(item) => item.idMision.toString()}
                  />
              }
            </ScrollView>
          </View>
        </Modal>
        <Modal
          isVisible={isModalMisionVisible}
          style={styles.modalContainer}
          swipeDirection={['down']}
          onBackdropPress={dissmidMisionModal}
          scrollOffset={0}
          propagateSwipe={true}
          onDismiss={dissmidModal}
          onSwipeComplete={dissmidModal}
        >
          <View style={[styles.modalContent, { backgroundColor: (selectedMission && selectedMission.idTipoMision == 1) ? '#FFA000' : 'purple' }]}>


            <ScrollView
              overScrollMode="auto"
              bounces={true}
              style={{ paddingBottom: 30 }}
            >
              {selectedMission && (
                <TaskRow
                  task={{
                    id: selectedMission.idMision.toString(),
                    time: selectedMission.tiempo || '00:00',
                    title: selectedMission.titulo,
                    desc: selectedMission.descripcion || '',
                  }}
                  data={selectedMission}
                  tipoMision={selectedMission.idTipoMision}
                />
              )}
            </ScrollView>
          </View>
        </Modal>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 1,
    borderColor: "white",
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  listHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  listHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descText: {
    color: 'white',
    fontSize: 14,
  },
  rightIcon: {
    marginLeft: 10,
  },
  modalContent: {
    paddingVertical: 0,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: '80%',
  },
  modalContents: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    borderRadius: 60,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 50,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    fontSize: 16,
    color: 'gray',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 4,
    padding: 8,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    bottom: 0,

    left: '5%',
    right: '5%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'purple',
    alignItems: 'center',
    color: 'white',
  },
  button2: {
    bottom: 0,
    left: '5%',
    right: '5%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFA000',
    alignItems: 'center',
    color: 'white',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  markerContainer: {
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  TouchableOpacityStyle: {
    //Here is the trick
    position: 'absolute',
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 30,
  },
});

export default Discovery;
