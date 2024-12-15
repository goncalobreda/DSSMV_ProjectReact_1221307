import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function BookDetailsScreen({ route }) {
    const { book, available } = route.params;

    const authors = book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Título */}
            <Text style={styles.title}>{book.title || 'Título Desconhecido'}</Text>

            {/* Capa do Livro */}
            <Image
                source={{
                    uri: `http://193.136.62.24/v1/assets/cover/${book.isbn}-L.jpg`,
                }}
                style={styles.coverImage}
                resizeMode="contain"
            />

            {/* Informações do Livro */}
            <View style={styles.section}>
                <Text style={styles.label}>Autor(es):</Text>
                <Text style={styles.infoText}>{authors}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.infoText}>{book.description || 'Nenhuma descrição disponível.'}</Text>
            </View>

            <View style={styles.section}>
                    <Text style={styles.label}>Disponíveis: </Text>
                    <Text style={styles.quantity}>{available || 0}</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    coverImage: {
        width: 200,
        height: 300,
        marginBottom: 20,
    },
    section: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    availability: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    quantity: {
        fontSize: 14,
        color: '#555',
    },

});
