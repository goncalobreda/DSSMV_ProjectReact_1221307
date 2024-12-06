import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Gestão de Bibliotecas!</Text>
            <Button
                title="Ver Bibliotecas"
                onPress={() => navigation.navigate('Libraries')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
