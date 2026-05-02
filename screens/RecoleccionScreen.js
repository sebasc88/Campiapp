import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

// 👉 Base de datos (API nueva)
const db = SQLite.openDatabaseSync('recoleccion.db');

export default function Recoleccion() {
  const [total, setTotal] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [suma, setSuma] = useState(0);

  const userId = "usuario_1";

  // 🚀 Inicialización
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

  // 📅 Fecha actual
  const getFechaActual = () => {
    return new Date().toISOString();
  };

  // 📋 Obtener registros
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

  // 🧮 Obtener suma total
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

  // 💾 Guardar
  const guardar = () => {
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
  };

  // 🗑️ Borrar
  const borrar = (id) => {
    try {
      db.runSync('DELETE FROM registros WHERE id = ?', [id]);
      cargarDatos();
      cargarSuma();
    } catch (error) {
      console.log("Error borrando:", error);
    }
  };

  // ➕➖ Contador
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
      </View>

      {/* GUARDAR */}
      <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
        <Text style={styles.textoGuardar}>Guardar</Text>
      </TouchableOpacity>

      {/* HISTORIAL */}
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.textoItem}>Total: {item.total}</Text>
              <Text style={styles.textoItem}>Usuario: {item.user_id}</Text>
              <Text style={styles.textoItem}>Fecha: {item.created_at}</Text>
            </View>

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

// 🎨 ESTILOS
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
  botonGuardar: {
    backgroundColor: '#3A415A',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoGuardar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoItem: {
    fontSize: 14,
    color: '#fff',
  },
  botonBorrar: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 50,
  },
  textoBorrar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});