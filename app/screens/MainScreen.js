import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Área de Gestão</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Libraries')}
            >
                <Text style={styles.buttonText}>Ver Bibliotecas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Checkouts')}
            >
                <Text style={styles.buttonText}>Checkouts</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
        width: 200, // Define a largura fixa para os botões
        alignItems: 'center', // Centraliza o texto dentro do botão
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

