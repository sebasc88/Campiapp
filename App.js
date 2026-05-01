import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [usuario, setUsuario] = useState(null);

  if (!usuario) {
    return <LoginScreen onLogin={setUsuario} />;
  }

    return <HomeScreen usuario={usuario}/>;
}

