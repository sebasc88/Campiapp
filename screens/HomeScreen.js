import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ usuario }) {
  const [conexion, setConexion] = useState(false);
  const [contador, setContador] = useState(0);

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      
      <Text>
        Bienvenido { usuario }{"\n"}{"\n"}
      
        Estado: {conexion ? "Online " : "Offline "}
      </Text>

      <Button 
        title="Cambiar conexión" 
        onPress={() => setConexion(!conexion)} 
      />

      <Text style={{ marginTop: 20 }}>
        Bultos registrados: {contador}
      </Text>

      <Button 
        title="Registrar bulto" 
        onPress={() => setContador(contador + 1)} 
      />

    </View>
  );
}