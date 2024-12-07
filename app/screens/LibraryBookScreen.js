import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getLibraryBooks } from '../services/api';

export default function LibraryBookScreen({ route }) {
    const { libraryId } = route.params;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getLibraryBooks(libraryId);
                setBooks(data);
            } catch (error) {
                console.error('Erro ao encontrar livros:', error);
            }
        };

        fetchBooks();
    }, [libraryId]);

    const renderBookItem = ({ item }) => {
        const authors = item.book.authors?.map((author) => author.name).join(', ') || 'Autor Desconhecido';

        return (
            <View style={styles.bookItem}>
                <Text style={styles.bookTitle}>{item.book.title || 'Título Desconhecido'}</Text>
                <Text style={styles.bookAuthor}>Autor(es): {authors}</Text>
                <Text style={styles.bookAvailability}>Disponíveis: {item.available}</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={books || []}
                keyExtractor={(item) => item.book.isbn.toString()}
                renderItem={renderBookItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 10,
    },
    bookItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000', // Sombras no iOS
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        borderWidth: 1,
        borderColor: '#ddd',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    bookAvailability: {
        fontSize: 14,
        color: '#4CAF50',
    },
});
