import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export default function LoginScreen() {
  const [cc, setCc] = useState('');
  const [pin, setPin] = useState('');


    const validarConexion = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Alert.alert("Estado", "🟢 Estás ONLINE");
      } else {
        Alert.alert("Estado", "🔴 Estás OFFLINE");
      }
    });
  };


  const login = () => {
    // Validaciones
    if (!cc || !pin) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (!/^\d+$/.test(cc)) {
      Alert.alert("Error", "La CC solo debe tener números");
      return;
    }

    if (pin.length !== 4) {
      Alert.alert("Error", "El PIN debe tener 4 dígitos");
      return;
    }

    // Simulación login
    console.log("Login correcto:", cc);

    Alert.alert("Éxito", "Inicio de sesión correcto");
  };

  return (
    <View style={styles.container}>

        {/* Boton de OF LINE Y ONLINE */}
      <TouchableOpacity style={styles.botonNube} onPress={validarConexion}>
        <Text style={styles.textoBotonNube}>☁️</Text>
      </TouchableOpacity>


      <Text style={styles.titulo}>INICIO DE SESIÓN</Text>

      {/* CC */}
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={cc}
        onChangeText={setCc}
      />

      {/* PIN */}
      <TextInput
        style={styles.input}
        placeholder="PIN (4 dígitos)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />

      {/* BOTÓN */}
      <TouchableOpacity style={styles.boton} onPress={login}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#566981',
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#3A415A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

    botonNube: {
    backgroundColor: '#0099ff',
    width: 50,
    height:50,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotonNube: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 35,
  },
});