import * as React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Discovery from './Discovery';
import Missions from './Missions';
const FirstRoute = () => (
  <Missions />
);

const SecondRoute = () => (
  <Discovery />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function HomeMissions() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Encuestas' },
    { key: 'second', title: 'Explorar' },
  ]);

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
