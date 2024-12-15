import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createBook } from '../services/api';

export default function AddBookScreen({ route, navigation }) {
    const { libraryId } = route.params;
    const [isbn, setIsbn] = useState('');
    const [stock, setStock] = useState('');

    const handleAddBook = async () => {
        if (!isbn.trim() || !stock.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            await createBook(libraryId, isbn, parseInt(stock, 10));
            Alert.alert('Sucesso', 'Livro adicionado com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar o livro.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Livro</Text>
            <TextInput
                style={styles.input}
                placeholder="ISBN"
                value={isbn}
                onChangeText={setIsbn}
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddBook}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
