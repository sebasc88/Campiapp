import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
// Pantallas
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Recoleccion from './screens/RecoleccionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#3A415A',
            height: 90,
          },

          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#aaaaaa',

          
         tabBarIcon: ({ focused, color, size }) => {
  let iconName;

  if (route.name === 'Menu') {
    iconName = focused ? 'menu' : 'menu-outline';
  } else if (route.name === 'Recolección') {
    iconName = focused ? 'leaf' : 'leaf-outline';
  } else if (route.name === 'Login') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
},
        })}
      >
        <Tab.Screen name="Menu" component={HomeScreen} />
        <Tab.Screen name="Recolección" component={Recoleccion} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}