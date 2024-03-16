import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CurvedBottomBarScreenWrapper = ({ ScreenComponent }) => {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'HomeTask':
                icon = 'today-sharp';
                break;
            case 'HomeMissions':
                icon = 'golf-sharp';
                break;
            case 'Profile':
                icon = 'settings-outline';
                break;
            // Add more cases for other tabs
            default:
                icon = 'help'; // Default icon
        }

        return (
            <Ionicons
                name={icon}
                size={25}
                color={routeName === selectedTab ? 'white' : 'gray'}
            />
        );
    };

    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={styles.tabBarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <CurvedBottomBar.Navigator
                type="UP"
                height={100}
                circleWidth={55}
                screenOptions={{ headerShown: false }} // Add this line
                bgColor="#30023e"
                initialRouteName="HomeTask"
                borderTopLeftRight
                renderCircle={({ selectedTab, navigate }) => (
                    <TouchableOpacity
                        style={styles.circleButton}
                        onPress={() => Alert.alert('Click Action')}
                    >
                        <Ionicons name={'qr-code-sharp'} color="#30023e" size={25} />
                    </TouchableOpacity>
                )}
                tabBar={renderTabBar}
            >
                <CurvedBottomBar.Screen
                    name="HomeTask"
                    component={() => <View />} // Replace with your screen component
                    position="LEFT"
                />
                <CurvedBottomBar.Screen
                    name="HomeMissions"
                    component={() => <View />} // Replace with your screen component
                    position="LEFT"
                />
                <CurvedBottomBar.Screen
                    name="Profile"
                    component={() => <View />} // Replace with your screen component
                    position="RIGHT"
                />
                {/* Add more CurvedBottomBar.Screen components as needed */}
            </CurvedBottomBar.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    circleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CurvedBottomBarScreenWrapper;
