import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from '../screens/Tasks';
import Missions from '../screens/Missions';
import Payment from '../screens/Payment';
import Profile from '../screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeTask from '../screens/HomeTasks';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeMissions from '../screens/HomeMissions';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      shifting={true} // Enable the shifting behavior
      activeColor="#FFFFFF" // White color for the active tab icon and label
      inactiveColor="#A9A9A9" // Dim color for the inactive tab icon and label
    >
    
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
