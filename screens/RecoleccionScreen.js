import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

// crea la bd 
const db = SQLite.openDatabaseSync('recoleccion.db');

export default function Recoleccion() {
  const [total, setTotal] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [suma, setSuma] = useState(0);

  //almacena el id de usuario para gegistrar movimientos
  const userId = "usuario_1";

  // crea e inicia la bd 
  useEffect(() => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS registros (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT,
          total INTEGER,
          created_at TEXT
        );
      `);

      cargarDatos();
      cargarSuma();
    } catch (error) {
      console.log("Error inicializando DB:", error);
    }
  }, []);

  // traer la fecha actual para registrarla
  const getFechaActual = () => {
    return new Date().toISOString();
  };

  // carga listado de registros decendente  la uso para listar la tabla
  const cargarDatos = () => {
    try {
      const datos = db.getAllSync(
        'SELECT * FROM registros ORDER BY id DESC'
      );
      setRegistros(datos);
    } catch (error) {
      console.log("Error cargando datos:", error);
    }
  };

  //carga la suma que esta en la bd
  const cargarSuma = () => {
    try {
      const resultado = db.getAllSync(
        'SELECT SUM(total) as suma FROM registros'
      );

      if (resultado.length > 0) {
        setSuma(resultado[0].suma || 0);
      }
    } catch (error) {
      console.log("Error cargando suma:", error);
    }
  };

  // guarda los registros en la bd
  const guardar = () => {
    if(total !=0 ){
        try {
      const fecha = getFechaActual();

      db.runSync(
        'INSERT INTO registros (user_id, total, created_at) VALUES (?, ?, ?)',
        [userId, total, fecha]
      );

      setTotal(0);
      cargarDatos();
      cargarSuma();
    } catch (error) {
      console.log("Error guardando:", error);
    }
    }
    
  };

  // borrar registro
  const borrar = (id) => {
    try {
      db.runSync('DELETE FROM registros WHERE id = ?', [id]);
      cargarDatos();
      cargarSuma();
    } catch (error) {
      console.log("Error borrando:", error);
    }
  };

  // contador
  const aumentar = () => setTotal(total + 1);

  const disminuir = () => {
    if (total > 0) setTotal(total - 1);
  };

  return (
    <View style={styles.container}>

      {/* TOTAL GENERAL */}
      <View style={styles.botones}>
        <Text style={styles.titulo}>TOTAL GUARDADO:</Text>
        <Text style={styles.general}>{suma}</Text>
      </View>

      <Text style={styles.titulo}>Recolección</Text>

      {/* CONTADOR */}
      <Text style={styles.total}>{total}</Text>

      {/* BOTONES */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonRestar} onPress={disminuir}>
          <Text style={styles.textoBoton}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSumar} onPress={aumentar}>
          <Text style={styles.textoBoton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCandado} onPress={aumentar}>
          <Text style={styles.textoBoton}>🔒</Text>
        </TouchableOpacity>

      </View>

      

      {/* GUARDAR */}
      <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
        <Text style={styles.textoGuardar}>Guardar</Text>
      </TouchableOpacity>

      {/* ENCABEZADO TABLA */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Total</Text>
        <Text style={styles.headerText}>Usuario</Text>
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}>Acción</Text>
      </View>

      {/* HISTORIAL */}
      <FlatList
        data={registros}
        
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({ item }) => (
          
          <View style={styles.item}>
            <Text style={styles.columna}>{item.total}</Text>
            <Text style={styles.columna}>{item.user_id}</Text>
            <Text style={styles.columna}>{
            
              item.created_at.split("T")[0]
            }</Text>

            <TouchableOpacity
              style={styles.botonBorrar}
              onPress={() => borrar(item.id)}
            >
              <Text style={styles.textoBorrar}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#566981',
  },
  titulo: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 35,
  },
  total: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
  },
  general: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  botonSumar: {
    backgroundColor: 'green',
    padding: 30,
    borderRadius: 10,
  },
  botonRestar: {
    backgroundColor: 'red',
    padding: 30,
    borderRadius: 10,
  },
  textoBoton: {
    fontSize: 30,
    color: '#fff',
  },
  botonCandado:{
    backgroundColor:'#0f3381',
    padding:30,
    //width:25,
    //height:25,
    borderRadius:5,
  },
  botonGuardar: {
    backgroundColor: '#FFD700',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoGuardar: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#fff',
    paddingBottom: 5,
    marginBottom: 10,
  },

  headerText: {
    flex: 1,
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },

  columna: {
    flex: 1,
    color: '#25c53a',
   
    fontWeight: 'bold',
    margin: 5,
    padding:2,
    textAlign: 'center',
  },

  botonBorrar: {
    backgroundColor: 'red',
    width: 50,
    textAlign: 'center',
    padding: 10,
    
    borderRadius: 3,
  },

  textoBorrar: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});