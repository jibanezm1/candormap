import * as React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tasks from './Tasks';
import axios from 'axios';  // <--- Importa Axios

const FirstRoute = (props) => (
  <Tasks data={props.data} />
);

const SecondRoute = (props) => (
  <Tasks data={props.data} />
);

export default function HomeTask() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pendiente' },
    { key: 'second', title: 'Realizadas' },
  ]);
  const [data, setData] = React.useState([]);  // <--- Estado para almacenar la data

  // Llama a la API cuando el componente se monta
  React.useEffect(() => {
    axios.get('https://candormap.cl/api/cuestionarios')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching data", error);
      });
  }, []);  // El array vacío significa que esto se ejecutará solo una vez cuando se monte el componente.

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute data={data} />;
      case 'second':
        return <SecondRoute data={data} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white', // Fondo blanco
  },
  tabIndicator: {
    backgroundColor: 'blue', // Color azul para el indicador del tab seleccionado
  },
  tabLabel: {
    color: 'blue', // Color azul para el texto del tab
  },
});
