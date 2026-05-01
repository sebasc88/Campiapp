import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ onLogin }) {
    const [user, setUser] = useState('');

    return(
        <View style={{ padding: 20}}>
            <Text>Usuario</Text>

            <TextInput
            placeholder="Escribe tu nombre"
            value={user}
            onChangeText={setUser}
            style={{ bordeWidth: 1, marginBottom: 10}}
            />

            <Button
                title="Ingresar"
                onPress={() => onLogin(user)}
                />
        </View>
    );

}