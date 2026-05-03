import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🚧 Módulo en desarrollo</Text>
      <Text style={styles.mensaje}>
        Este módulo se encuentra en desarrollo. Pronto estará disponible.
      </Text>
    </View>
  );
}
// seccion de modulo en desarrollo  mensaje que dice el estado del modulo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mensaje: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});